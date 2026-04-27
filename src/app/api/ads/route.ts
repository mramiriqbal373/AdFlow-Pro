import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch all published (active) ads
export async function GET() {
  try {
    // We fetch ads that are 'active'. This hides 'pending', 'rejected', and 'expired' ads.
    // Kept query simple and fast for public listing.
    const { data: ads, error } = await supabase
      .from('ads')
      .select(`
        id,
        title,
        description,
        price,
        created_at,
        users (id, name)
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ads });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
