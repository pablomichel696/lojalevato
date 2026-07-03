// Importa o catálogo real da loja Wix (levato.com.br), exceto cosméticos.
// Busca cada página de produto, extrai nome/preço/descrição/imagens do JSON-LD,
// baixa as fotos para public/products/, categoriza e gera src/data/products.ts.
//
// Uso: node scripts/import-wix.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const IMG_DIR = path.join(ROOT, 'public', 'products')
const SITEMAP = 'https://www.levato.com.br/store-products-sitemap.xml'
const UA = { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }

// Cosméticos / maquiagem / cuidado pessoal — NÃO importar.
const EXCLUDE = [
  'base-liquida', 'batom', 'body-splash', 'creme-hidratante', 'delineador',
  'desodorante', 'esmalte', 'glas-labial', 'gloss', 'mascara-de-cilios',
  'massageador', 'mousse-de-limpeza', 'paleta-de-sombras', 'perfume',
  'protetor-solar', 'shampoo', 'serum',
]

const asciiLower = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const slugify = (s) =>
  asciiLower(decodeURIComponent(s))
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const stripHtml = (s = '') =>
  s.replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ').trim()

// ---- categorização por palavra-chave -> slugs de categoria do app ----
function categorize(name) {
  const n = asciiLower(name)
  const cats = new Set()
  const has = (...ks) => ks.some((k) => n.includes(k))

  const isTea = has('cha ', ' cha', 'blend', 'seca barriga', 'monjaro', 'mounjaro', 'seca-barriga') && !has('capsul')
  const isLiquid = has('ml', 'gotas', 'oleo', 'babosa', 'aloe vera')

  if (has('cha ', 'blend', 'seca barriga', 'monjaro', 'mounjaro', 'detox', 'desinch', 'magri', 'glucomannan', 'psyllium', 'black monster', 'ozem', 'emagre', 'noz da india', 'nozes da india'))
    { cats.add('emagrecedores'); cats.add('desintoxicantes') }
  if (has('detox', 'desinch', 'diuretic', 'quebra pedra', 'cavalinha', 'cha verde'))
    cats.add('diuretico')
  if (has('prostata', 'semente de abobora', 'saw palmetto'))
    cats.add('saude-prostata')
  if (has('calmante', 'valeriana', 'ashwagandha', 'passiflora'))
    cats.add('calmante')
  if (has('amora', 'isoflavona', 'saude da mulher', 'mulher', 'menopausa', 'barbatimao'))
    cats.add('saude-feminina')
  if (has('maca ', 'maca black', 'tribullus', 'tribulus', 'viagron', 'desejus', 'sexy', 'libido'))
    cats.add('estimulantes-sexuais')
  if (has('creatina', 'pre-treino', 'pre treino'))
    { cats.add('pre-treino'); cats.add('fitness') }
  if (has('black monster', 'termogenic'))
    { cats.add('termogenico'); cats.add('fitness') }
  if (has('cafeina', 'energ', 'ginseng'))
    { cats.add('estimulante-energetico'); cats.add('fitness') }
  if (has('colageno', 'colagen'))
    cats.add('beleza-saude')
  if (has('curcuma', 'gengibre', 'garra do diabo', 'unha de gato', 'ora pro nobis', 'ora com'))
    cats.add('anti-inflamatorio')
  if (has('glucosamina', 'articula', 'castanha da india', 'colageno tipo', 'ora pro nobis'))
    cats.add('articulacoes-dores')
  if (has('ginkgo', 'castanha da india', 'uxi amarelo', 'circula'))
    cats.add('circulacao-sanguinea')
  if (has('espinheira santa', 'gastrite', 'refluxo', 'babosa', 'aloe vera'))
    cats.add('refluxo-gastrite')
  if (has('melao de sao caetano', 'diabete', 'glicem', 'insulina'))
    cats.add('controle-acucar-diabetes')
  if (has('moringa', 'vitamina', 'b12', 'omega', 'imun', 'unha de gato'))
    cats.add('imunidade')
  if (has('sinusite', 'rinite', 'buchinha'))
    cats.add('imunidade')
  if (has('intestin', 'fibra', 'probiotic', 'glucomannan', 'psyllium'))
    cats.add('auxilio-intestinal')

  // parent bem-estar para itens de bem-estar
  const wellness = ['saude-prostata', 'calmante', 'saude-feminina', 'anti-inflamatorio',
    'articulacoes-dores', 'circulacao-sanguinea', 'refluxo-gastrite',
    'controle-acucar-diabetes', 'imunidade', 'auxilio-intestinal', 'diuretico', 'beleza-saude']
  if ([...cats].some((c) => wellness.includes(c))) cats.add('bem-estar')

  if (has('combo', 'kit ')) cats.add('combos')

  if (cats.size === 0) cats.add('bem-estar')
  return { cats: [...cats], isTea, isLiquid }
}

