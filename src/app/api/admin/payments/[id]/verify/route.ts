import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// PATCH: Verify a manual payment (set status to 'completed')
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const paymentId = resolvedParams.id;

    // Based on schema constraint, statuses are: 'pending', 'completed', 'failed', 'refunded'
    const { data: payment, error } = await supabase
      .from('payments')
      .update({ status: 'completed' })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Payment successfully verified', payment });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
