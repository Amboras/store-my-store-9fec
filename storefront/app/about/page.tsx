import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = { title: 'Our Story | Stride' }

const ABOUT_IMG_1 = 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=1200&q=80'
const ABOUT_IMG_2 = 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80'

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <div className="relative bg-foreground text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={ABOUT_IMG_1}
            alt="Stride — Our Story"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative container-custom py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">Who We Are</p>
          <h1 className="font-heading text-[4rem] sm:text-[6rem] tracking-wider uppercase leading-none text-white">
            Our Story
          </h1>
        </div>
      </div>

      <div className="container-custom py-section max-w-5xl">
        {/* Opening statement */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="text-2xl font-light leading-relaxed text-foreground">
            We built Stride because we were tired of choosing between performance and style. So we stopped choosing.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-y mb-20">
          {[
            { value: '2,400+', label: 'Happy Customers' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '30-Day', label: 'Return Policy' },
            { value: '100%', label: 'Quality Guaranteed' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-4xl sm:text-5xl tracking-wider text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-2 uppercase tracking-widest font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Story grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="aspect-[4/5] relative overflow-hidden bg-muted">
            <Image
              src={ABOUT_IMG_2}
              alt="Stride footwear craftsmanship"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent">The Beginning</p>
            <h2 className="font-heading text-[2.5rem] sm:text-[3.5rem] tracking-wider uppercase leading-none">
              Born on the Streets
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed font-light">
              <p>
                Stride was founded in 2024 by a team of footwear obsessives who believed that premium quality shouldn&apos;t come with a premium price tag. Every pair we make starts with a question: would we wear these?
              </p>
              <p>
                We partner directly with factories that meet our strict quality standards — no middlemen, no shortcuts. From the rubber compound in the outsole to the thread count in the lining, every material is chosen with purpose.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest link-underline pb-0.5"
            >
              Shop the Collection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Values */}
        <div className="bg-[#f5f4f0] p-10 lg:p-16">
          <div className="text-center mb-12">
            <h2 className="font-heading text-[2.5rem] sm:text-[4rem] tracking-wider uppercase leading-none">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                title: 'Uncompromising Quality',
                body: 'Every material is tested. Every seam is inspected. We don\'t ship a shoe we wouldn\'t be proud to wear.',
              },
              {
                title: 'Transparent Pricing',
                body: 'We cut out the middlemen so you get a premium product at a price that actually makes sense.',
              },
              {
                title: 'Built to Last',
                body: 'We design for longevity — not trends. Our shoes are made to outlast any season.',
              },
            ].map((val) => (
              <div key={val.title} className="text-center space-y-3">
                <div className="w-1 h-8 bg-accent mx-auto" />
                <h3 className="font-heading text-xl tracking-wider uppercase">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{val.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
