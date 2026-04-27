import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// PATCH: Approve or Reject an ad (Admin/Moderator only)
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!['active', 'rejected'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status. Must be active or rejected' }, { status: 400 });
    }

    const { data: ad, error } = await supabase
      .from('ads')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: `Ad ${status} successfully`, ad });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
