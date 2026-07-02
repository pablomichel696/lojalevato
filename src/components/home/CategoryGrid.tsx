import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'
import CategoryIcon from '../shared/CategoryIcon'
import Section, { SectionHeader } from '../shared/Section'
import { staggerContainer, staggerItem } from '../../lib/motionVariants'

const FEATURED_SLUGS = ['bem-estar', 'fitness', 'emagrecedores', 'estimulantes-sexuais', 'desintoxicantes', 'combos']

const TONE_BG: Record<string, string> = {
  primary: 'bg-primary-700',
  gold: 'bg-gold-500',
  leaf: 'bg-leaf-500',
}

export default function CategoryGrid() {
  const items = FEATURED_SLUGS.map((slug) => categories.find((c) => c.slug === slug)!).filter(Boolean)

  return (
    <Section>
      <SectionHeader eyebrow="Navegue" title="Compre por categoria" subtitle="Encontre a linha certa para o seu objetivo." />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
      >
        {items.map((item) => (
          <motion.div key={item.slug} variants={staggerItem}>
            <Link
              to={`/categoria/${item.slug}`}
              className="group flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-xl2 bg-primary-50 p-4 text-center transition-transform hover:-translate-y-1"
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-full text-cream-50 ${TONE_BG[item.tone]}`}>
                <CategoryIcon name={item.icon} className="h-7 w-7" />
              </span>
              <span className="text-sm font-medium text-primary-800 sm:text-base">{item.name}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
