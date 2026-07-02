import type { Product } from '../../types/product'

const TONE_BG: Record<Product['tone'], string> = {
  primary: 'bg-primary-50',
  gold: 'bg-gold-400/15',
  leaf: 'bg-leaf-400/15',
}

const TONE_FG: Record<Product['tone'], string> = {
  primary: 'text-primary-600',
  gold: 'text-gold-600',
  leaf: 'text-leaf-600',
}

type Props = {
  tone: Product['tone']
  className?: string
}

/**
 * Stand-in product photography: a stylized supplement bottle illustration.
 * Swap for real WebP photography in src/assets/products when available.
 */
export default function ProductImagePlaceholder({ tone, className = '' }: Props) {
  return (
    <div className={`flex items-center justify-center ${TONE_BG[tone]} ${className}`}>
      <svg viewBox="0 0 120 160" className={`h-2/3 w-2/3 ${TONE_FG[tone]}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="42" y="10" width="36" height="16" rx="4" stroke="currentColor" strokeWidth="3" />
        <path
          d="M36 26h48a6 6 0 0 1 6 6v104a10 10 0 0 1-10 10H40a10 10 0 0 1-10-10V32a6 6 0 0 1 6-6Z"
          stroke="currentColor"
          strokeWidth="3"
        />
        <line x1="26" y1="60" x2="94" y2="60" stroke="currentColor" strokeWidth="3" />
        <path d="M50 90c3-4 7-4 10 0s7 4 10 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 104c3-4 7-4 10 0s7 4 10 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
