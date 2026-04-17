import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600
import { medusaServerClient } from '@/lib/medusa-client'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ProductActions from '@/components/product/product-actions'
import ProductAccordion from '@/components/product/product-accordion'
import TrustBadges from '@/components/product/trust-badges'
import BundleOffer from '@/components/product/bundle-offer'
import UrgencyBar from '@/components/product/urgency-bar'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { getProductPlaceholder } from '@/lib/utils/placeholder-images'
import { type VariantExtension } from '@/components/product/product-price'

// IDs of the bundle product and its variants — used for the bundle upsell
const BUNDLE_PRODUCT_HANDLE = 'stride-dual-pack-bundle'

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getBundleProduct() {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) return null

    const response = await medusaServerClient.store.product.list({
      handle: BUNDLE_PRODUCT_HANDLE,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch {
    return null
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } },
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        manage_inventory: v.manage_inventory ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `Shop ${product.title}`,
      ...(product.thumbnail ? { images: [{ url: product.thumbnail }] } : {}),
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const [product, bundleProduct] = await Promise.all([
    getProduct(handle),
    getBundleProduct(),
  ])

  if (!product) {
    notFound()
  }

  const variantExtensions = await getVariantExtensions(product.id)

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []).filter((img: { url: string }) => img.url !== product.thumbnail),
  ]

  const displayImages = allImages.length > 0
    ? allImages
    : [{ url: getProductPlaceholder(product.id) }]

  // Bundle variant: use the first available variant of the bundle
  const bundleVariant = (bundleProduct?.variants as Array<{ id: string; calculated_price?: { calculated_amount?: number } }> | undefined)?.[0]
  const bundleVariantId = bundleVariant?.id || ''
  const bundlePrice = bundleVariant?.calculated_price?.calculated_amount ?? 21800
  const regularSinglePrice = 25800 // $258 = 2x full price
  const savings = regularSinglePrice - bundlePrice

  // First variant stock count for urgency
  const firstVariantId = (product.variants as Array<{ id: string }>)[0]?.id
  const firstExt = firstVariantId ? variantExtensions[firstVariantId] : null
  const inventoryForUrgency = firstExt?.inventory_quantity ?? null

  const isBundle = handle === BUNDLE_PRODUCT_HANDLE
  const showBundleUpsell = !isBundle && !!bundleVariantId

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8 lg:py-14">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Product Images */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f4f0]">
              <Image
                src={displayImages[0].url}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {displayImages.slice(1, 5).map((image: { url: string }, idx: number) => (
                  <div
                    key={idx}
                    className="relative aspect-[4/5] overflow-hidden bg-[#f5f4f0]"
                  >
                    <Image
                      src={image.url}
                      alt={`${product.title} ${idx + 2}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Badge + Title */}
            <div>
              {product.subtitle && (
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-semibold">
                  {product.subtitle}
                </p>
              )}
              <h1 className="font-heading text-[3rem] sm:text-[3.5rem] leading-none tracking-wider uppercase">
                {product.title}
              </h1>
            </div>

            <ProductViewTracker
              productId={product.id}
              productTitle={product.title}
              variantId={(product.variants as Array<{ id: string }>)[0]?.id || null}
              currency={(product.variants as Array<{ calculated_price?: { currency_code?: string } }>)[0]?.calculated_price?.currency_code || 'usd'}
              value={(product.variants as Array<{ calculated_price?: { calculated_amount?: number | null } }>)[0]?.calculated_price?.calculated_amount ?? null}
            />

            {/* Urgency signals */}
            <UrgencyBar inventoryCount={inventoryForUrgency} />

            {/* Variant Selector + Price + Add to Cart */}
            <ProductActions product={product} variantExtensions={variantExtensions} />

            {/* Bundle upsell */}
            {showBundleUpsell && (
              <BundleOffer
                bundleVariantId={bundleVariantId}
                bundlePrice={bundlePrice}
                singlePrice={regularSinglePrice}
                savings={savings}
              />
            )}

            {/* Trust Badges */}
            <TrustBadges />

            {/* Accordion */}
            <ProductAccordion
              description={product.description}
              details={product.metadata as Record<string, string> | undefined}
            />
          </div>
        </div>
      </div>
    </>
  )
}
