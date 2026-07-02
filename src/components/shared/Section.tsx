import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  id?: string
  maxWidth?: string
}

export default function Section({ children, className = '', id, maxWidth = 'max-w-7xl' }: Props) {
  return (
    <section id={id} className={`mx-auto w-full ${maxWidth} px-4 py-10 sm:px-6 md:py-14 lg:px-8 ${className}`}>
      {children}
    </section>
  )
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  className = '',
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
}) {
  return (
    <div className={`mb-6 md:mb-8 ${className}`}>
      {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">{eyebrow}</p>}
      <h2 className="text-2xl font-medium text-primary-800 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 max-w-xl text-sm text-primary-600/80 sm:text-base">{subtitle}</p>}
    </div>
  )
}
