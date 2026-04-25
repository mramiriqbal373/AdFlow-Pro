import Link from 'next/link'
import { Filter, Check, X, Eye, ShieldAlert } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export default async function ModeratorQueuePage() {
  const { data: queueData, error } = await supabaseAdmin
    .from('ads')
    .select(`
      id,
      title,
      created_at,
      status,
      profiles ( full_name ),
      categories ( name ),
      ad_media ( source_type )
    `)
    .eq('status', 'submitted')
    .order('created_at', { ascending: true })

  const displayQueue = (queueData ?? []).map((ad: any) => ({
    id: ad.id,
    title: ad.title,
    client: ad.profiles?.full_name ?? 'Unknown User',
    category: ad.categories?.name ?? 'Uncategorized',
    submitted_at: new Date(ad.created_at).toLocaleDateString(),
    media_type: ad.ad_media?.[0]?.source_type ?? 'none',
  }))

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex-1 flex flex-col md:flex-row gap-8">

      {/* Sidebar */}
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
            <button className="w-full text-left px-3 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm">
              Under Review ({displayQueue.length})
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">
              Flagged (0)
            </button>
          </div>
        </div>
      </aside>

      {/* Queue */}
      <main className="flex-1 space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-extrabold tracking-tight">Review Queue</h1>
          <span className="text-sm text-muted-foreground">{displayQueue.length} pending</span>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error.message}
          </div>
        )}

        {displayQueue.map(ad => (
          <div key={ad.id} className="glass-effect border border-border rounded-3xl overflow-hidden shadow-lg">
            <div className="bg-muted/30 px-6 py-3 border-b border-border flex justify-between items-center flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">
                  {ad.id.slice(0, 8)}...
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  Submitted {ad.submitted_at}
                </span>
              </div>
              <div className="text-sm font-bold bg-secondary px-3 py-1 rounded-full">{ad.category}</div>
            </div>

            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-4">
                <div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Title</div>
                  <div className="text-xl font-bold">{ad.title}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Client</div>
                  <div className="font-medium">{ad.client}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-bold uppercase tracking-wider mb-1">Media</div>
                  <div className="text-sm font-medium uppercase">{ad.media_type} provided</div>
                </div>
                <div className="pt-4 flex gap-2 max-w-sm">
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <Check className="w-5 h-5" /> Approve
                  </button>
                  <button className="flex-1 bg-destructive hover:bg-destructive/90 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                    <X className="w-5 h-5" /> Reject
                  </button>
                </div>
              </div>

              <div className="w-full md:w-64">
                <div className="aspect-video bg-black/5 rounded-xl border border-border flex items-center justify-center text-muted-foreground cursor-pointer group">
                  <Eye className="w-8 h-8 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {displayQueue.length === 0 && !error && (
          <div className="text-center py-20 text-muted-foreground glass-effect rounded-3xl border border-border">
            <Check className="w-12 h-12 mx-auto text-green-500 mb-4 opacity-50" />
            <p className="text-xl font-medium">Queue is empty — great job!</p>
          </div>
        )}
      </main>
    </div>
  )
}
