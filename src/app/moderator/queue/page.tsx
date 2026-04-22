import Link from 'next/link'
import { Filter, Check, X, Eye, ShieldAlert, MessageSquare } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const MOCK_QUEUE = [
  { id: 'ad-103', title: 'Web Development Services', client: 'Alice Smith', category: 'Services', submitted_at: '2 hrs ago', media_type: 'image' },
  { id: 'ad-201', title: 'Luxury Rolex Submariner', client: 'Bob Watches', category: 'Jewelry', submitted_at: '3 hrs ago', media_type: 'youtube' },
]

export default async function ModeratorQueuePage() {
  const { data: queueData, error } = await supabase
    .from('ads')
    .select('*, profiles(full_name), categories(name), ad_media(source_type)')
    .eq('status', 'under_review')

  let displayQueue = MOCK_QUEUE;

  if (queueData && queueData.length > 0 && !error) {
    displayQueue = queueData.map((ad: any) => ({
      id: ad.id,
      title: ad.title,
      client: ad.profiles?.full_name || 'Unknown Client',
      category: ad.categories?.name || 'Uncategorized',
      submitted_at: ad.created_at ? new Date(ad.created_at).toLocaleDateString() : 'Unknown',
      media_type: ad.ad_media && ad.ad_media.length > 0 ? ad.ad_media[0].source_type : 'none',
    }));
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex-1 flex flex-col md:flex-row gap-8">
      
      {/* Sidebar Controls */}
      <aside className="w-full md:w-64 space-y-4 flex-shrink-0">
         <div className="glass-effect p-6 rounded-3xl border border-blue-500/20 bg-blue-500/5 mb-6">
           <div className="flex items-center gap-2 text-blue-500 font-bold mb-2">
             <ShieldAlert className="w-5 h-5" /> Mode: Moderator
           </div>
           <p className="text-sm text-foreground">Review incoming ads for policy violations, accurate categories, and valid media.</p>
         </div>

         <div className="glass-effect rounded-2xl border border-border p-4">
            <h3 className="font-bold flex items-center gap-2 mb-4"><Filter className="w-4 h-4" /> Queue Filter</h3>
            <div className="space-y-2">
               <button className="w-full text-left px-3 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm">Under Review ({displayQueue.length})</button>
               <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">Flagged (0)</button>
               <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">Recently Processed</button>
            </div>
         </div>
      </aside>

      {/* Queue Area */}
      <main className="flex-1 space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Review Queue</h1>
          <span className="text-sm text-muted-foreground">Showing {displayQueue.length} pending listings</span>
        </div>

        {displayQueue.map(ad => (
           <div key={ad.id} className="glass-effect border border-border rounded-3xl overflow-hidden shadow-lg flex flex-col hover:border-border/80 transition-colors">
              <div className="bg-muted/30 px-6 py-3 border-b border-border flex justify-between items-center flex-wrap gap-2">
                 <div className="flex items-center gap-3">
                    <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">ID: {ad.id}</span>
                    <span className="text-sm font-medium text-muted-foreground">Submitted {ad.submitted_at}</span>
                 </div>
                 <div className="text-sm font-bold bg-secondary px-3 py-1 rounded-full">{ad.category}</div>
              </div>

              <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                {/* Content Details */}
                <div className="flex-1 space-y-4">
                   <div>
                     <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Title</div>
                     <div className="text-xl font-bold">{ad.title}</div>
                   </div>
                   
                   <div>
                     <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Client</div>
                     <div className="font-medium flex items-center gap-2">{ad.client} 
                       <Link href="#" className="text-xs text-primary hover:underline">View History</Link>
                     </div>
                   </div>

                   <div>
                     <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Media Protocol</div>
                     <div className="text-sm font-medium uppercase">{ad.media_type} Link provided</div>
                   </div>

                   <div className="pt-4 flex gap-2 w-full max-w-sm">
                      <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" /> Approve
                      </button>
                      <button className="flex-1 bg-destructive hover:bg-destructive/90 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2">
                        <X className="w-5 h-5" /> Reject
                      </button>
                   </div>
                </div>

                {/* Media Preview & Notes */}
                <div className="w-full md:w-64 flex flex-col gap-4">
                  <div className="aspect-video bg-black/5 rounded-xl border border-border flex items-center justify-center text-muted-foreground group cursor-pointer relative overflow-hidden">
                     <Eye className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                     <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors"></div>
                  </div>
                  <div className="flex-1 bg-muted/30 rounded-xl border border-border p-4 flex flex-col">
                     <div className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-1"><MessageSquare className="w-3 h-3" /> Internal Note</div>
                     <textarea className="w-full flex-1 bg-transparent resize-none outline-none text-sm placeholder:text-muted-foreground/50" placeholder="Add rejection reason or internal comment..." />
                  </div>
                </div>
              </div>
           </div>
        ))}

        {displayQueue.length === 0 && (
          <div className="text-center py-20 text-muted-foreground glass-effect rounded-3xl border border-border">
            <Check className="w-12 h-12 mx-auto text-green-500 mb-4 opacity-50" />
            <p className="text-xl font-medium">Queue is empty!</p>
            <p className="text-sm">Great job keeping the marketplace clean.</p>
          </div>
        )}
      </main>
    </div>
  )
}
