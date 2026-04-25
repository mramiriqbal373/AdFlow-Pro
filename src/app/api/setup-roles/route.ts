import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

// One-time setup endpoint — creates admin & moderator accounts with correct roles.
// Visit: http://localhost:3000/api/setup-roles
// REMOVE THIS FILE after running it once in production.

export async function GET() {
  const results: any[] = []

  const users = [
    { email: 'admin@gmail.com',     password: '111111', full_name: 'Admin User',     role: 'admin' },
    { email: 'moderator@gmail.com', password: '111111', full_name: 'Moderator User', role: 'moderator' },
  ]

  for (const u of users) {
    // Delete existing user if corrupted
    const { data: existing } = await supabaseAdmin.auth.admin.listUsers()
    const found = existing?.users?.find(x => x.email === u.email)
    if (found) {
      await supabaseAdmin.auth.admin.deleteUser(found.id)
      results.push(`Deleted old auth record for ${u.email}`)
    }

    // Create fresh auth user (email confirmed, no verification email needed)
    const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: { full_name: u.full_name },
    })

    if (createErr || !created?.user) {
      results.push(`❌ Failed to create ${u.email}: ${createErr?.message}`)
      continue
    }

    // Upsert profile with correct role
    const { error: profileErr } = await supabaseAdmin.from('profiles').upsert({
      id: created.user.id,
      email: u.email,
      full_name: u.full_name,
      role: u.role,
    }, { onConflict: 'id' })

    if (profileErr) {
      results.push(`⚠️ Created auth for ${u.email} but profile failed: ${profileErr.message}`)
    } else {
      results.push(`✅ ${u.email} created with role: ${u.role}`)
    }
  }

  return NextResponse.json({ done: true, results })
}
