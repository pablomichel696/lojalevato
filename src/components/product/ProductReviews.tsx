import type { Product } from '../../types/product'

export default function ProductReviews({ product }: { product: Product }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-4">
        <p className="font-serif text-4xl text-primary-800">{product.rating.toFixed(1)}</p>
        <div>
          <p className="text-gold-500" aria-hidden>
            ★★★★★
          </p>
          <p className="text-xs text-primary-500">{product.reviewCount} avaliações</p>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {product.reviews.map((r) => (
          <li key={r.id} className="rounded-xl border border-primary-100 p-4">
            <div className="mb-1 flex items-center justify-between">
              <p className="text-sm font-medium text-primary-800">{r.author}</p>
              <p className="text-xs text-primary-400">{r.date}</p>
            </div>
            <p className="mb-1 text-gold-500" aria-hidden>
              {'★'.repeat(r.rating)}
              {'☆'.repeat(5 - r.rating)}
            </p>
            <p className="text-sm text-primary-600">{r.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
