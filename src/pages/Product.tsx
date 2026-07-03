import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { getProductBySlug } from '../data/products'
import { buildKitOptions } from '../lib/discount'
import { formatInstallments } from '../lib/format'
import { ANVISA_DISCLAIMER } from '../lib/legal'
import { useCart } from '../context/useCart'
import { trackViewItem } from '../lib/analytics'
import Section from '../components/shared/Section'
import Badge from '../components/shared/Badge'
import PriceTag from '../components/shared/PriceTag'
import Button from '../components/shared/Button'
import AnimatedSection from '../components/shared/AnimatedSection'
import ProductGallery from '../components/product/ProductGallery'
import KitSelector from '../components/product/KitSelector'
import ProductReviews from '../components/product/ProductReviews'
import CrossSell from '../components/product/CrossSell'
import StickyBuyBar from '../components/product/StickyBuyBar'

export default function Product() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const { addItem, openCart } = useCart()

  const kitOptions = useMemo(() => (product ? buildKitOptions(product.price) : []), [product])
  const [selectedKit, setSelectedKit] = useState(kitOptions[0])

  useEffect(() => {
    if (product) {
      trackViewItem(product.name, product.price)
      setSelectedKit(buildKitOptions(product.price)[0])
    }
  }, [product])

  if (!product) return <Navigate to="/404" replace />

  const activeKit = selectedKit ?? kitOptions[0]

  function handleAddToCart() {
    if (!product) return
    addItem(
      {
        key: `${product.slug}-${activeKit.days}`,
        productSlug: product.slug,
        name: product.name,
        tone: product.tone,
        kitDays: activeKit.days,
        unitPrice: activeKit.totalPrice,
      },
      1,
    )
    openCart()
  }

  return (
    <>
      <Section className="pb-28 md:pb-14">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <AnimatedSection>
            <ProductGallery product={product} />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="mb-2 flex gap-1.5">
              {product.badges.map((b) => (
                <Badge key={b} type={b} />
              ))}
            </div>
            <h1 className="font-serif text-2xl text-primary-900 sm:text-3xl">
              {product.name}
              {product.unitLabel
                ? ` — ${product.unitLabel}`
                : ` — ${product.capsules} cápsulas ${product.mg}mg`}
            </h1>
            <div className="mt-2 flex items-center gap-1 text-sm text-gold-500">
              <span aria-hidden>★★★★★</span>
              <span className="text-primary-400">({product.reviewCount} avaliações)</span>
            </div>

            <div className="mt-4">
              <PriceTag price={activeKit.totalPrice} size="lg" />
              <p className="mt-1 text-sm text-primary-500">{formatInstallments(activeKit.totalPrice)}</p>
            </div>

            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-leaf-500/10 px-3 py-1 text-xs font-medium text-leaf-600">
              Frete grátis para compras acima de R$ 199
            </div>

            <p className="mt-4 text-sm leading-relaxed text-primary-600">{product.shortDescription}</p>

            <div className="mt-6">
              <KitSelector options={kitOptions} selected={activeKit} onSelect={setSelectedKit} unitNoun={product.unitNoun} />
            </div>

            <div className="mt-6 hidden md:block">
              <Button variant="cta" size="lg" fullWidth onClick={handleAddToCart}>
                Comprar agora
              </Button>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-14 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-2 font-serif text-lg text-primary-800">Benefícios</h2>
            <ul className="flex flex-col gap-1.5 text-sm text-primary-600">
              {product.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-leaf-500" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-serif text-lg text-primary-800">Composição</h2>
            <ul className="flex flex-col gap-1.5 text-sm text-primary-600">
              {product.composition.map((c) => (
                <li key={c} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 font-serif text-lg text-primary-800">Modo de uso</h2>
            <p className="text-sm text-primary-600">{product.howToUse}</p>
          </div>
          <div>
            <h2 className="mb-2 font-serif text-lg text-primary-800">Avisos importantes</h2>
            <p className="text-xs leading-relaxed text-primary-500">{ANVISA_DISCLAIMER}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-14">
          <ProductReviews product={product} />
        </AnimatedSection>

        <AnimatedSection className="mt-14">
          <CrossSell product={product} />
        </AnimatedSection>
      </Section>

      <StickyBuyBar name={product.name} price={activeKit.totalPrice} onBuy={handleAddToCart} />
    </>
  )
}
