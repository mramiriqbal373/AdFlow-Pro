import { supabaseAdmin } from '@/lib/supabase-admin'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('id')

  if (!userId) {
    return NextResponse.json({ role: 'client' })
  }

  const { data } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', userId)
    .single()

  return NextResponse.json({ role: data?.role ?? 'client' })
}
