import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md glass-effect p-8 rounded-3xl border border-border shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-foreground">Create an Account</h1>
        <p className="text-center text-muted-foreground mb-8">Join AdFlow Pro and start posting ads</p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">Full Name</label>
            <input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" 
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
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all shadow-lg mt-6">
            Create Account
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/auth/login" className="text-primary hover:underline font-medium">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
