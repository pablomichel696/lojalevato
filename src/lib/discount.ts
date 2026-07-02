import type { KitOption } from '../types/product'

const TIERS: { days: KitOption['days']; discount: number }[] = [
  { days: 30, discount: 0 },
  { days: 60, discount: 0.08 },
  { days: 90, discount: 0.15 },
  { days: 120, discount: 0.2 },
  { days: 150, discount: 0.25 },
]

/** Builds progressive-discount kit options from a product's base 30-day price. */
export function buildKitOptions(basePrice: number): KitOption[] {
  return TIERS.map(({ days, discount }) => {
    const bottles = days / 30
    const grossTotal = basePrice * bottles
    const totalPrice = Math.round(grossTotal * (1 - discount) * 100) / 100
    const unitPrice = Math.round((totalPrice / bottles) * 100) / 100
    return {
      days,
      units: bottles,
      unitPrice,
      totalPrice,
      discountPct: Math.round(discount * 100),
    }
  })
}
