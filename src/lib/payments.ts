import type { CartItem } from '../context/CartContext'

export type CreatePaymentResponse = { id: string; init_point: string }

/**
 * Chama a função serverless /api/create-payment e devolve a URL do
 * Mercado Pago. Redirecione o cliente para resp.init_point para concluir
 * o pagamento (Pix, cartão ou boleto).
 *
 * Só funciona depois que MERCADO_PAGO_ACCESS_TOKEN estiver definido no
 * ambiente do Vercel. No dev local (vite) não existe /api, então trate o
 * erro e use o fluxo mock — veja o uso em src/pages/Checkout.tsx.
 */
export async function createCheckoutPreference(
  items: CartItem[],
  payerEmail?: string,
): Promise<CreatePaymentResponse> {
  const res = await fetch('/api/create-payment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      payerEmail,
      items: items.map((i) => ({
        title: `${i.name} — Kit ${i.kitDays} dias`,
        quantity: i.quantity,
        unit_price: i.unitPrice,
      })),
    }),
  })

  if (!res.ok) {
    const err = (await res.json().catch(() => ({}))) as { error?: string }
    throw new Error(err.error ?? 'Falha ao iniciar pagamento')
  }

  return (await res.json()) as CreatePaymentResponse
}
