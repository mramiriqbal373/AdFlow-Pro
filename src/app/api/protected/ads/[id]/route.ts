import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// PUT: Edit an existing ad
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = req.headers.get('x-user-id');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const adId = resolvedParams.id;
    const { title, description, category_id, city_id, price, status } = await req.json();

    // Verify the ad belongs to the current user
    const { data: existingAd, error: checkError } = await supabase
      .from('ads')
      .select('user_id')
      .eq('id', adId)
      .single();

    if (checkError || !existingAd) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    }

    if (existingAd.user_id !== userId) {
      return NextResponse.json({ error: 'Forbidden: You do not own this ad' }, { status: 403 });
    }

    // Prepare fields to update, dropping undefined
    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (category_id !== undefined) updates.category_id = category_id;
    if (city_id !== undefined) updates.city_id = city_id;
    if (price !== undefined) updates.price = price;
    if (status !== undefined) updates.status = status;

    // Update the ad
    const { data: updatedAd, error } = await supabase
      .from('ads')
      .update(updates)
      .eq('id', adId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Ad updated successfully', ad: updatedAd });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
