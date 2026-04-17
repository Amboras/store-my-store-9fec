'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, Truck, Shield, RotateCcw, Star, Zap } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1400&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1400&q=80'
const FEATURE_IMAGE_1 = 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80'
const FEATURE_IMAGE_2 = 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80'
const FEATURE_IMAGE_3 = 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80'

const marqueeItems = [
  'Free shipping on orders $75+',
  'New season. New soles.',
  '30-day easy returns',
  'Built for the streets. Designed for life.',
  'Limited drops. Unlimited style.',
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
    setSubscribed(true)
  }

  return (
    <>
      {/* Marquee Banner */}
      <div className="bg-foreground text-white py-2.5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="text-xs font-medium tracking-widest uppercase px-10">
              {item}
              <span className="mx-10 text-white/30">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f5f4f0]">
        <div className="container-custom grid lg:grid-cols-2 items-center gap-0 min-h-[88vh]">
          {/* Text Content */}
          <div className="space-y-7 py-16 lg:py-24 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-foreground/5 border border-foreground/10 px-4 py-1.5 rounded-full">
              <Zap className="h-3 w-3 text-accent" fill="currentColor" />
              <span className="text-xs font-semibold uppercase tracking-widest">Spring 2025 Drop</span>
            </div>
            <h1 className="font-heading text-[5.5rem] sm:text-[7rem] lg:text-[8rem] leading-[0.9] tracking-widest uppercase text-foreground">
              Step<br />
              Into<br />
              <span className="text-accent">Bold</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-sm leading-relaxed font-light">
              Premium sneakers and lifestyle shoes engineered for comfort, crafted for the streets. Find your perfect pair.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 bg-foreground text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                prefetch={true}
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 border border-foreground/30 px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-white transition-all"
                prefetch={true}
              >
                Our Story
              </Link>
            </div>

            {/* Social proof micro-bar */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-8 rounded-full bg-muted border-2 border-white overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="h-3 w-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">2,400+ happy customers</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[55vw] lg:h-full min-h-[420px] lg:min-h-[88vh]">
            <Image
              src={HERO_IMAGE}
              alt="Stride — Premium Footwear Hero"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
              priority
            />
            {/* Price tag overlay */}
            <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm shadow-lg px-5 py-4 hidden lg:block">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">Starting from</p>
              <p className="font-heading text-3xl tracking-wide mt-0.5">$89</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-5 border-b bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/50">
            <div className="flex items-center gap-4 py-4 md:py-2 md:px-8 justify-center text-center md:justify-start md:text-left first:md:pl-0 last:md:pr-0">
              <Truck className="h-5 w-5 flex-shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On all orders over $75</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-4 md:py-2 md:px-8 justify-center text-center">
              <RotateCcw className="h-5 w-5 flex-shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Hassle-free exchange or refund</p>
              </div>
            </div>
            <div className="flex items-center gap-4 py-4 md:py-2 md:px-8 justify-center text-center md:justify-end md:text-right">
              <Shield className="h-5 w-5 flex-shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-semibold">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* Featured Categories */}
      <section className="py-section bg-[#f5f4f0]">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Explore</p>
            <h2 className="font-heading text-[3.5rem] sm:text-[5rem] tracking-wider uppercase leading-none">Shop by Style</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Runners', sub: 'Speed meets style', img: FEATURE_IMAGE_2, href: '/products' },
              { label: 'Lifestyle', sub: 'Made for the streets', img: FEATURE_IMAGE_1, href: '/products' },
              { label: 'Limited Drops', sub: 'Exclusive releases', img: FEATURE_IMAGE_3, href: '/products' },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group relative overflow-hidden aspect-[3/4] bg-muted block"
              >
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="font-heading text-4xl tracking-widest text-white uppercase">{cat.label}</p>
                  <p className="text-xs text-white/70 mt-1 tracking-widest uppercase">{cat.sub}</p>
                  <div className="mt-3 flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Shop Now <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story / Editorial */}
      <section className="py-section">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 lg:max-w-md order-2 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">Our Philosophy</p>
              <h2 className="font-heading text-[3.5rem] sm:text-[4.5rem] leading-none tracking-wider uppercase">
                Crafted for the Long Run
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light">
                Every pair of Stride shoes is engineered with premium materials and relentless attention to detail. We don&apos;t cut corners — we perfect them. From the first sketch to the last stitch, quality is non-negotiable.
              </p>
              <ul className="space-y-3">
                {[
                  'Premium full-grain leather & technical uppers',
                  'Responsive cushioning systems',
                  'Durable outsoles built for any terrain',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest link-underline pb-0.5"
                prefetch={true}
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="aspect-[4/5] overflow-hidden relative order-1 lg:order-2">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="Stride Footwear — Crafted for life"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-section bg-foreground text-white">
        <div className="container-custom max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Stay in the loop</p>
          <h2 className="font-heading text-[3.5rem] sm:text-[5rem] tracking-wider uppercase leading-none">
            First to Know.
          </h2>
          <p className="mt-4 text-white/60 font-light max-w-md mx-auto">
            New drops, exclusive discounts, and behind-the-scenes stories — delivered straight to your inbox.
          </p>
          {subscribed ? (
            <div className="mt-8 text-sm font-semibold text-accent uppercase tracking-widest">
              You&apos;re in. Welcome to the family.
            </div>
          ) : (
            <form className="mt-8 flex gap-0" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/20 px-5 py-4 text-sm placeholder:text-white/40 text-white focus:outline-none focus:border-white/60 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-accent text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
