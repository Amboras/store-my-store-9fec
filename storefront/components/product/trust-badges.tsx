import { ShieldCheck, RotateCcw, Truck, Star, Lock } from 'lucide-react'

export default function TrustBadges() {
  return (
    <div className="space-y-4">
      {/* Primary badges grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            icon: ShieldCheck,
            title: '1-Year Guarantee',
            sub: 'Defect-free promise',
          },
          {
            icon: RotateCcw,
            title: '30-Day Returns',
            sub: 'No questions asked',
          },
          {
            icon: Truck,
            title: 'Free Shipping',
            sub: 'Orders over $75',
          },
          {
            icon: Lock,
            title: 'Secure Checkout',
            sub: '256-bit SSL encrypted',
          },
        ].map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="flex items-start gap-3 p-3 bg-muted/50 rounded-sm"
          >
            <Icon className="h-4 w-4 mt-0.5 flex-shrink-0 text-foreground/70" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-semibold">{title}</p>
              <p className="text-[11px] text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Rating bar */}
      <div className="flex items-center gap-3 border-t pt-4">
        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground font-semibold">4.9/5</strong> from 2,400+ verified buyers
        </p>
      </div>

      {/* Payment logos text */}
      <p className="text-[11px] text-muted-foreground text-center">
        Accepted: Visa · Mastercard · Amex · Apple Pay · Google Pay
      </p>
    </div>
  )
}
