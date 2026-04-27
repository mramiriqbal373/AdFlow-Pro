import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default async function ExploreAds() {
  // Fetch active ads directly in server component for simplicity
  const { data: ads } = await supabase
    .from('ads')
    .select('id, title, description, price, created_at')
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Explore Ads</h1>
      
      {ads && ads.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <Link href={`/ads/${ad.id}`} key={ad.id}>
              <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">{ad.title}</h2>
                  <span className="text-blue-600 font-bold whitespace-nowrap ml-2">${ad.price}</span>
                </div>
                <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{ad.description}</p>
                <div className="text-sm text-gray-400 mt-auto">
                  {new Date(ad.created_at).toLocaleDateString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No active ads found at the moment.</p>
        </div>
      )}
    </div>
  );
}
