import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blogPosts'
import Section, { SectionHeader } from '../components/shared/Section'
import { staggerContainer, staggerItem } from '../lib/motionVariants'

const TONE_BG: Record<string, string> = {
  primary: 'bg-primary-700',
  gold: 'bg-gold-500',
  leaf: 'bg-leaf-500',
}

export default function Blog() {
  return (
    <Section>
      <SectionHeader eyebrow="Levato" title="Blog" subtitle="Conteúdo educativo sobre bem-estar e suplementação natural." />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {blogPosts.map((post) => (
          <motion.div key={post.slug} variants={staggerItem}>
            <Link to={`/blog/${post.slug}`} className="group block overflow-hidden rounded-xl2 bg-white shadow-card">
              <div className={`flex h-40 items-center justify-center ${TONE_BG[post.tone]}`}>
                <span className="font-serif text-lg text-cream-50">Levato</span>
              </div>
              <div className="p-4">
                <p className="text-xs text-primary-400">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="mt-1 text-base font-medium text-primary-800 group-hover:text-primary-600">{post.title}</h2>
                <p className="mt-1.5 line-clamp-2 text-sm text-primary-500">{post.excerpt}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
