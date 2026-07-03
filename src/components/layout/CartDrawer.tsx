import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/useCart'
import ProductCover from '../shared/ProductCover'
import ProductImagePlaceholder from '../shared/ProductImagePlaceholder'
import Button from '../shared/Button'
import { formatPrice } from '../../lib/format'
import { getProductBySlug } from '../../data/products'

export default function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, updateQuantity, removeItem } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-primary-900/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-cream-50 shadow-soft"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-primary-100 px-5 py-4">
              <h2 className="font-serif text-lg text-primary-800">Seu carrinho</h2>
              <button onClick={closeCart} aria-label="Fechar carrinho" className="p-1 text-primary-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="mt-8 text-center text-sm text-primary-500">Seu carrinho está vazio.</p>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => {
                    const product = getProductBySlug(item.productSlug)
                    return (
                    <li key={item.key} className="flex gap-3">
                      {product ? (
                        <ProductCover product={product} className="h-16 w-16 flex-shrink-0 rounded-lg" />
                      ) : (
                        <ProductImagePlaceholder tone={item.tone} className="h-16 w-16 flex-shrink-0 rounded-lg" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary-800">{item.name}</p>
                        <p className="text-xs text-primary-500">Kit {item.kitDays} dias</p>
                        <div className="mt-1 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-full border border-primary-200 px-2 py-0.5">
                            <button
                              className="px-1 text-primary-600"
                              onClick={() => updateQuantity(item.key, item.quantity - 1)}
                              aria-label="Diminuir quantidade"
                            >
                              −
                            </button>
                            <span className="text-sm">{item.quantity}</span>
                            <button
                              className="px-1 text-primary-600"
                              onClick={() => updateQuantity(item.key, item.quantity + 1)}
                              aria-label="Aumentar quantidade"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-semibold text-primary-800">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="mt-1 text-xs text-primary-400 underline-offset-2 hover:underline"
                        >
                          Remover
                        </button>
                      </div>
                    </li>
                    )
                  })}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-primary-100 px-5 py-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-primary-600">Subtotal</span>
                  <span className="text-lg font-semibold text-primary-800">{formatPrice(subtotal)}</span>
                </div>
                <Button to="/checkout" variant="cta" fullWidth onClick={closeCart}>
                  Finalizar compra
                </Button>
                <Link
                  to="/carrinho"
                  onClick={closeCart}
                  className="mt-2 block text-center text-xs text-primary-500 underline-offset-2 hover:underline"
                >
                  Ver carrinho completo
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
