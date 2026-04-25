import { createClient } from '@supabase/supabase-js'

// Admin client uses Service Role key — bypasses RLS and schema permission issues.
// NEVER expose this client in browser code or 'use client' components.
// Only use in Server Components and API Routes.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})
