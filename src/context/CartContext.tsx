import { createContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import type { Product } from '../types/product'
import { trackAddToCart } from '../lib/analytics'

export type CartItem = {
  key: string
  productSlug: string
  name: string
  tone: Product['tone']
  kitDays: number
  unitPrice: number
  quantity: number
}

type CartState = { items: CartItem[]; isOpen: boolean }

type CartAction =
  | { type: 'ADD'; item: Omit<CartItem, 'quantity'>; quantity: number }
  | { type: 'REMOVE'; key: string }
  | { type: 'UPDATE_QTY'; key: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'OPEN' }
  | { type: 'CLOSE' }
  | { type: 'HYDRATE'; items: CartItem[] }

const STORAGE_KEY = 'levato-cart'

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.key === action.item.key)
      const items = existing
        ? state.items.map((i) => (i.key === action.item.key ? { ...i, quantity: i.quantity + action.quantity } : i))
        : [...state.items, { ...action.item, quantity: action.quantity }]
      return { ...state, items, isOpen: true }
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter((i) => i.key !== action.key) }
    case 'UPDATE_QTY':
      return {
        ...state,
        items: state.items.map((i) => (i.key === action.key ? { ...i, quantity: Math.max(1, action.quantity) } : i)),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'OPEN':
      return { ...state, isOpen: true }
    case 'CLOSE':
      return { ...state, isOpen: false }
    case 'HYDRATE':
      return { ...state, items: action.items }
    default:
      return state
  }
}

export type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  subtotal: number
  itemCount: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], isOpen: false })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) dispatch({ type: 'HYDRATE', items: JSON.parse(raw) })
    } catch {
      // ignore corrupted local storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    // Só persiste após a hidratação — senão o estado inicial vazio
    // sobrescreveria um carrinho já salvo no localStorage.
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  }, [state.items, hydrated])

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    [state.items],
  )
  const itemCount = useMemo(() => state.items.reduce((sum, i) => sum + i.quantity, 0), [state.items])

  const value: CartContextValue = {
    items: state.items,
    isOpen: state.isOpen,
    subtotal,
    itemCount,
    addItem: (item, quantity = 1) => {
      dispatch({ type: 'ADD', item, quantity })
      trackAddToCart(item.name, item.unitPrice, quantity)
    },
    removeItem: (key) => dispatch({ type: 'REMOVE', key }),
    updateQuantity: (key, quantity) => dispatch({ type: 'UPDATE_QTY', key, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
    openCart: () => dispatch({ type: 'OPEN' }),
    closeCart: () => dispatch({ type: 'CLOSE' }),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
