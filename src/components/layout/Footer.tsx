import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background mt-auto py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-lg font-bold flex items-center gap-1">
              <span>AdFlow</span><span className="text-primary">Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The premier marketplace for moderated listings.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 flex justify-between items-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AdFlow Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
