'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Package as PackageIcon, ImageIcon, TextQuote, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { normalizeMediaUrl } from '@/lib/media'

export default function CreateAdPage() {
  const router = useRouter()
  
  // Form State
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [cityId, setCityId] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  
  // UI State
  const [categories, setCategories] = useState<{id: number, name: string}[]>([])
  const [cities, setCities] = useState<{id: number, name: string}[]>([])
  const [packages, setPackages] = useState<{id: number, name: string, price: number, duration_days: number, is_featured: boolean, weight: number}[]>([])
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [catsRes, citiesRes, pkgsRes] = await Promise.all([
          supabase.from('categories').select('id, name').eq('is_active', true),
          supabase.from('cities').select('id, name').eq('is_active', true),
          supabase.from('packages').select('*').order('price', { ascending: false })
        ])

        console.log('Categories Response:', catsRes)
        console.log('Cities Response:', citiesRes)
        console.log('Packages Response:', pkgsRes)

        if (catsRes.error) console.error('Categories Error:', catsRes.error)
        if (citiesRes.error) console.error('Cities Error:', citiesRes.error)
        if (pkgsRes.error) console.error('Packages Error:', pkgsRes.error)

        if (catsRes.data) setCategories(catsRes.data)
        if (citiesRes.data) setCities(citiesRes.data)
        if (pkgsRes.data) {
          setPackages(pkgsRes.data)
          if (pkgsRes.data.length > 0) {
            setSelectedPackage(pkgsRes.data[0].id.toString())
          }
        }
      } catch (err) {
        console.error('Error fetching form data:', err)
      } finally {
        setFetching(false)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent, status: 'submitted' | 'draft' = 'submitted') => {
    e.preventDefault()
    if (!selectedPackage) {
      setError('Please select a package.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('You must be logged in to create an ad.')

      // 1. Create the ad record
      const slug = title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') + '-' + Math.random().toString(36).substring(2, 7)
      
      const { data: ad, error: adError } = await supabase.from('ads').insert({
        user_id: user.id,
        title,
        slug,
        description,
        category_id: categoryId ? parseInt(categoryId) : null,
        city_id: cityId ? parseInt(cityId) : null,
        status: status,
        package_id: parseInt(selectedPackage),
      }).select().single()

      if (adError) throw adError

      // 2. Add media if URL provided
      if (mediaUrl && ad) {
        const normalized = normalizeMediaUrl(mediaUrl)
        const { error: mediaError } = await supabase.from('ad_media').insert({
          ad_id: ad.id,
          source_type: normalized.source_type,
          original_url: normalized.original_url,
          thumbnail_url: normalized.thumbnail_url,
          validation_status: normalized.validation_status
        })

        if (mediaError) throw mediaError
      }

      router.push('/client/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl flex-1">
      <div className="mb-8">
        <Link href="/client/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 mb-4 w-min whitespace-nowrap">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">Create New Listing</h1>
        <p className="text-muted-foreground text-lg">Draft your ad, select a package, and submit it for moderation.</p>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl mb-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-6">
          <form className="glass-effect p-8 rounded-3xl border border-border shadow-lg space-y-8" id="ad-form" onSubmit={(e) => handleSubmit(e)}>
            
            {/* Step 1: Listing Details */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TextQuote className="w-5 h-5 text-primary" /> Listing Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 2023 Tesla Model 3" 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium mb-1">Category</label>
                     <select 
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                     >
                       <option value="">Select...</option>
                       {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium mb-1">City</label>
                     <select 
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none"
                        value={cityId}
                        onChange={(e) => setCityId(e.target.value)}
                        required
                     >
                       <option value="">Select...</option>
                       {cities.map(city => <option key={city.id} value={city.id}>{city.name}</option>)}
                     </select>
                   </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea 
                    rows={5} 
                    placeholder="Describe your offering..." 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (Metadata/Info Only)</label>
                  <input 
                    type="text" 
                    placeholder="$0.00" 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </section>

            <hr className="border-border/50" />

            {/* Step 2: Media Strategy */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" /> External Media Strategy
              </h2>
              <p className="text-sm text-muted-foreground mb-4">Paste a public Image URL or a YouTube video link. We automatically extract and normalize thumbnails.</p>
              <div>
                 <label className="block text-sm font-medium mb-1">Media URL</label>
                 <input 
                    type="url" 
                    placeholder="https://youtube.com/watch?v=... or https://..." 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none mb-2" 
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                 />
                 <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500" /> Supported: YouTube, Unsplash, Public image links (.jpg, .png).
                 </div>
              </div>
            </section>

          </form>
        </div>

        {/* Sidebar: Package Selection & Action */}
        <aside className="space-y-6">
          <div className="glass-effect p-6 rounded-3xl border border-border sticky top-24 shadow-xl">
             <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
               <PackageIcon className="w-5 h-5 text-primary" /> Select Package
             </h2>
             
             <div className="space-y-3 mb-6">
                {packages.length > 0 ? (
                  packages.map((pkg) => (
                    <label 
                      key={pkg.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border-2 cursor-pointer relative overflow-hidden transition-all ${selectedPackage === pkg.id.toString() ? 'border-primary bg-primary/5' : 'border-border'}`}
                    >
                      <input 
                        type="radio" 
                        name="package" 
                        className="mt-1" 
                        checked={selectedPackage === pkg.id.toString()} 
                        onChange={() => setSelectedPackage(pkg.id.toString())} 
                      />
                      <div className="flex-1">
                        <div className="font-bold flex items-center justify-between">
                          {pkg.name} <span className="text-primary">${pkg.price}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pkg.duration_days} days • {pkg.is_featured ? 'Featured' : 'Standard'} • {pkg.weight}x Rank
                        </div>
                      </div>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">No packages available.</p>
                )}
             </div>

             <button 
                form="ad-form"
                type="submit" 
                disabled={loading || !selectedPackage}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 text-lg rounded-xl transition-all shadow-md mb-3 flex items-center justify-center gap-2 disabled:opacity-50"
             >
               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Submit for Review'}
             </button>
             <button 
                type="button" 
                disabled={loading || !selectedPackage}
                onClick={(e) => handleSubmit(e, 'draft')}
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-3 text-sm rounded-xl transition-all disabled:opacity-50"
             >
               Save as Draft
             </button>
             
             <p className="text-xs text-center text-muted-foreground mt-4 leading-relaxed">
               By submitting, your ad enters the <strong>Moderator Review</strong> phase. Payment will be required after approval.
             </p>
          </div>
        </aside>

      </div>
    </div>
  )
}
