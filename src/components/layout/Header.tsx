import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { mainNav } from '../../data/categories'
import { useCart } from '../../context/useCart'
import Logo from '../shared/Logo'
import MegaMenu from './MegaMenu'
import MobileMenu from './MobileMenu'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const { itemCount, openCart } = useCart()
  const navigate = useNavigate()

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    navigate(`/loja?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
  }

  return (
    <header className="sticky top-0 z-30 bg-cream-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 md:hidden">
          <button aria-label="Abrir menu" onClick={() => setMobileOpen(true)} className="p-1.5 text-primary-700">
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <Link to="/" className="flex-1 text-center md:flex-none md:text-left">
          <Logo className="inline-block" />
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {mainNav.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => setHoveredNav(item.path)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <Link
                to={item.path}
                className="block whitespace-nowrap px-3 py-2 text-[13px] font-medium text-primary-700 transition-colors hover:text-primary-900"
              >
                {item.label}
              </Link>
              <AnimatePresence>
                {item.submenu && hoveredNav === item.path && (
                  <MegaMenu items={item.submenu} onNavigate={() => setHoveredNav(null)} />
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            aria-label="Buscar"
            onClick={() => setSearchOpen((v) => !v)}
            className="p-1.5 text-primary-700 hover:text-primary-900"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
            </svg>
          </button>
          <button
            aria-label="Abrir carrinho"
            onClick={openCart}
            className="relative p-1.5 text-primary-700 hover:text-primary-900"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6 5 3H2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4.5 min-w-[18px] items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-primary-900">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {searchOpen && (
          <div className="border-t border-primary-100 bg-cream-50 px-4 py-3">
            <form onSubmit={submitSearch} className="mx-auto flex max-w-md items-center gap-2">
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="w-full rounded-full border border-primary-200 bg-white px-4 py-2 text-sm text-primary-800 outline-none focus:border-primary-400"
              />
              <button type="submit" className="rounded-full bg-primary-700 px-4 py-2 text-sm font-medium text-cream-50">
                Buscar
              </button>
            </form>
          </div>
        )}
      </AnimatePresence>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
