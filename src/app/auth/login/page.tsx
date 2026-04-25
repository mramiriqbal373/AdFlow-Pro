'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const ROLE_ROUTES: Record<string, string> = {
  admin: '/admin/dashboard',
  super_admin: '/admin/dashboard',
  moderator: '/moderator/queue',
  client: '/client/dashboard',
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (authError) throw authError

      const userId = authData.user?.id
      if (!userId) throw new Error('Login failed — no user ID returned.')

      // Fetch role via server API route (uses admin client, bypasses schema issues)
      const res = await fetch(`/api/auth/role?id=${userId}`)
      const { role } = await res.json()

      const redirectTo = ROLE_ROUTES[role] ?? '/client/dashboard'
      router.push(redirectTo)
      router.refresh()

    } catch (err: any) {
      setError(err.message || 'Failed to sign in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-effect p-8 rounded-3xl border border-border shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-foreground">Welcome Back</h1>
        <p className="text-center text-muted-foreground mb-8">Sign in to your AdFlow Pro account</p>
        
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="name@example.com" 
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium" htmlFor="password">Password</label>
              <Link href="/auth/forgot" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all shadow-lg mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          Don't have an account? <Link href="/auth/register" className="text-primary hover:underline font-medium">Create one</Link>
        </div>
      </div>
    </div>
  )
}
