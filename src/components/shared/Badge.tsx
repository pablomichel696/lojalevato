import type { ProductBadge } from '../../types/product'

const BADGE_CONFIG: Record<ProductBadge, { label: string; className: string }> = {
  'mais-vendido': { label: 'Mais vendido', className: 'bg-gold-500 text-primary-900' },
  lancamento: { label: 'Lançamento', className: 'bg-primary-700 text-cream-50' },
  promocao: { label: 'Promoção', className: 'bg-red-600 text-white' },
  premium: { label: 'Premium', className: 'bg-primary-900 text-gold-400' },
}

export default function Badge({ type, className = '' }: { type: ProductBadge; className?: string }) {
  const cfg = BADGE_CONFIG[type]
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${cfg.className} ${className}`}>
      {cfg.label}
    </span>
  )
}
