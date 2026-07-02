import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Category } from '../../types/category'
import CategoryIcon from '../shared/CategoryIcon'

export default function MegaMenu({ items, onNavigate }: { items: Category[]; onNavigate: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.18 }}
      className="absolute left-1/2 top-full z-40 w-[640px] -translate-x-1/2 rounded-b-xl2 border-t border-primary-100 bg-white p-6 shadow-soft"
    >
      <div className="grid grid-cols-3 gap-x-6 gap-y-3">
        {items.map((item) => (
          <Link
            key={item.slug}
            to={`/categoria/${item.slug}`}
            onClick={onNavigate}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-primary-700 transition-colors hover:bg-primary-50 hover:text-primary-900"
          >
            <CategoryIcon name={item.icon} className="h-4 w-4 flex-shrink-0 text-leaf-600" />
            {item.name}
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
