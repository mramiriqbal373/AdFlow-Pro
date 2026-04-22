import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  // Validate cron secret if deployed to Vercel (recommended)
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  // Requires Service Role Key to bypass RLS for background jobs
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Supabase admin credentials missing in environment.' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // 1. Expire ads whose expire_at date has passed
    const { data, error } = await supabase
      .from('ads')
      .update({ 
         status: 'expired', 
         updated_at: new Date().toISOString() 
      })
      .eq('status', 'published')
      .lte('expire_at', new Date().toISOString())
      .select('id');

    if (error) throw error;

    // Optional: Log this action into 'audit_logs' or dispatch 'expiring-soon' notifications
    // ...

    return NextResponse.json({ 
        success: true, 
        message: 'Successfully processed ad expirations',
        expired_count: data?.length || 0, 
        ads: data 
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
