import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all pending payments for manual verification
export async function GET() {
  try {
    const { data: payments, error } = await supabase
      .from('payments')
      .select(`
        *,
        users (name, email),
        ads (title)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ payments });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
