import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Package as PackageIcon, ImageIcon, TextQuote } from 'lucide-react'

export default function CreateAdPage() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-4xl flex-1">
      <div className="mb-8">
        <Link href="/client/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 mb-4 w-min whitespace-nowrap">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">Create New Listing</h1>
        <p className="text-muted-foreground text-lg">Draft your ad, select a package, and submit it for moderation.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-6">
          <form className="glass-effect p-8 rounded-3xl border border-border shadow-lg space-y-8">
            
            {/* Step 1: Listing Details */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TextQuote className="w-5 h-5 text-primary" /> Listing Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input type="text" placeholder="e.g. 2023 Tesla Model 3" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-medium mb-1">Category</label>
                     <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none">
                       <option>Select...</option>
                       <option>Real Estate</option>
                       <option>Vehicles</option>
                       <option>Services</option>
                     </select>
                   </div>
                   <div>
                     <label className="block text-sm font-medium mb-1">City</label>
                     <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none">
                       <option>Select...</option>
                       <option>New York</option>
                       <option>San Francisco</option>
                       <option>Remote</option>
                     </select>
                   </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea rows={5} placeholder="Describe your offering..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input type="text" placeholder="$0.00" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none" />
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
                 <input type="url" placeholder="https://youtube.com/watch?v=... or https://..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none mb-2" />
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
                <label className="flex items-start gap-3 p-3 rounded-xl border-2 border-primary bg-primary/5 cursor-pointer relative overflow-hidden transition-all">
                   <input type="radio" name="package" className="mt-1" defaultChecked />
                   <div>
                     <div className="font-bold flex items-center justify-between">Premium <span className="text-primary">$89</span></div>
                     <div className="text-xs text-muted-foreground">30 days • Homepage Featured • 3x Rank</div>
                   </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-all">
                   <input type="radio" name="package" className="mt-1" />
                   <div>
                     <div className="font-bold flex items-center justify-between">Standard <span>$49</span></div>
                     <div className="text-xs text-muted-foreground">15 days • Category Priority • 2x Rank</div>
                   </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl border border-border hover:border-primary/50 cursor-pointer transition-all">
                   <input type="radio" name="package" className="mt-1" />
                   <div>
                     <div className="font-bold flex items-center justify-between">Basic <span>$19</span></div>
                     <div className="text-xs text-muted-foreground">7 days • Standard Visibility</div>
                   </div>
                </label>
             </div>

             <button type="button" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 text-lg rounded-xl transition-all shadow-md mb-3 flex items-center justify-center gap-2">
               Submit for Review
             </button>
             <button type="button" className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-3 text-sm rounded-xl transition-all">
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
