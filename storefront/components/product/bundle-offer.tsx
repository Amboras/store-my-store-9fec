'use client'

import { useState } from 'react'
import { Package, Check, Loader2 } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'

interface BundleOfferProps {
  bundleVariantId: string
  bundlePrice: number
  singlePrice: number
  savings: number
}

export default function BundleOffer({
  bundleVariantId,
  bundlePrice,
  singlePrice,
  savings,
}: BundleOfferProps) {
  const { addItem, isAddingItem } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleAddBundle = () => {
    if (!bundleVariantId) return
    addItem(
      { variantId: bundleVariantId, quantity: 1 },
      {
        onSuccess: () => {
          setJustAdded(true)
          toast.success('Bundle added to bag!')
          setTimeout(() => setJustAdded(false), 2500)
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add bundle')
        },
      }
    )
  }

  const formatPrice = (cents: number) =>
    `$${(cents / 100).toFixed(2).replace('.00', '')}`

  return (
    <div className="border-2 border-accent/30 bg-accent/5 p-5 space-y-4">
      {/* Badge */}
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-accent" />
        <span className="text-xs font-bold uppercase tracking-widest text-accent">
          Bundle &amp; Save {formatPrice(savings)}
        </span>
      </div>

      {/* Description */}
      <div>
        <p className="text-sm font-semibold">Stride Dual-Pack Bundle</p>
        <p className="text-xs text-muted-foreground mt-1">
          Apex Runner + Urban Low — two legendary silhouettes, one unbeatable deal.
        </p>
      </div>

      {/* Price comparison */}
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold">{formatPrice(bundlePrice)}</span>
        <span className="text-sm text-muted-foreground line-through">{formatPrice(singlePrice)}</span>
        <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5">
          Save {formatPrice(savings)}
        </span>
      </div>

      {/* Perks */}
      <ul className="space-y-1.5">
        {['Both shoes in your size', 'Premium gift packaging', 'Free priority shipping'].map((perk) => (
          <li key={perk} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3.5 w-3.5 text-accent flex-shrink-0" />
            {perk}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={handleAddBundle}
        disabled={isAddingItem}
        className={`w-full flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-widest transition-all ${
          justAdded
            ? 'bg-green-700 text-white'
            : 'bg-accent text-white hover:bg-accent/90'
        }`}
      >
        {isAddingItem ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          <>
            <Check className="h-4 w-4" />
            Bundle Added
          </>
        ) : (
          <>
            <Package className="h-4 w-4" />
            Add Bundle to Bag
          </>
        )}
      </button>
    </div>
  )
}
