// Reescreve src/data/products.ts com composição + benefícios mais ricos,
// derivados dos ingredientes de cada produto (scripts/ingredients.mjs).
// Não faz rede — opera sobre o catálogo já importado.
// Uso: node scripts/enrich-products.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { enrichProduct } from './ingredients.mjs'
import { products } from '../src/data/products.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.resolve(__dirname, '..', 'src', 'data', 'products.ts')

// Remove specs/marca que sobraram no nome (ex.: "120 Cápsulas 500mg", "Flow Nature").
const tidyName = (raw = '') => {
  const n = raw
    .replace(/\s+\d+\s*(c[aá]psulas?|caps|cps)\b[\s\S]*$/i, '')
    .replace(/\s*[-–|]\s*(flow nature|nutri\s?life|nutri\s?vivus|linha premium|max life|natu ervas)\b[\s\S]*$/i, '')
    .replace(/\s*[-–|]\s*\d+\s*mg\b/gi, '').replace(/\s+\d+\s*mg\b/gi, '')
    .replace(/\s+\d+\s*g\b\s*$/i, '')
    .replace(/\s*[-–|]\s*$/, '').replace(/\s{2,}/g, ' ').trim()
  return n || raw
}

const enriched = products.map((p) => ({ ...p, name: tidyName(p.name), ...enrichProduct(p) }))

const header = `import type { Product } from '../types/product'

// Catálogo importado da loja levato.com.br (scripts/import-wix.mjs) e enriquecido
// com composição/benefícios por ingrediente (scripts/enrich-products.mjs).

export const products: Product[] = `

const footer = `

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(slug: string) {
  if (slug === 'toda-loja') return products
  if (slug === 'mais-vendidos') return products.filter((p) => p.badges.includes('mais-vendido'))
  if (slug === 'lancamentos') return products.filter((p) => p.badges.includes('lancamento'))
  if (slug === 'promocoes') return products.filter((p) => p.badges.includes('promocao'))
  if (slug === 'linha-premium') return products.filter((p) => p.badges.includes('premium'))
  return products.filter((p) => p.categorySlugs.includes(slug))
}
`

fs.writeFileSync(OUT, header + JSON.stringify(enriched, null, 2) + footer)
console.log(`Enriquecidos ${enriched.length} produtos.`)
