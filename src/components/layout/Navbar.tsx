'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, User, PlusCircle, LayoutDashboard, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export function Navbar() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // onAuthStateChange automatically checks the current session on mount
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 w-full glass-effect border-b border-border/40">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 shadow-md flex items-center justify-center text-white font-bold" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">AdFlow</span>
          <span className="text-primary">Pro</span>
        </Link>
        <div className="hidden md:flex gap-8 items-center flex-1 ml-10">
          <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">Explore</Link>
          <Link href="/packages" className="text-sm font-medium hover:text-primary transition-colors">Packages</Link>
        </div>
        <div className="flex items-center gap-4">
          <button aria-label="Search" className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          {user ? (
            <>
              <Link href="/client/dashboard" className="hidden sm:flex items-center gap-2 text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-xl hover:bg-primary/20 transition-all border border-primary/20">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="hidden sm:flex items-center gap-2 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl transition-all shadow-md shadow-primary/20">
                <PlusCircle className="w-4 h-4" />
                <span>Post Ad</span>
              </Link>
              <Link href="/auth/login" className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary hover:bg-secondary/80 text-secondary-foreground transition-colors">
                <User className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
