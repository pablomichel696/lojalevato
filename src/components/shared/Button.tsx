import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'cta' | 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const VARIANT_CLASSES: Record<Variant, string> = {
  cta: 'bg-gold-500 text-primary-900 hover:bg-gold-600 shadow-soft',
  primary: 'bg-primary-700 text-cream-50 hover:bg-primary-800 shadow-soft',
  outline: 'border-2 border-primary-700 text-primary-700 hover:bg-primary-50',
  ghost: 'text-primary-700 hover:bg-primary-50',
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base',
}

type Props = {
  children: ReactNode
  variant?: Variant
  size?: Size
  to?: string
  href?: string
  className?: string
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false,
}: Props) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-colors ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  const motionProps = { whileTap: { scale: 0.96 }, whileHover: { scale: 1.02 } }

  if (to) {
    return (
      <motion.div {...motionProps} className={fullWidth ? 'w-full' : 'inline-block'}>
        <Link to={to} className={classes} onClick={onClick}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.div {...motionProps} className={fullWidth ? 'w-full' : 'inline-block'}>
        <a href={href} target="_blank" rel="noreferrer" className={classes} onClick={onClick}>
          {children}
        </a>
      </motion.div>
    )
  }

  return (
    <motion.button {...motionProps} type={type} disabled={disabled} className={classes} onClick={onClick}>
      {children}
    </motion.button>
  )
}
