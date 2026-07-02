type LogoProps = {
  /** "badge" = purple rounded block like the brand mark, "wordmark" = plain text */
  variant?: 'badge' | 'wordmark'
  /** text color for the wordmark variant */
  tone?: 'dark' | 'light'
  className?: string
}

/**
 * Recreation of the Levato brand mark (deep purple badge, serif "LEVATO"
 * wordmark) since no image asset was available to import directly.
 */
export default function Logo({ variant = 'wordmark', tone = 'dark', className = '' }: LogoProps) {
  if (variant === 'badge') {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-xl2 bg-primary-700 px-5 py-3 ${className}`}
      >
        <span className="font-serif text-xl tracking-[0.25em] text-cream-100">LEVATO</span>
      </span>
    )
  }

  return (
    <span
      className={`font-serif text-xl tracking-[0.2em] ${tone === 'light' ? 'text-cream-100' : 'text-primary-700'} ${className}`}
    >
      LEVATO
    </span>
  )
}
