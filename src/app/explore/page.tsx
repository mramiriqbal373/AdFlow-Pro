import Link from 'next/link'
import Image from 'next/image'
import { Search, MapPin, Filter, Star } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic';

export default async function ExploreAdsPage() {
  const { data: adsData, error } = await supabaseAdmin
    .from('ads')
    .select('*, categories(name), cities(name), packages(price, is_featured), ad_media(thumbnail_url)')
    .eq('status', 'published');

  interface AdWithRelations {
    id: string;
    title: string;
    slug: string;
    rank_score: number | null;
    categories: { name: string } | null;
    cities: { name: string } | null;
    packages: { price: number; is_featured: boolean } | null;
    ad_media: { thumbnail_url: string | null }[];
  }

  let displayAds: any[] = [];

  if (adsData && adsData.length > 0 && !error) {
    displayAds = (adsData as unknown as AdWithRelations[]).map((ad) => ({
      id: ad.id,
      title: ad.title,
      slug: ad.slug,
      price: ad.packages?.price ? `$${ad.packages.price}` : 'Contact',
      city: ad.cities?.name || 'Unknown Location',
      category: ad.categories?.name || 'Uncategorized',
      is_featured: ad.packages?.is_featured || false,
      rank_score: ad.rank_score || 0,
      thumbnail: ad.ad_media && ad.ad_media.length > 0 && ad.ad_media[0].thumbnail_url ? ad.ad_media[0].thumbnail_url : 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=600&q=80'
    }));
  }

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="glass-effect rounded-2xl p-6 border border-border sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-lg font-bold">
            <Filter className="w-5 h-5 text-primary" />
            <h3>Filters</h3>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Keywords..." className="w-full pl-9 pr-4 py-2 rounded-xl bg-background border border-border outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground">Category</label>
              <select className="w-full px-4 py-2 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm appearance-none cursor-pointer">
                <option value="">All Categories</option>
                <option value="real-estate">Real Estate</option>
                <option value="vehicles">Vehicles</option>
                <option value="services">Services</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-muted-foreground">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="City or Region" className="w-full pl-9 pr-4 py-2 rounded-xl bg-background border border-border outline-none focus:border-primary text-sm" />
              </div>
            </div>

            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 rounded-xl transition-all shadow-md">
              Apply Filters
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Active Listings</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="px-3 py-1 rounded-lg bg-background border border-border outline-none text-sm cursor-pointer">
              <option>Highest Rank</option>
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayAds.sort((a,b) => b.rank_score - a.rank_score).map((ad) => (
            <Link href={`/explore/${ad.slug}`} key={ad.id} className="group glass-effect border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col">
              <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                {/* Optimized Image component */}
                <Image 
                  src={ad.thumbnail} 
                  alt={ad.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-500" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {ad.is_featured && (
                    <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3" fill="currentColor" /> Featured
                    </span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-background/90 backdrop-blur-md px-3 py-1 rounded-lg font-bold text-sm shadow-sm">
                  {ad.price}
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-xs text-primary font-semibold mb-1 uppercase tracking-wider">{ad.category}</div>
                <h3 className="font-bold text-foreground leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">{ad.title}</h3>
                <div className="mt-auto flex justify-between items-center text-xs text-muted-foreground border-t border-border/50 pt-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{ad.city}</span>
                  </div>
                  <span>Score: {ad.rank_score}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
