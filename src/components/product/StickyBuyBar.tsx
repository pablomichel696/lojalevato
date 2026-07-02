import { motion } from 'framer-motion'
import { formatPrice } from '../../lib/format'
import Button from '../shared/Button'

type Props = {
  name: string
  price: number
  onBuy: () => void
}

export default function StickyBuyBar({ name, price, onBuy }: Props) {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 220, damping: 26 }}
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 border-t border-primary-100 bg-white px-4 py-3 shadow-soft md:hidden"
    >
      <div className="min-w-0">
        <p className="truncate text-xs text-primary-500">{name}</p>
        <p className="text-base font-semibold text-primary-800">{formatPrice(price)}</p>
      </div>
      <Button variant="cta" onClick={onBuy} className="flex-shrink-0">
        Comprar
      </Button>
    </motion.div>
  )
}
