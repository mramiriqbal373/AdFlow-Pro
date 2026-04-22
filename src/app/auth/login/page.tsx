import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-effect p-8 rounded-3xl border border-border shadow-2xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-foreground">Welcome Back</h1>
        <p className="text-center text-muted-foreground mb-8">Sign in to your AdFlow Pro account</p>
        
        <form className="space-y-4">
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
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium" htmlFor="password">Password</label>
              <Link href="/auth/forgot" className="text-xs text-primary hover:underline">Forgot password?</Link>
            </div>
            <input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" 
              required
            />
          </div>
          <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-all shadow-lg mt-6">
            Sign In
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
          Don't have an account? <Link href="/auth/register" className="text-primary hover:underline font-medium">Create one</Link>
        </div>
      </div>
    </div>
  )
}
