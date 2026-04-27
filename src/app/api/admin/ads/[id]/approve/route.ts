import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// PATCH: Approve an ad by setting its status to 'active'
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    // Note: The middleware has already validated that the caller is an 'admin'
    const resolvedParams = await params;
    const adId = resolvedParams.id;

    // Based on our database schema constraint, valid statuses are: 
    // 'pending', 'active', 'rejected', 'expired'.
    // We map the "approved" action to the 'active' status.
    const { data: ad, error } = await supabase
      .from('ads')
      .update({ status: 'active' })
      .eq('id', adId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!ad) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Ad successfully approved and is now active', ad });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
