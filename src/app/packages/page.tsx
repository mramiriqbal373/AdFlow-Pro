import Link from 'next/link'
import { CheckCircle2, Star } from 'lucide-react'

export default function PackagesPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex-1">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Choose Your Visibility</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Boost your reach and get your ads seen by thousands with our premium visibility packages designed for maximum conversion.</p>
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
          <Link href="/client/create-ad" className="block w-full text-center bg-secondary hover:bg-secondary/80 font-bold py-3 rounded-xl transition-colors">Select Basic</Link>
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
          <Link href="/client/create-ad" className="block w-full text-center bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-xl transition-colors shadow-lg">Select Premium</Link>
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
          <Link href="/client/create-ad" className="block w-full text-center bg-secondary hover:bg-secondary/80 font-bold py-3 rounded-xl transition-colors">Select Standard</Link>
        </div>
      </div>
    </div>
  )
}
