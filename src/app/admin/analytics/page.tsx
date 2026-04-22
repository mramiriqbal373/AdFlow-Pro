import Link from 'next/link'
import { BarChart, DollarSign, Activity, Users, ShieldCheck, ArrowRight } from 'lucide-react'

// Metrics Mock Data
const METRICS = {
  active_listings: 1420,
  pending_payments: 45,
  under_review: 120,
  monthly_revenue: 14500.00,
  total_users: 3200,
  db_health: '100% Uptime',
  last_cron_run: '10 mins ago'
}

export default function AnalyticsDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl flex-1 flex flex-col lg:flex-row gap-8">
      
      {/* Sidebar Controls */}
      <aside className="w-full lg:w-64 space-y-4 flex-shrink-0">
         <div className="glass-effect p-6 rounded-3xl border border-purple-500/20 bg-purple-500/5 mb-6">
           <div className="flex items-center gap-2 text-purple-500 font-bold mb-2">
             <DollarSign className="w-5 h-5" /> Mode: Administrator
           </div>
           <p className="text-sm text-foreground">Monitor platform health, track revenue, and view aggregated metrics.</p>
         </div>

         <nav className="glass-effect rounded-2xl border border-border p-4 space-y-2 sticky top-24">
            <Link href="/admin/dashboard" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">Payment Verification</Link>
            <Link href="/admin/analytics" className="block w-full text-left px-3 py-2 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-between">
              Analytics <BarChart className="w-4 h-4" />
            </Link>
            <Link href="/admin/settings" className="block w-full text-left px-3 py-2 rounded-lg hover:bg-muted text-muted-foreground font-medium text-sm">System Settings</Link>
         </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">Platform Analytics</h1>
          <p className="text-muted-foreground text-lg">System-wide reports updated in real-time.</p>
        </div>

        {/* Top Level KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="glass-effect p-6 rounded-3xl border border-border shadow-md">
             <div className="flex justify-between items-start mb-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary"><DollarSign className="w-6 h-6" /></div>
                <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">+12% MoM</span>
             </div>
             <div className="text-4xl font-black mb-1">${METRICS.monthly_revenue.toLocaleString()}</div>
             <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">MRR (Revenue)</div>
           </div>

           <div className="glass-effect p-6 rounded-3xl border border-border shadow-md">
             <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-500/10 p-3 rounded-full text-blue-500"><Activity className="w-6 h-6" /></div>
                <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded">Avg 14 days</span>
             </div>
             <div className="text-4xl font-black mb-1">{METRICS.active_listings.toLocaleString()}</div>
             <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Live & Active Ads</div>
           </div>

           <div className="glass-effect p-6 rounded-3xl border border-border shadow-md">
             <div className="flex justify-between items-start mb-4">
                <div className="bg-orange-500/10 p-3 rounded-full text-orange-500"><Users className="w-6 h-6" /></div>
                <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded">High Traffic</span>
             </div>
             <div className="text-4xl font-black mb-1">{METRICS.total_users.toLocaleString()}</div>
             <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Total Registered Accounts</div>
           </div>
        </div>

        {/* Workflow & System Health */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="glass-effect p-8 border border-border rounded-3xl shadow-lg">
             <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary" /> Operational Workflow Pipeline</h3>
             
             <div className="space-y-4">
                <div className="flex justify-between items-center text-sm font-medium p-4 rounded-xl bg-orange-500/5 text-orange-500 border border-orange-500/20">
                   <span>Pending Payment Approvals</span>
                   <span className="font-black text-lg">{METRICS.pending_payments}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium p-4 rounded-xl bg-blue-500/5 text-blue-500 border border-blue-500/20">
                   <span>Pending Moderator Reviews</span>
                   <span className="font-black text-lg">{METRICS.under_review}</span>
                </div>
                
                <Link href="/admin/dashboard" className="w-full block text-center text-sm font-bold bg-muted hover:bg-muted/80 py-3 rounded-xl transition-colors mt-4">
                  Go to Action Queue
                </Link>
             </div>
           </div>

           <div className="glass-effect p-8 border border-border rounded-3xl shadow-lg bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
             <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> System Health Status</h3>
             
             <ul className="space-y-6">
                <li>
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-sm font-bold text-muted-foreground">Database Connectivity</span>
                     <span className="text-sm text-green-500 font-bold">{METRICS.db_health}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-green-500 h-1.5 rounded-full" style={{width: '100%'}}></div></div>
                </li>
                <li>
                  <div className="flex justify-between items-center mb-1">
                     <span className="text-sm font-bold text-muted-foreground">Serverless Automation (CRON)</span>
                     <span className="text-sm text-blue-500 font-bold">{METRICS.last_cron_run}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{width: '100%'}}></div></div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">Runs hourly to process 'expire-ads' and 'publish-scheduled' workflows securely without manual intervention.</p>
                </li>
             </ul>
           </div>
        </div>
      </main>
    </div>
  )
}
