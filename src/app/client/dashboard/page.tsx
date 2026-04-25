'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PlusCircle, FileText, CheckCircle2, Clock, XCircle, ChevronRight, Settings, Loader2, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, { color: string, label: string }> = {
    published: { color: 'bg-green-500/10 text-green-500 border-green-500/20', label: 'Published' },
    active: { color: 'bg-green-500/10 text-green-500 border-green-500/20', label: 'Active' },
    payment_pending: { color: 'bg-orange-500/10 text-orange-500 border-orange-500/20', label: 'Needs Payment' },
    submitted: { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', label: 'Under Review' },
    under_review: { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', label: 'Under Review' },
    draft: { color: 'bg-muted text-muted-foreground border-border', label: 'Draft' },
    rejected: { color: 'bg-red-500/10 text-red-500 border-red-500/20', label: 'Rejected' },
  }
  
  const style = styles[status] || styles.draft
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-bold border ${style.color}`}>
      {style.label}
    </span>
  )
}

function ActionButton({ status, id }: { status: string, id: string }) {
  if (status === 'draft') return <Link href={`/client/create-ad?id=${id}`} className="text-sm text-primary hover:underline font-medium">Edit Draft</Link>
  if (status === 'payment_pending') return <Link href={`/client/payment/${id}`} className="text-sm bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:bg-primary/90 font-medium transition-colors shadow-sm">Submit Proof</Link>
  if (status === 'rejected') return <button className="text-sm text-destructive hover:underline font-medium">View Reason</button>
  return <Link href={`/explore/${id}`} className="text-sm text-muted-foreground hover:text-foreground font-medium flex items-center gap-1">View Live <ChevronRight className="w-4 h-4" /></Link>
}

export default function ClientDashboard() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [ads, setAds] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, active: 0, pending: 0, drafts: 0, rejected: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getDashboardData() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/auth/login')
          return
        }

        // Fetch Profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        setProfile(profileData)

        // Fetch Ads
        const { data: adsData } = await supabase
          .from('ads')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (adsData) {
          setAds(adsData)
          setStats({
            total: adsData.length,
            active: adsData.filter(a => a.status === 'published' || a.status === 'active').length,
            pending: adsData.filter(a => ['submitted', 'under_review', 'payment_pending', 'payment_submitted'].includes(a.status)).length,
            drafts: adsData.filter(a => a.status === 'draft').length,
            rejected: adsData.filter(a => a.status === 'rejected').length
          })
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    getDashboardData()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl flex-1 flex flex-col md:flex-row gap-8">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 space-y-2 flex-shrink-0">
         <div className="glass-effect p-6 rounded-3xl border border-border mb-6">
           <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
             {profile?.full_name?.charAt(0) || 'U'}
           </div>
           <h2 className="font-bold text-lg text-foreground truncate">{profile?.full_name || 'Anonymous User'}</h2>
           <p className="text-sm text-muted-foreground capitalize">{profile?.role || 'User'}</p>
         </div>

         <nav className="space-y-1">
           <Link href="/client/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-bold transition-colors">
             <FileText className="w-5 h-5" /> My Ads
           </Link>
           <Link href="/client/create-ad" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground font-medium transition-colors">
             <PlusCircle className="w-5 h-5" /> Create Ad
           </Link>
           <Link href="/client/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground font-medium transition-colors">
             <Settings className="w-5 h-5" /> Settings
           </Link>
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/5 font-medium transition-colors mt-8"
           >
             <LogOut className="w-5 h-5" /> Logout
           </button>
         </nav>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <Link href="/client/create-ad" className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-xl hover:bg-primary/90 transition-all shadow-md font-bold">
            <PlusCircle className="w-4 h-4" /> New Ad
          </Link>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="glass-effect p-4 border border-border rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-black mb-1 text-foreground">{stats.active}</div>
            <div className="text-sm font-medium text-muted-foreground flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500" /> Active</div>
          </div>
          <div className="glass-effect p-4 border border-border rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-black mb-1 text-foreground">{stats.pending}</div>
            <div className="text-sm font-medium text-muted-foreground flex items-center gap-1"><Clock className="w-4 h-4 text-orange-500" /> Pending</div>
          </div>
          <div className="glass-effect p-4 border border-border rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-black mb-1 text-foreground">{stats.drafts}</div>
            <div className="text-sm font-medium text-muted-foreground flex items-center gap-1"><FileText className="w-4 h-4 text-slate-500" /> Drafts</div>
          </div>
          <div className="glass-effect p-4 border border-border rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-black mb-1 text-foreground">{stats.rejected}</div>
            <div className="text-sm font-medium text-muted-foreground flex items-center gap-1"><XCircle className="w-4 h-4 text-red-500" /> Rejected</div>
          </div>
        </div>

        {/* Ads List */}
        <div className="glass-effect rounded-3xl border border-border overflow-hidden shadow-lg">
          <div className="px-6 py-5 border-b border-border bg-muted/30 flex justify-between items-center">
            <h3 className="font-bold text-lg">My Listings</h3>
            <span className="text-xs text-muted-foreground">{ads.length} total</span>
          </div>
          <div className="divide-y divide-border/50">
            {ads.map((ad) => (
              <div key={ad.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors">
                <div>
                  <div className="font-bold text-lg text-foreground mb-1">{ad.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Created on {new Date(ad.created_at).toLocaleDateString()} • ID: {ad.id.slice(0, 8)}...
                  </div>
                </div>
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3">
                  <StatusBadge status={ad.status} />
                  <ActionButton status={ad.status} id={ad.id} />
                </div>
              </div>
            ))}
            
            {ads.length === 0 && (
              <div className="p-12 text-center text-muted-foreground italic">
                You haven't created any ads yet.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
