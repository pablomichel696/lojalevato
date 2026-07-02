import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products, getProductsByCategory } from '../data/products'
import { categories, getCategoryBySlug, wellnessSubcategories, fitnessSubcategories } from '../data/categories'
import Section, { SectionHeader } from '../components/shared/Section'
import ProductCard from '../components/product/ProductCard'
import { staggerContainer, staggerItem } from '../lib/motionVariants'
import { Link } from 'react-router-dom'

type SortOption = 'relevancia' | 'menor-preco' | 'maior-preco'

export default function Catalog({ fixedSlug }: { fixedSlug?: string }) {
  const params = useParams<{ slug: string }>()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.toLowerCase().trim() ?? ''
  const [sort, setSort] = useState<SortOption>('relevancia')

  const slug = fixedSlug ?? params.slug ?? 'toda-loja'
  const category = getCategoryBySlug(slug)

  const baseProducts = useMemo(() => {
    if (query) {
      return products.filter((p) => p.name.toLowerCase().includes(query))
    }
    return getProductsByCategory(slug)
  }, [slug, query])

  const sortedProducts = useMemo(() => {
    const list = [...baseProducts]
    if (sort === 'menor-preco') list.sort((a, b) => a.price - b.price)
    if (sort === 'maior-preco') list.sort((a, b) => b.price - a.price)
    return list
  }, [baseProducts, sort])

  const siblings =
    slug === 'bem-estar' ? wellnessSubcategories : slug === 'fitness' ? fitnessSubcategories : category?.parentSlug
      ? categories.filter((c) => c.parentSlug === category.parentSlug)
      : []

  const title = query ? `Resultados para "${query}"` : category?.name ?? 'Toda a Loja'

  return (
    <Section className="min-h-[60vh]">
      <SectionHeader
        eyebrow={query ? 'Busca' : 'Categoria'}
        title={title}
        subtitle={`${sortedProducts.length} produto${sortedProducts.length === 1 ? '' : 's'} encontrado${sortedProducts.length === 1 ? '' : 's'}`}
      />

      {siblings.length > 0 && !query && (
        <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
          {siblings.map((s) => (
            <Link
              key={s.slug}
              to={`/categoria/${s.slug}`}
              className={`flex-shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                s.slug === slug
                  ? 'border-primary-700 bg-primary-700 text-cream-50'
                  : 'border-primary-200 text-primary-600 hover:border-primary-400'
              }`}
            >
              {s.name}
            </Link>
          ))}
        </div>
      )}

      <div className="mb-5 flex justify-end">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-full border border-primary-200 bg-white px-3 py-1.5 text-xs text-primary-700 outline-none"
        >
          <option value="relevancia">Relevância</option>
          <option value="menor-preco">Menor preço</option>
          <option value="maior-preco">Maior preço</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <p className="py-16 text-center text-sm text-primary-500">Nenhum produto encontrado.</p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {sortedProducts.map((p) => (
            <motion.div key={p.id} variants={staggerItem}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </Section>
  )
}
