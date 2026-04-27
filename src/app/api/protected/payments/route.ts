import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST: Submit a manual payment
export async function POST(req: Request) {
  try {
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { ad_id, package_id, amount, transaction_ref } = await req.json();

    if (!transaction_ref || amount === undefined) {
      return NextResponse.json({ error: 'Transaction reference and amount are required' }, { status: 400 });
    }

    // Friendly check to avoid duplicate transaction_ref
    // (A unique constraint on the DB level is still highly recommended)
    const { data: existingPayment } = await supabase
      .from('payments')
      .select('id')
      .eq('transaction_ref', transaction_ref)
      .single();

    if (existingPayment) {
      return NextResponse.json({ error: 'This transaction reference has already been submitted' }, { status: 400 });
    }

    // Insert the payment as pending
    const { data: payment, error } = await supabase
      .from('payments')
      .insert([
        {
          user_id: userId,
          ad_id: ad_id || null,
          package_id: package_id || null,
          amount,
          transaction_ref, // We'll prompt the user to add this column to their DB schema
          payment_method: 'manual', // indicates it was an off-platform payment
          status: 'pending' // Admin needs to verify this
        }
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Payment submitted and pending verification', payment });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
