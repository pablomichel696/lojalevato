import { formatPrice, formatInstallments, discountPercent } from '../../lib/format'

type Props = {
  price: number
  oldPrice?: number
  showInstallments?: boolean
  size?: 'sm' | 'lg'
}

export default function PriceTag({ price, oldPrice, showInstallments = false, size = 'sm' }: Props) {
  const pct = discountPercent(price, oldPrice)
  return (
    <div>
      <div className="flex items-baseline gap-2">
        {oldPrice && <span className="text-sm text-primary-400 line-through">{formatPrice(oldPrice)}</span>}
        <span className={`font-semibold text-primary-800 ${size === 'lg' ? 'text-3xl' : 'text-lg'}`}>
          {formatPrice(price)}
        </span>
        {pct && (
          <span className="rounded bg-leaf-500/15 px-1.5 py-0.5 text-xs font-bold text-leaf-600">-{pct}%</span>
        )}
      </div>
      {showInstallments && <p className="mt-0.5 text-xs text-primary-500">{formatInstallments(price)}</p>}
    </div>
  )
}
