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
    // 1. Publish ads that have reached their scheduled publish_at date
    const { data, error } = await supabase
      .from('ads')
      .update({ 
         status: 'published', 
         updated_at: new Date().toISOString() 
      })
      .eq('status', 'scheduled')
      .lte('publish_at', new Date().toISOString())
      .select('id');

    if (error) throw error;

    // Optional: Log this action into 'audit_logs' or 'ad_status_history' here
    // ...

    return NextResponse.json({ 
        success: true, 
        message: 'Successfully processed scheduled publications',
        published_count: data?.length || 0, 
        ads: data 
    })
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
