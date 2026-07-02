import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import Section, { SectionHeader } from '../components/shared/Section'
import Button from '../components/shared/Button'
import ProductImagePlaceholder from '../components/shared/ProductImagePlaceholder'
import { formatPrice } from '../lib/format'
import { FREE_SHIPPING_THRESHOLD } from '../lib/config'

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  if (items.length === 0) {
    return (
      <Section className="min-h-[50vh] text-center">
        <SectionHeader title="Seu carrinho está vazio" subtitle="Que tal conhecer nossos produtos mais vendidos?" />
        <Button to="/mais-vendidos" variant="cta">
          Ver mais vendidos
        </Button>
      </Section>
    )
  }

  return (
    <Section>
      <SectionHeader title="Meu carrinho" />

      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="flex flex-col gap-4 lg:col-span-2">
          {items.map((item) => (
            <li key={item.key} className="flex gap-4 rounded-xl2 bg-white p-4 shadow-card">
              <ProductImagePlaceholder tone={item.tone} className="h-20 w-20 flex-shrink-0 rounded-lg" />
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-800">{item.name}</p>
                  <p className="text-xs text-primary-500">Kit {item.kitDays} dias</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-primary-200 px-3 py-1">
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Diminuir quantidade">
                      −
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Aumentar quantidade">
                      +
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-primary-800">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </span>
                </div>
                <button onClick={() => removeItem(item.key)} className="mt-1 self-start text-xs text-primary-400 hover:underline">
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-xl2 bg-primary-50 p-5">
          {missingForFreeShipping > 0 ? (
            <p className="mb-3 text-xs text-primary-600">
              Faltam <strong>{formatPrice(missingForFreeShipping)}</strong> para você ganhar frete grátis!
            </p>
          ) : (
            <p className="mb-3 text-xs font-medium text-leaf-600">Você ganhou frete grátis! 🎉</p>
          )}
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-primary-600">Subtotal</span>
            <span className="text-xl font-semibold text-primary-800">{formatPrice(subtotal)}</span>
          </div>
          <Button to="/checkout" variant="cta" fullWidth>
            Finalizar compra
          </Button>
          <Link to="/loja" className="mt-3 block text-center text-xs text-primary-500 hover:underline">
            Continuar comprando
          </Link>
        </div>
      </div>
    </Section>
  )
}
