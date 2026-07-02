/**
 * Thin wrapper around Meta Pixel (fbq) and Google Analytics 4 (gtag).
 * Both are safe no-ops until real IDs are wired up via index.html / .env —
 * see README for where to plug in production pixel/GA4 IDs.
 */
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    gtag?: (...args: unknown[]) => void
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
