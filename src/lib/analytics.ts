/**
 * Wrapper do Meta Pixel (fbq) e do Google Analytics 4 (gtag).
 * initAnalytics() carrega os scripts automaticamente quando os IDs estão
 * definidos nas variáveis de ambiente (VITE_GA4_ID / VITE_META_PIXEL_ID).
 * Sem IDs, tudo vira no-op seguro.
 */
import { GA4_ID, META_PIXEL_ID } from './config'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

let initialized = false

/** Injeta os scripts de GA4 e Meta Pixel. Chame uma vez no bootstrap da app. */
export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return
  initialized = true

  if (GA4_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA4_ID)
  }

  if (META_PIXEL_ID) {
    /* eslint-disable */
    ;(function (f: any, b, e, v) {
      if (f.fbq) return
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      })
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      const t = b.createElement(e) as HTMLScriptElement
      t.async = true
      t.src = v
      const s = b.getElementsByTagName(e)[0]
      s.parentNode!.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */
    window.fbq!('init', META_PIXEL_ID)
    window.fbq!('track', 'PageView')
  }
}

function fire(event: string, params?: Record<string, unknown>) {
  if (typeof window === 'undefined') return
  window.gtag?.('event', event, params)
  window.fbq?.('track', event, params)
}

export function trackViewItem(productName: string, price: number) {
  fire('view_item', { item_name: productName, value: price, currency: 'BRL' })
}

export function trackAddToCart(productName: string, price: number, quantity: number) {
  fire('add_to_cart', { item_name: productName, value: price * quantity, quantity, currency: 'BRL' })
}

export function trackBeginCheckout(value: number) {
  fire('begin_checkout', { value, currency: 'BRL' })
}

export function trackPurchase(value: number, orderId: string) {
  fire('purchase', { value, currency: 'BRL', transaction_id: orderId })
}
