import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all submitted (pending) ads for moderators to review
export async function GET() {
  try {
    // The middleware already verifies that the user is an 'admin'.
    // We fetch ads that are waiting for approval.
    const { data: ads, error } = await supabase
      .from('ads')
      .select(`
        *,
        users (id, name, email)
      `) // Including user info helps the moderator know who submitted it
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ads });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
