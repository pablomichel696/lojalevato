/**
 * Configuração central do site lida de variáveis de ambiente (VITE_*).
 * No Vercel, defina esses valores em Settings → Environment Variables.
 * Todos têm fallback seguro para o site funcionar mesmo sem configuração.
 */
const env = import.meta.env

export const WHATSAPP_NUMBER = env.VITE_WHATSAPP_NUMBER ?? '5500000000000'
export const WHATSAPP_DISPLAY = env.VITE_WHATSAPP_DISPLAY ?? '(00) 00000-0000'
export const CONTACT_EMAIL = env.VITE_CONTACT_EMAIL ?? 'contato@levato.com.br'
export const GA4_ID = env.VITE_GA4_ID ?? ''
export const META_PIXEL_ID = env.VITE_META_PIXEL_ID ?? ''

export const FREE_SHIPPING_THRESHOLD = Number(env.VITE_FREE_SHIPPING_THRESHOLD ?? '199')

/** Monta um link wa.me com mensagem opcional pré-preenchida. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
