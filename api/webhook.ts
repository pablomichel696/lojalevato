import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'node:crypto'

/**
 * Webhook do Mercado Pago: recebe as notificações de pagamento e confirma o
 * pedido. O Vercel publica em /api/webhook. Configure esta URL no painel do
 * Mercado Pago (Suas integrações → Webhooks) para o evento "Pagamentos".
 *
 * Variáveis de ambiente (Vercel → Settings → Environment Variables):
 *   MERCADO_PAGO_ACCESS_TOKEN   (mesma do checkout)
 *   MERCADO_PAGO_WEBHOOK_SECRET (a "assinatura secreta" gerada no painel)
 *
 * O create-payment.ts já envia notification_url apontando para cá.
 */

const MP_API = 'https://api.mercadopago.com'

/** Valida a assinatura x-signature do Mercado Pago (HMAC-SHA256). */
function isValidSignature(req: VercelRequest, dataId: string, secret: string) {
  const sig = String(req.headers['x-signature'] || '')
  const reqId = String(req.headers['x-request-id'] || '')
  const parts = Object.fromEntries(
    sig.split(',').map((p) => p.split('=').map((s) => s.trim())),
  ) as Record<string, string>
  if (!parts.ts || !parts.v1) return false

  const manifest = `id:${dataId};request-id:${reqId};ts:${parts.ts};`
  const expected = crypto.createHmac('sha256', secret).update(manifest).digest('hex')
  const a = Buffer.from(expected)
  const b = Buffer.from(parts.v1)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN
  const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET

  try {
    const body = (req.body ?? {}) as { type?: string; action?: string; data?: { id?: string } }
    const type = body.type || (req.query.type as string) || ''
    const dataId = String(body.data?.id || req.query['data.id'] || '').toLowerCase()

    // Validação de assinatura (recomendada). Se o secret não estiver definido,
    // segue sem validar (útil em testes), mas o ideal é sempre configurar.
    if (secret && !isValidSignature(req, dataId, secret)) {
      return res.status(401).json({ error: 'Assinatura inválida' })
    }

    if (type === 'payment' && dataId && accessToken) {
      const r = await fetch(`${MP_API}/v1/payments/${dataId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      const payment = (await r.json()) as {
        id?: number
        status?: string
        status_detail?: string
        transaction_amount?: number
        external_reference?: string
      }

      if (payment.status === 'approved') {
        // >>> PONTO DE INTEGRAÇÃO: pagamento confirmado <<<
        // Aqui você marca o pedido como pago, baixa estoque e dispara a
        // confirmação por e-mail/WhatsApp. Use payment.external_reference
        // para achar o pedido correspondente.
        console.log('[webhook] Pagamento APROVADO', payment.id, payment.transaction_amount)
      } else {
        console.log('[webhook] Pagamento', payment.status, payment.status_detail, payment.id)
      }
    }

    // Responde 200 rápido para o Mercado Pago não reenviar a notificação.
    return res.status(200).json({ received: true })
  } catch (err) {
    // Loga o erro mas responde 200 para não entrar em loop de reenvio.
    console.error('[webhook] erro:', (err as Error).message)
    return res.status(200).json({ received: true })
  }
}
