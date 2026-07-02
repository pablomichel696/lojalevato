import { motion } from 'framer-motion'
import { testimonials } from '../../data/testimonials'
import Section, { SectionHeader } from '../shared/Section'
import { staggerContainer, staggerItem } from '../../lib/motionVariants'

export default function InstagramStrip() {
  return (
    <Section className="bg-primary-50/50">
      <SectionHeader eyebrow="@levato.oficial" title="Quem usa, recomenda" subtitle="Depoimentos reais de clientes nas redes sociais." />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {testimonials.map((t) => (
          <motion.div key={t.id} variants={staggerItem} className="rounded-xl2 bg-white p-4 shadow-card">
            <div className="mb-2 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 font-serif text-xs text-cream-50">
                {t.author.charAt(0)}
              </span>
              <div>
                <p className="text-xs font-medium text-primary-800">{t.author}</p>
                <p className="text-[11px] text-primary-400">{t.handle}</p>
              </div>
            </div>
            <p className="text-sm text-primary-600">&ldquo;{t.quote}&rdquo;</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
