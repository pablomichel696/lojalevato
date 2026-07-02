import type { Product } from '../../types/product'
import Section, { SectionHeader } from '../shared/Section'
import ProductCard from '../product/ProductCard'
import AnimatedSection from '../shared/AnimatedSection'

type Props = {
  eyebrow: string
  title: string
  subtitle?: string
  products: Product[]
  tinted?: boolean
}

export default function ProductRail({ eyebrow, title, subtitle, products, tinted = false }: Props) {
  return (
    <Section className={tinted ? 'bg-primary-50/50' : undefined}>
      <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
      <AnimatedSection>
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-5">
          {products.slice(0, 10).map((p) => (
            <div key={p.id} className="w-44 flex-shrink-0 snap-start sm:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </AnimatedSection>
    </Section>
  )
}
