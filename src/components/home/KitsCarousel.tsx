import { getProductsByCategory } from '../../data/products'
import Section, { SectionHeader } from '../shared/Section'
import ProductCard from '../product/ProductCard'
import AnimatedSection from '../shared/AnimatedSection'

export default function KitsCarousel() {
  const kits = getProductsByCategory('combos')

  return (
    <Section className="bg-primary-50/50">
      <SectionHeader
        eyebrow="Economize mais"
        title="Combos e Kits"
        subtitle="Desconto progressivo de até 25% conforme a duração do kit — de 30 a 150 dias."
      />
      <AnimatedSection>
        <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
          {kits.map((kit) => (
            <div key={kit.id} className="w-44 flex-shrink-0 snap-start sm:w-auto">
              <ProductCard product={kit} />
            </div>
          ))}
        </div>
      </AnimatedSection>
    </Section>
  )
}