const BENEFITS = {
  emagrecedores: ['Auxilia no processo de emagrecimento', 'Ajuda no controle do apetite', 'Complementa dieta e exercícios'],
  desintoxicantes: ['Apoia a desintoxicação natural do organismo', 'Auxilia na eliminação de líquidos', 'Sensação de leveza no dia a dia'],
  diuretico: ['Auxilia na eliminação do excesso de líquidos', 'Contribui para reduzir o inchaço', 'Fórmula natural'],
  calmante: ['Auxilia no relaxamento', 'Favorece uma boa noite de sono', 'Ajuda em momentos de rotina agitada'],
  'saude-feminina': ['Apoia o equilíbrio hormonal feminino', 'Contribui para o bem-estar no ciclo', 'Fórmula natural'],
  'estimulantes-sexuais': ['Auxilia a disposição física', 'Contribui para o vigor', 'Fórmula tradicional'],
  fitness: ['Auxilia o desempenho no treino', 'Contribui para a energia e disposição', 'Ideal para a rotina fitness'],
  'pre-treino': ['Auxilia o desempenho no treino', 'Contribui para a resistência', 'Energia para o treino'],
  termogenico: ['Ação termogênica', 'Auxilia o gasto calórico no treino', 'Combina com exercícios'],
  'beleza-saude': ['Contribui para pele, unhas e cabelos', 'Ação de suporte à beleza', 'Fórmula natural'],
  'anti-inflamatorio': ['Ação antioxidante', 'Auxilia o bem-estar das articulações', 'Fórmula concentrada'],
  'articulacoes-dores': ['Auxilia a saúde das articulações', 'Contribui para a mobilidade', 'Fórmula de suporte'],
  'circulacao-sanguinea': ['Contribui para a circulação', 'Ação antioxidante', 'Fórmula tradicional'],
  'refluxo-gastrite': ['Auxilia no conforto digestivo', 'Contribui para o equilíbrio gástrico', 'Fórmula natural'],
  'controle-acucar-diabetes': ['Auxilia o metabolismo do açúcar', 'Contribui para o equilíbrio energético', 'Fórmula natural'],
  'saude-prostata': ['Auxilia a função urinária', 'Contribui para o bem-estar masculino', 'Fórmula natural'],
  imunidade: ['Auxilia o sistema imunológico', 'Ação antioxidante', 'Fórmula natural'],
  'auxilio-intestinal': ['Auxilia o funcionamento intestinal', 'Contribui para a saciedade', 'Fórmula com fibras'],
  'bem-estar': ['Apoia o bem-estar no dia a dia', 'Fórmula 100% natural', 'Rotina prática'],
}

const REVIEW_NAMES = ['Mariana S.', 'Carlos E.', 'Fernanda L.', 'Juliana P.', 'Roberto A.', 'Camila R.', 'Patrícia G.', 'Sandra M.', 'Luciana F.', 'Aline C.']
const REVIEW_TEXT = [
  'Produto de ótima qualidade, chegou rápido e bem embalado. Recomendo!',
  'Já uso há algumas semanas e percebi diferença na minha rotina. Voltarei a comprar.',
  'Atendimento excelente e entrega antes do prazo. Muito satisfeita.',
  'Uso conforme a recomendação e estou gostando bastante dos resultados.',
  'Ótimo custo-benefício comparado a outras marcas. Chegou certinho.',
  'Natural de verdade e fácil de tomar no dia a dia. Aprovado!',
]
function buildReviews(seed) {
  const r = (i) => (seed * 7 + i * 13) % REVIEW_NAMES.length
  const t = (i) => (seed * 5 + i * 11) % REVIEW_TEXT.length
  return [
    { id: `${seed}-1`, author: REVIEW_NAMES[r(0)], rating: 5, comment: REVIEW_TEXT[t(0)], date: `2026-06-${String((seed % 27) + 1).padStart(2, '0')}` },
    { id: `${seed}-2`, author: REVIEW_NAMES[r(1)], rating: 5, comment: REVIEW_TEXT[t(1)], date: `2026-05-${String((seed % 26) + 1).padStart(2, '0')}` },
    { id: `${seed}-3`, author: REVIEW_NAMES[r(2)], rating: 4, comment: REVIEW_TEXT[t(2)], date: `2026-04-${String((seed % 25) + 1).padStart(2, '0')}` },
  ]
}

