'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Shield, Mail, CheckCircle2, Loader2, Save } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [name, setName] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        // Fallback email from auth user if profile is slow/missing
        let emailAddress = user.email || ''

        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        if (data) {
          setProfile(data)
          setName(data.full_name || '')
        } else {
          // Profile doesn't exist yet, but we have user data
          setProfile({ email: emailAddress, role: 'client' })
        }
      }
      setLoading(false)
    }
    getProfile()
  }, [])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('profiles')
        .update({ full_name: name })
        .eq('id', user.id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setProfile({ ...profile, full_name: name })
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Failed to update profile' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
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
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-2">Account Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your profile and account preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Profile Form */}
        <div className="md:col-span-2 space-y-6">
          <form className="glass-effect p-8 rounded-3xl border border-border shadow-lg space-y-6" onSubmit={handleUpdateProfile}>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-primary" /> Personal Information
            </h2>

            {message && (
              <div className={`p-4 rounded-xl text-sm border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-destructive/10 border-destructive/20 text-destructive'}`}>
                {message.text}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-muted/30 text-muted-foreground cursor-not-allowed">
                  <Mail className="w-4 h-4" />
                  <span>{profile?.email}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1 px-1">Email cannot be changed.</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
                <input 
                  id="name"
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={saving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>
          </form>
        </div>

        {/* Right: Account Summary */}
        <aside className="space-y-6">
          <div className="glass-effect p-6 rounded-3xl border border-border shadow-md">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Account Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Role</span>
                <span className="text-sm font-bold capitalize bg-primary/10 text-primary px-2 py-0.5 rounded-lg">{profile?.role}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Status</span>
                <div className="flex items-center gap-1 text-sm font-bold text-green-500">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Active</span>
                </div>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Member Since</span>
                <span className="text-sm font-medium">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-destructive/5 border border-destructive/10">
            <h4 className="text-destructive font-bold mb-2">Danger Zone</h4>
            <p className="text-xs text-muted-foreground mb-4">Deleting your account will remove all your active listings and payment history.</p>
            <button className="text-xs text-destructive font-bold hover:underline">
              Request Account Deletion
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
