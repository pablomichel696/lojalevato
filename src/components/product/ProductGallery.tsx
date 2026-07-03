import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Product } from '../../types/product'
import ProductCover from '../shared/ProductCover'

export default function ProductGallery({ product }: { product: Product }) {
  const [zoomed, setZoomed] = useState(false)
  const [active, setActive] = useState(0)
  const images = product.images ?? []
  // Se houver fotos reais, navega por elas; senão mostra 4 miniaturas de fallback.
  const thumbs = images.length > 0 ? images : [undefined, undefined, undefined, undefined]

  return (
    <div>
      <motion.div
        className="cursor-zoom-in overflow-hidden rounded-xl2"
        onClick={() => setZoomed((z) => !z)}
        whileTap={{ scale: 0.98 }}
      >
        <ProductCover
          product={product}
          src={images[active]}
          className={`aspect-square w-full transition-transform duration-300 ${zoomed ? 'scale-125' : 'scale-100'}`}
        />
      </motion.div>
      <div className="mt-3 flex gap-2">
        {thumbs.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setActive(i)
              setZoomed(false)
            }}
            className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border transition-colors ${
              i === active ? 'border-primary-700' : 'border-primary-100 hover:border-primary-300'
            }`}
          >
            <ProductCover product={product} src={src} className="h-full w-full" />
          </button>
        ))}
      </div>
    </div>
  )
}
