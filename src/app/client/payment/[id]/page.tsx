import Link from 'next/link'
import { ArrowLeft, Receipt, UploadCloud, ShieldCheck } from 'lucide-react'

export default function PaymentUploadPage({ params }: { params: { id: string } }) {
  const adId = params.id || 'ad-102';
  const pkgCost = '$89.00';
  const pkgName = 'Premium Package';

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 max-w-2xl flex-1">
      <div className="mb-8">
        <Link href="/client/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 mb-4 w-min whitespace-nowrap">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Submit Payment Details</h1>
        <p className="text-muted-foreground text-lg">Your ad #{adId} has been approved by moderators. Provide proof of payment to publish it.</p>
      </div>

      <div className="glass-effect p-8 rounded-3xl border border-border shadow-xl">
         {/* Summary Box */}
         <div className="bg-secondary rounded-2xl p-6 mb-8 flex justify-between items-center">
            <div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Invoice Amount</div>
              <div className="font-bold text-foreground text-lg">{pkgName}</div>
            </div>
            <div className="text-3xl font-black text-primary">{pkgCost}</div>
         </div>

         {/* Standard instructions */}
         <div className="mb-8 p-4 border border-blue-500/20 bg-blue-500/5 rounded-xl flex items-start gap-3">
            <Receipt className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-foreground mb-1">Payment Instructions</h3>
              <p className="text-sm text-muted-foreground">Please transfer the amount to our official bank account and enter the transaction reference below. Include a link to the screenshot of the receipt (e.g. Imgur, Drive link).</p>
            </div>
         </div>

         <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Transaction Reference Number</label>
              <input type="text" placeholder="e.g. TRN-99824X2A" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none font-mono" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Sender Name (from bank)</label>
              <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">Screenshot URL <UploadCloud className="w-4 h-4" /></label>
              <input type="url" placeholder="https://imgur.com/... or similar" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none" />
              <p className="text-xs text-muted-foreground mt-2">To abide by our no-upload external media policy, please host your image externally and paste the link.</p>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 text-lg rounded-xl transition-all shadow-lg mt-4 flex items-center justify-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Submit for Verification
            </button>
         </form>
      </div>
    </div>
  )
}
