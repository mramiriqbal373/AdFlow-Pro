import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST: Publish an ad (Sets published_at and expires_at)
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const adId = resolvedParams.id;

    // 1. Fetch the Ad and its related Package to get duration
    const { data: ad, error: adError } = await supabase
      .from('ads')
      .select('*, packages(duration_days)')
      .eq('id', adId)
      .single();

    if (adError || !ad) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    }

    // 2. Ensure Ad is approved (status = 'active')
    if (ad.status !== 'active') {
      return NextResponse.json({ error: 'Ad must be approved by a moderator before publishing' }, { status: 400 });
    }

    // 3. Ensure Ad is paid for
    const { data: payment } = await supabase
      .from('payments')
      .select('status')
      .eq('ad_id', adId)
      .eq('status', 'completed')
      .single();

    if (!payment) {
      return NextResponse.json({ error: 'Cannot publish: No completed payment found for this ad' }, { status: 400 });
    }

    // 4. Calculate expiry date based on package duration
    const durationDays = ad.packages?.duration_days || 7; // Fallback to 7 days if missing
    const publishedAt = new Date();
    const expiresAt = new Date();
    expiresAt.setDate(publishedAt.getDate() + durationDays);

    // 5. Update Ad with timestamps
    const { data: publishedAd, error: updateError } = await supabase
      .from('ads')
      .update({
        published_at: publishedAt.toISOString(),
        expires_at: expiresAt.toISOString(),
      })
      .eq('id', adId)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Ad successfully published', ad: publishedAd });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
