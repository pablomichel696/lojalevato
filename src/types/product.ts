export type ProductBadge = 'mais-vendido' | 'lancamento' | 'promocao' | 'premium'

export type KitOption = {
  days: 30 | 60 | 90 | 120 | 150
  units: number
  unitPrice: number
  totalPrice: number
  discountPct: number
}

export type Review = {
  id: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  date: string
}

export type Product = {
  id: string
  slug: string
  name: string
  /** cápsulas por pote — omitir em produtos que não são cápsulas (ex.: chá) */
  capsules?: number
  /** mg por cápsula — omitir em produtos que não são cápsulas */
  mg?: number
  /** rótulo curto que substitui "X cápsulas · Ymg" (ex.: "Blend 11 ervas · 100g") */
  unitLabel?: string
  /** substantivo da unidade do kit (default "pote"), ex.: "pacote" para chá */
  unitNoun?: string
  /** ilustração de fallback: frasco (default) ou sachê/pouch */
  kind?: 'capsule' | 'pouch'
  /** fotos reais do produto em public/ (a 1ª é a capa). Sem isto, usa ilustração. */
  images?: string[]
  /** category slugs this product appears under (can be multiple) */
  categorySlugs: string[]
  price: number
  oldPrice?: number
  badges: ProductBadge[]
  tone: 'primary' | 'gold' | 'leaf'
  rating: number
  reviewCount: number
  shortDescription: string
  benefits: string[]
  composition: string[]
  howToUse: string
  reviews: Review[]
  crossSellSlugs: string[]
}