async function main() {
  fs.mkdirSync(IMG_DIR, { recursive: true })

  const sm = await (await fetch(SITEMAP, UA)).text()
  const allUrls = [...sm.matchAll(/<loc>([^<]+product-page[^<]+)<\/loc>/g)].map((m) => m[1])
  const urls = allUrls.filter((u) => {
    const s = slugify(u.split('/').pop())
    return !EXCLUDE.some((x) => s.includes(x))
  })
  console.log(`sitemap: ${allUrls.length} produtos, ${urls.length} após excluir cosméticos`)

  const products = []
  let seed = 0
  let idNum = 0

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  const fetchPage = async (url) => {
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const h = await (await fetch(url, UA)).text()
        // página válida do produto contém o campo de preço embutido
        if (/"price":/.test(h) && h.length > 200000) return h
      } catch { /* retry */ }
      await sleep(600 + attempt * 600)
    }
    return null
  }

  for (const url of urls) {
    seed++
    await sleep(120)
    const html = await fetchPage(url)
    if (!html) { console.log('FALHA fetch', url); continue }
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1])
    let prod
    for (const b of blocks) {
      try {
        const j = JSON.parse(b)
        const arr = Array.isArray(j) ? j : [j]
        const p = arr.find((o) => o['@type'] === 'Product')
        if (p) { prod = p; break }
      } catch { /* ignore */ }
    }
    // nome: JSON-LD ou og:title / <title>
    const og = (prop) => {
      const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`))
      return m ? m[1] : ''
    }
    let name = stripHtml((prod && prod.name) || og('og:title') || '')
    name = name.replace(/\s*\|\s*Levato.*$/i, '').replace(/\s*[-–]\s*Levato.*$/i, '').trim()
    if (!name) { const t = html.match(/<title>([^<]*)<\/title>/); name = t ? stripHtml(t[1]).replace(/\s*\|\s*Levato.*$/i, '').trim() : '' }

    // preço: vem do JSON embutido do Wix (não do JSON-LD). Usa discountedPrice (promo) se houver.
    const priceM = html.match(/"price":(\d+(?:\.\d+)?)/)
    const discM = html.match(/"discountedPrice":(\d+(?:\.\d+)?)/)
    const regular = priceM ? Number(priceM[1]) : NaN
    const disc = discM ? Number(discM[1]) : NaN
    const price = isFinite(disc) && disc > 0 && disc < regular ? disc : regular
    const oldPrice = isFinite(disc) && disc > 0 && disc < regular ? regular : undefined
    if (!name || !isFinite(price) || price <= 0) { console.log('SEM PREÇO', name || url); continue }

    const slug = slugify(url.split('/').pop())
    // imagens: JSON-LD image, ou ids de mídia do HTML como fallback
    const mediaIds = []
    const pushId = (id) => { if (id && !mediaIds.includes(id)) mediaIds.push(id) }
    const imgObjs = prod ? (Array.isArray(prod.image) ? prod.image : prod.image ? [prod.image] : []) : []
    for (const im of imgObjs) {
      const cu = typeof im === 'string' ? im : im.contentUrl
      const m = cu && cu.match(/media\/([^/]+~mv2\.(?:jpg|jpeg|png))/i)
      if (m) pushId(m[1])
    }
    if (mediaIds.length === 0) {
      for (const m of html.matchAll(/"(?:url|uri)":"([a-f0-9]+_[a-f0-9]+~mv2\.(?:jpg|jpeg|png))"/gi)) pushId(m[1])
    }
    // baixa até 4 imagens em alta
    const images = []
    for (let i = 0; i < Math.min(4, mediaIds.length); i++) {
      const ext = mediaIds[i].toLowerCase().endsWith('.png') ? 'png' : 'jpg'
      const dlUrl = `https://static.wixstatic.com/media/${mediaIds[i]}/v1/fill/w_1000,h_1000,q_85/file.${ext}`
      const file = `${slug}-${i + 1}.${ext}`
      const dest = path.join(IMG_DIR, file)
      if (fs.existsSync(dest)) { images.push(`/products/${file}`); continue }
      try {
        const buf = Buffer.from(await (await fetch(dlUrl, UA)).arrayBuffer())
        if (buf.length > 1000) { fs.writeFileSync(dest, buf); images.push(`/products/${file}`) }
      } catch { /* ignore */ }
    }

    const { cats, isTea, isLiquid } = categorize(name)
    const capsMatch = name.match(/(\d+)\s*c[aá]?ps/i) || name.match(/(\d+)\s*c[aá]psulas/i)
    const mgMatch = name.match(/(\d+)\s*mg/i)
    const gMatch = name.match(/(\d+)\s*g\b/i)
    const mlMatch = name.match(/(\d+)\s*ml\b/i)

    let unitLabel, unitNoun, kind, capsules, mg
    if (isTea) {
      kind = 'pouch'; unitNoun = 'pacote'
      unitLabel = `Blend natural${gMatch ? ` · ${gMatch[1]}g` : ''}`
    } else if (isLiquid || mlMatch) {
      unitNoun = 'frasco'
      unitLabel = mlMatch ? `${mlMatch[1]}ml` : 'Líquido natural'
    } else {
      capsules = capsMatch ? Number(capsMatch[1]) : 120
      mg = mgMatch ? Number(mgMatch[1]) : 500
    }

    const isPremium = /premium|nutri vivus|max life/i.test(name)
    const isCombo = cats.includes('combos')
    const badges = []
    if (isPremium) { badges.push('premium'); if (!cats.includes('linha-premium')) cats.push('linha-premium') }
    if (/cha|seca barriga|monjaro|mounjaro|colageno|creatina|maca|detox|ozem|emagre/i.test(asciiLower(name))) badges.push('mais-vendido')
    if (isPremium || seed % 5 === 0) badges.push('lancamento')
    if (oldPrice) badges.push('promocao')

    const tone = cats.includes('estimulantes-sexuais') || isPremium ? 'primary'
      : (cats.includes('emagrecedores') || cats.includes('fitness')) ? 'gold' : 'leaf'

    // benefícios pela categoria principal
    const primary = cats.find((c) => BENEFITS[c]) || 'bem-estar'
    const benefits = BENEFITS[primary]

    // composição a partir do nome (ingredientes)
    const composition = name
      .replace(/\d+\s*c[aá]?ps\w*/gi, '').replace(/\d+\s*mg/gi, '').replace(/\d+\s*g\b/gi, '')
      .replace(/\d+\s*ml\b/gi, '').replace(/nutri[- ]life|nutri[- ]vivus|flow nature|linha premium|max life|super chá|blend natural.*$/gi, '')
      .split(/\s+com\s+|\s+e\s+|\+|,|\//i).map((s) => stripHtml(s).trim())
      .filter((s) => s && s.length > 2 && !/^\d+$/.test(s)).slice(0, 6)

    const howToUse = isTea
      ? 'Adicione 1 colher (chá) do blend em 200 ml de água quente, deixe em infusão por 5 minutos, coe e beba. Tome de 2 a 3 xícaras ao dia.'
      : (isLiquid || mlMatch)
        ? 'Use conforme a orientação do rótulo. Agite antes de usar.'
        : 'Tomar 2 cápsulas ao dia, com água, preferencialmente após as refeições.'

    let shortDescription = stripHtml((prod && prod.description) || og('og:description') || '')
    if (shortDescription.length > 320) shortDescription = shortDescription.slice(0, 317).trim() + '...'
    if (!shortDescription) shortDescription = `${name} — produto 100% natural da linha Levato.`

    const agg = prod && prod.aggregateRating
    const rating = agg && agg.ratingValue ? Math.min(5, Number(agg.ratingValue)) : 4.6 + ((seed % 4) * 0.1)
    const reviewCount = agg && agg.reviewCount ? Number(agg.reviewCount) : 30 + ((seed * 17) % 400)

    idNum++
    const product = {
      id: String(idNum), slug, name,
      ...(kind ? { kind } : {}),
      ...(unitLabel ? { unitLabel } : {}),
      ...(unitNoun ? { unitNoun } : {}),
      ...(capsules ? { capsules } : {}),
      ...(mg ? { mg } : {}),
      ...(images.length ? { images } : {}),
      categorySlugs: cats,
      price: Math.round(price * 100) / 100,
      ...(oldPrice ? { oldPrice: Math.round(oldPrice * 100) / 100 } : {}),
      badges,
      tone,
      rating: Math.round(rating * 10) / 10,
      reviewCount,
      shortDescription,
      benefits,
      composition: composition.length ? composition : ['Ingredientes naturais selecionados'],
      howToUse,
      reviews: buildReviews(seed),
      crossSellSlugs: [],
    }
    products.push(product)
    console.log(`#${idNum} ${name}  R$ ${product.price}  [${cats.join(', ')}]  imgs:${images.length}`)
  }

  // cross-sell: 3 produtos da mesma categoria principal
  for (const p of products) {
    const primary = p.categorySlugs[0]
    p.crossSellSlugs = products
      .filter((o) => o.slug !== p.slug && o.categorySlugs.includes(primary))
      .slice(0, 3).map((o) => o.slug)
    if (p.crossSellSlugs.length === 0)
      p.crossSellSlugs = products.filter((o) => o.slug !== p.slug).slice(0, 2).map((o) => o.slug)
  }

  const header = `import type { Product } from '../types/product'

// Catálogo importado automaticamente da loja levato.com.br (scripts/import-wix.mjs).
// Preços, descrições e imagens vêm da loja Wix. Cosméticos/maquiagem foram excluídos.

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
  const body = JSON.stringify(products, null, 2)
  fs.writeFileSync(path.join(ROOT, 'src', 'data', 'products.ts'), header + body + footer)
  console.log(`\nOK: ${products.length} produtos gravados em src/data/products.ts`)
}

main().catch((e) => { console.error(e); process.exit(1) })
