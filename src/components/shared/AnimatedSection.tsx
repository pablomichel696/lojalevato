import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE_OUT } from '../../lib/motionVariants'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function AnimatedSection({ children, className = '', delay = 0, y = 24 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
