import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Product } from '../../types/product'
import ProductCover from '../shared/ProductCover'
import Badge from '../shared/Badge'
import PriceTag from '../shared/PriceTag'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.25 }} className="group h-full">
      <Link
        to={`/produto/${product.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-xl2 bg-white shadow-card transition-shadow hover:shadow-soft"
      >
        <div className="relative aspect-square overflow-hidden">
          <ProductCover product={product} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
          {product.badges.length > 0 && (
            <div className="absolute left-2 top-2 flex flex-col gap-1">
              {product.badges.map((b) => (
                <Badge key={b} type={b} />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-1.5 p-3.5">
          <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-primary-800">{product.name}</p>
          <p className="text-xs text-primary-500">
            {product.unitLabel ?? `${product.capsules} cápsulas · ${product.mg}mg`}
          </p>
          <div className="mt-auto flex items-center gap-1 text-xs text-gold-600">
            <span aria-hidden>★★★★★</span>
            <span className="text-primary-400">({product.reviewCount})</span>
          </div>
          <PriceTag price={product.price} oldPrice={product.oldPrice} />
        </div>
      </Link>
    </motion.div>
  )
}
