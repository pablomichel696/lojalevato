# Levato — Loja Virtual (protótipo de frontend)

Protótipo completo e navegável da loja Levato (suplementos encapsulados e produtos naturais), construído com **React + TypeScript + Tailwind CSS + Framer Motion** via **Vite**.

## Como rodar localmente

```bash
npm install
npm run dev
```

O site abre em `http://localhost:5173`. Qualquer alteração nos arquivos de `src/` atualiza a página automaticamente (hot reload).

Para gerar a build de produção (arquivos estáticos otimizados):

```bash
npm run build
npm run preview   # serve a build gerada localmente
```

## O que já está pronto

- Todas as páginas e seções do briefing: Home completa, catálogo por categoria (com o menu de Bem-Estar e Fitness e seus submenus), página de produto com seletor de kit (30/60/90/120/150 dias e desconto progressivo), carrinho, checkout em 3 passos, blog, sobre e páginas de política.
- Mega-menu no desktop e menu sanduíche no mobile, mobile-first.
- Carrinho funcional (estado local persistido em `localStorage`).
- Animações Framer Motion em toda a navegação, listas e transições de página.
- Popup de cupom de 10% (primeira visita), pop-up de newsletter, botão flutuante do WhatsApp.

## O que é mock/placeholder (próximos passos)

- **Fotos de produto**: usa uma ilustração SVG de frasco por categoria (`ProductImagePlaceholder`). Basta trocar por fotos reais em WebP quando disponíveis.
- **Pagamento**: o checkout é só a interface (Pix/cartão). Não há gateway real conectado — precisa integrar algo como Mercado Pago ou Pagar.me em `src/pages/Checkout.tsx`.
- **Analytics**: `src/lib/analytics.ts` já dispara `gtag`/`fbq` se existirem no `window`, mas os IDs reais do GA4 e do Meta Pixel ainda precisam ser inseridos (ex. via tags no `index.html`).
- **E-mail marketing**: os formulários de newsletter e cupom (`NewsletterSignup.tsx`, `CouponPopup.tsx`) só mostram uma confirmação visual — falta conectar a um ESP (Mailchimp, Klaviyo, RD Station etc.).
- **Recuperação de carrinho abandonado**: requer backend/e-mail transacional, fora do escopo deste protótipo de frontend.

## Estrutura

```
src/
  components/   layout, home, product, shared
  context/      CartContext (carrinho)
  data/         produtos, categorias, blog, políticas, depoimentos (mock)
  lib/          formatação de preço, cálculo de desconto por kit, analytics, texto legal ANVISA
  pages/        uma página por rota
```
