import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function AdDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const { data: ad } = await supabase
    .from('ads')
    .select('*, users (name)')
    .eq('id', id)
    .single();

  if (!ad) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Ad not found</h1>
        <Link href="/ads" className="text-blue-600 hover:underline mt-4 inline-block">Back to Ads</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/ads" className="text-blue-600 hover:underline mb-6 inline-block">&larr; Back to Ads</Link>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{ad.title}</h1>
            <span className="text-2xl font-bold text-blue-600">${ad.price}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mb-8 border-b border-gray-100 pb-4">
            <span className="mr-4">Posted by <span className="font-medium text-gray-800">{ad.users?.name || 'Anonymous'}</span></span>
            <span>{new Date(ad.created_at).toLocaleDateString()}</span>
          </div>
          <div className="prose max-w-none text-gray-700">
            <p className="whitespace-pre-wrap">{ad.description}</p>
          </div>
        </div>
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <button className="px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors">
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  );
}
