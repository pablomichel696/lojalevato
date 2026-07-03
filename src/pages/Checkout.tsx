import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navigate, Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { trackBeginCheckout, trackPurchase } from '../lib/analytics'
import { formatPrice } from '../lib/format'
import { createCheckoutPreference } from '../lib/payments'
import Section, { SectionHeader } from '../components/shared/Section'
import Button from '../components/shared/Button'

const STEPS = ['Identificação', 'Entrega', 'Pagamento']

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState(0)
  const [payment, setPayment] = useState<'pix' | 'cartao'>('pix')
  const [orderId, setOrderId] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  async function next(e: FormEvent) {
    e.preventDefault()
    if (step === 0) trackBeginCheckout(subtotal)
    if (step < STEPS.length - 1) {
      setStep(step + 1)
      return
    }

    // Passo final: tenta o pagamento real via função serverless /api/create-payment.
    // Quando MERCADO_PAGO_ACCESS_TOKEN estiver configurado no Vercel, isto
    // redireciona o cliente para o Mercado Pago. Sem token (ou no dev local,
    // onde não existe /api), cai no fluxo mock de confirmação abaixo.
    setProcessing(true)
    try {
      const { init_point } = await createCheckoutPreference(items)
      window.location.href = init_point
      return
    } catch {
      // Fallback mock — mantém a demo funcionando sem gateway configurado.
      const id = `LEV-${Math.floor(100000 + Math.random() * 900000)}`
      trackPurchase(subtotal, id)
      setOrderId(id)
      clearCart()
    } finally {
      setProcessing(false)
    }
  }

  if (orderId) {
    return (
      <Section className="min-h-[60vh] text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-leaf-500/15 text-3xl text-leaf-600">
            ✓
          </div>
          <h1 className="font-serif text-2xl text-primary-800">Pedido confirmado!</h1>
          <p className="mt-2 text-sm text-primary-600">
            Seu pedido <strong>{orderId}</strong> foi recebido. Enviaremos os detalhes de acompanhamento por e-mail.
          </p>
          <div className="mt-6">
            <Button to="/" variant="cta">
              Voltar à loja
            </Button>
          </div>
        </div>
      </Section>
    )
  }

  if (items.length === 0) return <Navigate to="/carrinho" replace />

  return (
    <Section>
      <SectionHeader title="Finalizar compra" />

      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                i <= step ? 'bg-primary-700 text-cream-50' : 'bg-primary-100 text-primary-400'
              }`}
            >
              {i + 1}
            </div>
            <span className={`hidden text-xs sm:block ${i <= step ? 'text-primary-800' : 'text-primary-400'}`}>{label}</span>
            {i < STEPS.length - 1 && <div className="h-px flex-1 bg-primary-100" />}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.form
              key={step}
              onSubmit={next}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-3 rounded-xl2 bg-white p-5 shadow-card"
            >
              {step === 0 && (
                <>
                  <input required placeholder="Nome completo" className="input" />
                  <input required type="email" placeholder="E-mail" className="input" />
                  <input required placeholder="Telefone / WhatsApp" className="input" />
                </>
              )}
              {step === 1 && (
                <>
                  <input required placeholder="CEP" className="input" />
                  <input required placeholder="Endereço" className="input" />
                  <div className="flex gap-3">
                    <input required placeholder="Número" className="input" />
                    <input placeholder="Complemento" className="input" />
                  </div>
                  <input required placeholder="Bairro" className="input" />
                  <div className="flex gap-3">
                    <input required placeholder="Cidade" className="input" />
                    <input required placeholder="UF" className="input w-20" />
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <div className="mb-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setPayment('pix')}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${payment === 'pix' ? 'border-primary-700 bg-primary-50 text-primary-800' : 'border-primary-200 text-primary-500'}`}
                    >
                      Pix
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayment('cartao')}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium ${payment === 'cartao' ? 'border-primary-700 bg-primary-50 text-primary-800' : 'border-primary-200 text-primary-500'}`}
                    >
                      Cartão de crédito
                    </button>
                  </div>
                  {payment === 'pix' ? (
                    <p className="rounded-lg bg-leaf-500/10 p-3 text-xs text-leaf-700">
                      O QR Code Pix será gerado após a confirmação do pedido, com aprovação em poucos minutos.
                    </p>
                  ) : (
                    <>
                      <input required placeholder="Número do cartão" className="input" />
                      <div className="flex gap-3">
                        <input required placeholder="Validade (MM/AA)" className="input" />
                        <input required placeholder="CVV" className="input w-24" />
                      </div>
                      <input required placeholder="Nome impresso no cartão" className="input" />
                    </>
                  )}
                </>
              )}

              <div className="mt-2 flex gap-3">
                {step > 0 && (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Voltar
                  </Button>
                )}
                <Button type="submit" variant="cta" fullWidth disabled={processing}>
                  {step === STEPS.length - 1
                    ? processing
                      ? 'Processando...'
                      : 'Confirmar pedido'
                    : 'Continuar'}
                </Button>
              </div>
            </motion.form>
          </AnimatePresence>
        </div>

        <div className="h-fit rounded-xl2 bg-primary-50 p-5">
          <p className="mb-3 text-sm font-medium text-primary-800">Resumo do pedido</p>
          <ul className="mb-3 flex flex-col gap-1.5 text-xs text-primary-600">
            {items.map((item) => (
              <li key={item.key} className="flex justify-between">
                <span className="truncate pr-2">
                  {item.name} × {item.quantity}
                </span>
                <span className="flex-shrink-0">{formatPrice(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between border-t border-primary-200 pt-3 text-sm font-semibold text-primary-800">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Link to="/carrinho" className="mt-3 block text-center text-xs text-primary-500 hover:underline">
            Editar carrinho
          </Link>
        </div>
      </div>
    </Section>
  )
}
