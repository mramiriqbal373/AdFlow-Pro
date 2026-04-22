import { Mail, MapPin, Phone } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex-1 max-w-6xl">
      
      <div className="grid md:grid-cols-2 gap-12 items-center">
         <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground mb-12">Have a question about moderation, packages, or reporting an ad? Our team is here to help you navigate AdFlow Pro.</p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                 <div className="bg-primary/10 p-4 rounded-full text-primary">
                    <Mail className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="font-bold text-lg">Email Support</div>
                    <div className="text-muted-foreground">support@adflowpro.com</div>
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className="bg-primary/10 p-4 rounded-full text-primary">
                    <Phone className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="font-bold text-lg">Sales Line</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                 </div>
              </div>

              <div className="flex items-center gap-4">
                 <div className="bg-primary/10 p-4 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                 </div>
                 <div>
                    <div className="font-bold text-lg">Office</div>
                    <div className="text-muted-foreground">123 Marketplace Ave, Tech District, CA</div>
                 </div>
              </div>
            </div>
         </div>

         <div className="glass-effect p-8 rounded-3xl border border-border shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form className="space-y-4">
               <div>
                 <label className="block text-sm font-medium mb-1">Name</label>
                 <input type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none" required />
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">Email</label>
                 <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none" required />
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">Subject</label>
                 <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none">
                    <option>General Inquiry</option>
                    <option>Billing Support</option>
                    <option>Report an Ad</option>
                    <option>Technical Issue</option>
                 </select>
               </div>
               <div>
                 <label className="block text-sm font-medium mb-1">Message</label>
                 <textarea rows={5} placeholder="How can we help you?" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none resize-none" required></textarea>
               </div>
               <button type="button" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all shadow-md mt-4">
                 Send Message
               </button>
            </form>
         </div>
      </div>

    </div>
  )
}
