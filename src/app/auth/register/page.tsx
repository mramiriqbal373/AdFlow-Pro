'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      })

      if (authError) throw authError

      setSuccess(true)
      // Redirect after a short delay or show success message
      setTimeout(() => {
        router.push('/auth/login')
      }, 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md glass-effect p-8 rounded-3xl border border-border shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-foreground">Create an Account</h1>
        <p className="text-center text-muted-foreground mb-8">Join AdFlow Pro and start posting ads</p>
        
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {success ? (
          <div className="text-center space-y-4">
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-4 rounded-xl">
              Account created successfully! Please check your email for a verification link, then sign in.
            </div>
            <Link href="/auth/login" className="block text-primary font-bold hover:underline">
              Go to Login
            </Link>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
              <input 
                id="name" 
                type="text" 
                placeholder="John Doe" 
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}
        
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/auth/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
