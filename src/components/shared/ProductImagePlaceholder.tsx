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
  kind?: Product['kind']
  className?: string
}

/**
 * Stand-in product photography: a stylized illustration (supplement bottle or
 * stand-up pouch). Used as fallback when a product has no real photo in
 * `images`. Swap for real WebP photography under public/products when available.
 */
export default function ProductImagePlaceholder({ tone, kind = 'capsule', className = '' }: Props) {
  return (
    <div className={`flex items-center justify-center ${TONE_BG[tone]} ${className}`}>
      <svg viewBox="0 0 120 160" className={`h-2/3 w-2/3 ${TONE_FG[tone]}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        {kind === 'pouch' ? (
          <>
            {/* selo superior do sachê */}
            <rect x="28" y="18" width="64" height="9" rx="2" stroke="currentColor" strokeWidth="3" />
            {/* corpo do stand-up pouch */}
            <path
              d="M30 27h60a3 3 0 0 1 3 3v106a10 10 0 0 1-10 10H37a10 10 0 0 1-10-10V30a3 3 0 0 1 3-3Z"
              stroke="currentColor"
              strokeWidth="3"
            />
            {/* rótulo */}
            <rect x="41" y="66" width="38" height="46" rx="3" stroke="currentColor" strokeWidth="2.5" />
            {/* folhinha */}
            <path d="M60 78c-6 0-11 4-11 10 6 0 11-4 11-10Z" fill="currentColor" opacity="0.5" />
            <path d="M60 78c6 0 11 4 11 10-6 0-11-4-11-10Z" fill="currentColor" opacity="0.8" />
            <line x1="52" y1="98" x2="68" y2="98" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <rect x="42" y="10" width="36" height="16" rx="4" stroke="currentColor" strokeWidth="3" />
            <path
              d="M36 26h48a6 6 0 0 1 6 6v104a10 10 0 0 1-10 10H40a10 10 0 0 1-10-10V32a6 6 0 0 1 6-6Z"
              stroke="currentColor"
              strokeWidth="3"
            />
            <line x1="26" y1="60" x2="94" y2="60" stroke="currentColor" strokeWidth="3" />
            <path d="M50 90c3-4 7-4 10 0s7 4 10 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M50 104c3-4 7-4 10 0s7 4 10 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}
      </svg>
    </div>
  )
}
