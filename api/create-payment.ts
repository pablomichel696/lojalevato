import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Função serverless de exemplo para criar um pagamento no Mercado Pago.
 * O Vercel publica este arquivo automaticamente em /api/create-payment
 * (runtime Node.js) — não precisa configurar rota.
 *
 * PRÉ-REQUISITOS
 * 1. Crie um app em https://www.mercadopago.com.br/developers
 * 2. No Vercel (Settings → Environment Variables) defina a credencial do
 *    SERVIDOR, SEM prefixo VITE_ (ela nunca deve chegar ao navegador):
 *        MERCADO_PAGO_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxx
 *
 * Este exemplo usa o Checkout Pro: cria uma "preference" e devolve a URL
 * (init_point) para onde o cliente é redirecionado. Assim o Mercado Pago
 * cuida de Pix, cartão e boleto, e o seu servidor não manipula dados de
 * cartão (sem carga de PCI). Veja no fim uma alternativa de Pix direto.
 */

const MP_API = 'https://api.mercadopago.com'

type CartLine = { title: string; quantity: number; unit_price: number }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN
  if (!accessToken) {
    return res.status(500).json({
      error: 'Pagamento não configurado. Defina MERCADO_PAGO_ACCESS_TOKEN no ambiente.',
    })
  }

  try {
    const { items, payerEmail } = (req.body ?? {}) as {
      items?: CartLine[]
      payerEmail?: string
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Carrinho vazio ou inválido.' })
    }

    // URL base do próprio site, para os redirects de retorno.
    const proto = (req.headers['x-forwarded-proto'] as string) ?? 'https'
    const baseUrl = `${proto}://${req.headers.host}`

    const preference = {
      items: items.map((i) => ({
        title: String(i.title).slice(0, 250),
        quantity: Math.max(1, Math.trunc(Number(i.quantity))),
        unit_price: Number(i.unit_price),
        currency_id: 'BRL',
      })),
      payer: payerEmail ? { email: payerEmail } : undefined,
      back_urls: {
        success: `${baseUrl}/checkout?status=sucesso`,
        failure: `${baseUrl}/checkout?status=falha`,
        pending: `${baseUrl}/checkout?status=pendente`,
      },
      auto_return: 'approved',
      // Mercado Pago notifica /api/webhook quando o pagamento muda de status.
      notification_url: `${baseUrl}/api/webhook`,
    }

    const mpRes = await fetch(`${MP_API}/checkout/preferences`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(preference),
    })

    const data = (await mpRes.json()) as { id?: string; init_point?: string }
    if (!mpRes.ok) {
      return res.status(mpRes.status).json({ error: 'Falha ao criar pagamento', details: data })
    }

    // init_point: URL para redirecionar o cliente e concluir o pagamento.
    return res.status(200).json({ id: data.id, init_point: data.init_point })
  } catch (err) {
    return res.status(500).json({ error: 'Erro interno', message: (err as Error).message })
  }
}

/*
 * ALTERNATIVA — Pix direto (gera QR Code no seu próprio checkout):
 *
 *   const mpRes = await fetch(`${MP_API}/v1/payments`, {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *       Authorization: `Bearer ${accessToken}`,
 *       'X-Idempotency-Key': crypto.randomUUID(),
 *     },
 *     body: JSON.stringify({
 *       transaction_amount: total,
 *       description: 'Pedido Levato',
 *       payment_method_id: 'pix',
 *       payer: { email: payerEmail },
 *     }),
 *   })
 *   // A resposta traz point_of_interaction.transaction_data.qr_code (copia e cola)
 *   // e qr_code_base64 (imagem do QR) para exibir na tela.
 *
 * Para cartão em checkout próprio, tokenize o cartão NO CLIENTE (SDK do
 * Mercado Pago / Bricks) e envie só o token para cá — nunca o número do cartão.
 */
