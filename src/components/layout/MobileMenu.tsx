import { useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { mainNav } from '../../data/categories'
import CategoryIcon from '../shared/CategoryIcon'
import Logo from '../shared/Logo'

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-primary-900/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed left-0 top-0 z-50 flex h-full w-full max-w-xs flex-col bg-cream-50 shadow-soft md:hidden"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-primary-100 px-5 py-4">
              <Logo />
              <button onClick={onClose} aria-label="Fechar menu" className="p-1 text-primary-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              {mainNav.map((item) => (
                <div key={item.path} className="border-b border-primary-50">
                  {item.submenu ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between px-2 py-3 text-left text-sm font-medium text-primary-800"
                        onClick={() => setExpanded(expanded === item.path ? null : item.path)}
                      >
                        {item.label}
                        <svg
                          viewBox="0 0 24 24"
                          className={`h-4 w-4 transition-transform ${expanded === item.path ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {expanded === item.path && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3"
                          >
                            <Link
                              to={item.path}
                              onClick={onClose}
                              className="flex items-center gap-2 py-2 text-sm font-medium text-primary-700"
                            >
                              Ver tudo em {item.label}
                            </Link>
                            {item.submenu.map((sub) => (
                              <Link
                                key={sub.slug}
                                to={`/categoria/${sub.slug}`}
                                onClick={onClose}
                                className="flex items-center gap-2 py-2 text-sm text-primary-600"
                              >
                                <CategoryIcon name={sub.icon} className="h-4 w-4 text-leaf-600" />
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link to={item.path} onClick={onClose} className="block px-2 py-3 text-sm font-medium text-primary-800">
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  )
}
