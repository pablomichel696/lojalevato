import { useEffect, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../shared/Button'

const STORAGE_KEY = 'levato-coupon-seen'

export default function CouponPopup() {
  const [visible, setVisible] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const timer = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  function close() {
    setVisible(false)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
    sessionStorage.setItem(STORAGE_KEY, '1')
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-primary-900/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="fixed left-1/2 top-1/2 z-[60] w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl2 bg-cream-50 p-6 text-center shadow-soft"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute right-3 top-3 p-1 text-primary-400 hover:text-primary-700"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">Bem-vindo(a) à Levato</p>
            <h2 className="mt-2 font-serif text-2xl text-primary-800">Ganhe 10% OFF</h2>
            <p className="mt-1 text-sm text-primary-600">na sua primeira compra, direto no seu e-mail.</p>

            {submitted ? (
              <p className="mt-5 font-medium text-leaf-600">Cupom LEVATO10 enviado! 🌿</p>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2">
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full rounded-full border border-primary-200 px-4 py-2.5 text-sm text-primary-800 outline-none focus:border-primary-400"
                />
                <Button type="submit" variant="cta" fullWidth>
                  Quero meu cupom
                </Button>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
