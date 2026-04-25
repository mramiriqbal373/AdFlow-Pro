import Link from 'next/link'
import { CheckCircle2, DollarSign, XCircle, FileText, ArrowUpRight, BarChart } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase-admin'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const { data: paymentsData, error } = await supabaseAdmin
    .from('payments')
    .select(`
      id,
      ad_id,
      amount,
      method,
      transaction_ref,
      sender_name,
      screenshot_url,
      status,
      created_at,
      ads ( title, packages ( name, price ) )
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  const displayPayments = (paymentsData ?? []).map((p: any) => ({
    id: p.id,
    ad_id: p.ad_id,
    ad_title: p.ads?.title ?? 'Unknown Ad',
    client: p.sender_name ?? 'Anonymous',
    package: p.ads?.packages
      ? `${p.ads.packages.name} ($${p.ads.packages.price})`
      : `$${p.amount}`,
    method: p.method ?? 'Transfer',
    trn: p.transaction_ref,
    screenshot: p.screenshot_url ?? '#',
    submitted: new Date(p.created_at).toLocaleDateString(),
  }))

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex-1 flex flex-col lg:flex-row gap-8">

      {/* Sidebar */}
      <aside className="w-full lg:w-64 space-y-4 flex-shrink-0">
        <div className="glass-effect p-6 rounded-3xl border border-purple-500/20 bg-purple-500/5 mb-6">
          <div className="flex items-center gap-2 text-purple-500 font-bold mb-2">
            <DollarSign className="w-5 h-5" /> Mode: Administrator
          </div>
          <p className="text-sm text-foreground">Verify payments and publish ads to the platform.</p>
        </div>

        <nav className="glass-effect rounded-2xl border border-border p-4 space-y-2">
          <Link href="/admin/dashboard" className="block px-3 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm">
            Payment Verification
          </Link>
          <Link href="/admin/analytics" className="block px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm flex items-center justify-between">
            Analytics <BarChart className="w-4 h-4" />
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Payment Verification</h1>
          <p className="text-muted-foreground">Review submitted payment proofs to publish ads.</p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error.message}
          </div>
        )}

        <div className="glass-effect border border-border rounded-3xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 border-b border-border text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-bold">Ad</th>
                  <th className="px-6 py-4 font-bold">Client</th>
                  <th className="px-6 py-4 font-bold">Package</th>
                  <th className="px-6 py-4 font-bold">Method</th>
                  <th className="px-6 py-4 font-bold">TRN Ref</th>
                  <th className="px-6 py-4 font-bold">Proof</th>
                  <th className="px-6 py-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {displayPayments.map((p) => (
                  <tr key={p.id} className="hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground truncate max-w-[140px]">{p.ad_title}</div>
                      <div className="text-xs text-muted-foreground font-mono">{p.ad_id.slice(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4 font-medium">{p.client}</td>
                    <td className="px-6 py-4 font-bold">{p.package}</td>
                    <td className="px-6 py-4 text-muted-foreground">{p.method}</td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs bg-muted px-2 py-1 rounded">{p.trn}</span>
                    </td>
                    <td className="px-6 py-4">
                      {p.screenshot !== '#' ? (
                        <a href={p.screenshot} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                          <FileText className="w-4 h-4" /> View
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-xs">No file</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-center">
                        <button className="p-2 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all" title="Approve & Publish">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all" title="Reject Proof">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayPayments.length === 0 && !error && (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-sm font-medium">No pending payments to verify.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
