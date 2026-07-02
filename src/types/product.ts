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
  capsules: number
  mg: number
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
