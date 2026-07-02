import type { Product } from '../../types/product'
import { products } from '../../data/products'
import { SectionHeader } from '../shared/Section'
import ProductCard from './ProductCard'

export default function CrossSell({ product }: { product: Product }) {
  const related = product.crossSellSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p))

  if (related.length === 0) return null

  return (
    <div>
      <SectionHeader eyebrow="Combine com" title="Quem comprou também levou" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}
