import { useState } from 'react'
import type { Product } from '../../types/product'
import ProductImagePlaceholder from './ProductImagePlaceholder'

type Props = {
  product: Product
  /** força uma imagem específica (ex.: miniatura da galeria); default = capa */
  src?: string
  className?: string
}

/**
 * Mostra a foto real do produto quando existe em `product.images`; se o arquivo
 * não carregar (ainda não adicionado), cai graciosamente na ilustração de
 * fallback. Assim o site nunca exibe imagem quebrada.
 */
export default function ProductCover({ product, src, className = '' }: Props) {
  const [broken, setBroken] = useState(false)
  const url = src ?? product.images?.[0]

  if (url && !broken) {
    return (
      <img
        src={url}
        alt={product.name}
        loading="lazy"
        onError={() => setBroken(true)}
        className={`bg-white object-contain ${className}`}
      />
    )
  }

  return <ProductImagePlaceholder tone={product.tone} kind={product.kind} className={className} />
}
