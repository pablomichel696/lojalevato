/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Número do WhatsApp em formato internacional só com dígitos, ex.: 5511999998888 */
  readonly VITE_WHATSAPP_NUMBER?: string
  /** Texto exibido no rodapé, ex.: (11) 99999-8888 */
  readonly VITE_WHATSAPP_DISPLAY?: string
  /** ID de medição do Google Analytics 4, ex.: G-XXXXXXXXXX */
  readonly VITE_GA4_ID?: string
  /** ID do Meta (Facebook) Pixel, ex.: 123456789012345 */
  readonly VITE_META_PIXEL_ID?: string
  /** E-mail de contato exibido no site */
  readonly VITE_CONTACT_EMAIL?: string
  /** Valor mínimo (em reais) para frete grátis, ex.: 199 */
  readonly VITE_FREE_SHIPPING_THRESHOLD?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
