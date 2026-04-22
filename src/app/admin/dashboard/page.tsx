import Link from 'next/link'
import { CheckCircle2, DollarSign, XCircle, FileText, ArrowUpRight, BarChart } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const MOCK_PAYMENTS = [
  { ad_id: 'ad-102', client: 'Jane Doe', package: 'Premium ($89)', method: 'Bank Transfer', trn: 'TRN-99824X2A', screenshot: 'https://imgur.com/example', submitted: '1 hr ago' },
  { ad_id: 'ad-551', client: 'Mike Johnson', package: 'Standard ($49)', method: 'Crypto', trn: '0x123...abc', screenshot: 'https://imgur.com/example2', submitted: '4 hrs ago' },
]

export default async function AdminDashboardPage() {
  const { data: paymentsData, error } = await supabase
    .from('payments')
    .select('*, ads(packages(name, price))')
    .eq('status', 'pending');

  let displayPayments = MOCK_PAYMENTS;

  if (paymentsData && paymentsData.length > 0 && !error) {
    displayPayments = paymentsData.map((p: any) => ({
      ad_id: p.ad_id,
      client: p.sender_name || 'Unknown Sender',
      package: p.ads?.packages ? `${p.ads.packages.name} ($${p.ads.packages.price})` : `Custom ($${p.amount})`,
      method: p.method || 'Unknown',
      trn: p.transaction_ref,
      screenshot: p.screenshot_url || '#',
      submitted: p.created_at ? new Date(p.created_at).toLocaleDateString() : 'Unknown'
    }));
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex-1 flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-64 space-y-4 flex-shrink-0">
         <div className="glass-effect p-6 rounded-3xl border border-purple-500/20 bg-purple-500/5 mb-6">
           <div className="flex items-center gap-2 text-purple-500 font-bold mb-2">
             <DollarSign className="w-5 h-5" /> Mode: Administrator
           </div>
           <p className="text-sm text-foreground">Verify payments and publish ads to the platform.</p>
         </div>

         <nav className="glass-effect rounded-2xl border border-border p-4 space-y-2">
            <Link href="/admin/dashboard" className="block w-full text-left px-3 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm">Payment Verification</Link>
            <Link href="/admin/analytics" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm flex items-center justify-between">
              Analytics <BarChart className="w-4 h-4" />
            </Link>
            <Link href="/admin/settings" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">System Settings</Link>
         </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Payment Verification</h1>
          <p className="text-muted-foreground text-lg">Review submitted payment proofs to transition ads to 'Published' status.</p>
        </div>

        <div className="glass-effect border border-border rounded-3xl overflow-hidden shadow-lg">
           <div className="overflow-x-auto">
             <table className="w-full text-left text-sm">
               <thead className="bg-muted/30 border-b border-border text-muted-foreground">
                 <tr>
                   <th className="px-6 py-4 font-bold">Listing ID</th>
                   <th className="px-6 py-4 font-bold">Client</th>
                   <th className="px-6 py-4 font-bold">Package</th>
                   <th className="px-6 py-4 font-bold">TRN Reference</th>
                   <th className="px-6 py-4 font-bold">Proof</th>
                   <th className="px-6 py-4 font-bold text-center">Action</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-border/50">
                 {displayPayments.map((p, i) => (
                   <tr key={i} className="hover:bg-muted/10 transition-colors">
                     <td className="px-6 py-4 font-medium text-primary">
                       <Link href={`/explore/${p.ad_id}`} className="hover:underline flex items-center gap-1">{p.ad_id} <ArrowUpRight className="w-3 h-3" /></Link>
                     </td>
                     <td className="px-6 py-4">{p.client}</td>
                     <td className="px-6 py-4 font-bold">{p.package}</td>
                     <td className="px-6 py-4 font-mono text-xs text-muted-foreground bg-muted/50 rounded inline-block mt-2 px-2 py-1">{p.trn}</td>
                     <td className="px-6 py-4">
                       <a href={p.screenshot} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                         <FileText className="w-4 h-4" /> View
                       </a>
                     </td>
                     <td className="px-6 py-4">
                       <div className="flex gap-2 justify-center">
                         <button className="flex items-center justify-center p-2 rounded-xl bg-green-500/10 text-green-500 focus:ring-2 focus:ring-green-500 hover:bg-green-500 hover:text-white transition-all outline-none" title="Verify & Publish">
                           <CheckCircle2 className="w-5 h-5" />
                         </button>
                         <button className="flex items-center justify-center p-2 rounded-xl bg-red-500/10 text-red-500 focus:ring-2 focus:ring-red-500 hover:bg-red-500 hover:text-white transition-all outline-none" title="Reject Proof">
                           <XCircle className="w-5 h-5" />
                         </button>
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
           
           {displayPayments.length === 0 && (
             <div className="text-center py-12 text-muted-foreground">
               <p className="text-sm">No pending payments to verify.</p>
             </div>
           )}
        </div>
      </main>
    </div>
  )
}
