import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET: Fetch a single published ad by its ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Fetch the specific ad only if it is 'active'
    const { data: ad, error } = await supabase
      .from('ads')
      .select(`
        *,
        users (id, name)
      `)
      .eq('id', id)
      .eq('status', 'active')
      .single();

    if (error) {
      // PGRST116 is the error code for returning no rows when using .single()
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Ad not found or not published' }, { status: 404 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ad });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
