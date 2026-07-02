import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '../../types/product'
import ProductImagePlaceholder from '../shared/ProductImagePlaceholder'

export default function ProductGallery({ product }: { product: Product }) {
  const [zoomed, setZoomed] = useState(false)
  const thumbs = [0, 1, 2, 3]

  return (
    <div>
      <motion.div
        className="cursor-zoom-in overflow-hidden rounded-xl2"
        onClick={() => setZoomed((z) => !z)}
        whileTap={{ scale: 0.98 }}
      >
        <ProductImagePlaceholder
          tone={product.tone}
          className={`aspect-square w-full transition-transform duration-300 ${zoomed ? 'scale-125' : 'scale-100'}`}
        />
      </motion.div>
      <div className="mt-3 flex gap-2">
        {thumbs.map((i) => (
          <div key={i} className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-primary-100">
            <ProductImagePlaceholder tone={product.tone} className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}
