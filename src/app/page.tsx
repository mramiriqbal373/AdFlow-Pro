import Link from "next/link";
import { ArrowRight, CheckCircle2, Star, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-sm font-medium">100% Moderated & Secure</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-balance leading-tight">
            The Premium Marketplace for <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
              Moderated Listings
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            Discover verified, high-quality ads. Submit your own, get reviewed by our trusted moderators, and reach a targeted audience with premium packages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/explore"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-primary/30 flex items-center gap-2"
            >
              Explore Ads
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/packages"
              className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center gap-2"
            >
              View Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Statistics / Trust Badges */}
      <section className="py-12 border-y border-border/40 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-black text-foreground mb-2">10k+</div>
              <div className="text-sm text-muted-foreground font-medium">Active Listings</div>
            </div>
            <div>
              <div className="text-4xl font-black text-foreground mb-2">100%</div>
              <div className="text-sm text-muted-foreground font-medium">Moderator Verified</div>
            </div>
            <div>
              <div className="text-4xl font-black text-foreground mb-2">24h</div>
              <div className="text-sm text-muted-foreground font-medium">Average Approval</div>
            </div>
            <div>
              <div className="text-4xl font-black text-foreground mb-2">5M+</div>
              <div className="text-sm text-muted-foreground font-medium">Monthly Views</div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Preview */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose Your Visibility</h2>
            <p className="text-xl text-muted-foreground">Boost your reach with our premium packages.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Package */}
            <div className="glass-effect rounded-3xl p-8 border border-border flex flex-col hover:border-primary/50 transition-colors">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-muted-foreground mb-6">Standard 7-day listing</p>
              <div className="text-4xl font-black mb-8">$19</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> 7 Days Duration</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Standard Ranking (1x)</li>
              </ul>
              <Link href="/auth/login" className="block w-full text-center bg-secondary hover:bg-secondary/80 font-bold py-3 rounded-xl transition-colors">Get Started</Link>
            </div>

            {/* Premium Package */}
            <div className="glass-effect rounded-3xl p-8 border-2 border-primary relative transform md:-translate-y-4 shadow-xl shadow-primary/10 flex flex-col">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                <Star className="w-4 h-4" fill="currentColor" /> Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-muted-foreground mb-6">Maximum exposure for 30 days</p>
              <div className="text-4xl font-black mb-8">$89</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> 30 Days Duration</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Homepage Featured</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Highest Ranking (3x)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Auto-refresh every 3 days</li>
              </ul>
              <Link href="/auth/login" className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors shadow-lg">Go Premium</Link>
            </div>

            {/* Standard Package */}
            <div className="glass-effect rounded-3xl p-8 border border-border flex flex-col hover:border-primary/50 transition-colors">
              <h3 className="text-2xl font-bold mb-2">Standard</h3>
              <p className="text-muted-foreground mb-6">Balanced 15-day listing</p>
              <div className="text-4xl font-black mb-8">$49</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> 15 Days Duration</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Category Priority</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary" /> Boosted Ranking (2x)</li>
              </ul>
              <Link href="/auth/login" className="block w-full text-center bg-secondary hover:bg-secondary/80 font-bold py-3 rounded-xl transition-colors">Get Started</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
