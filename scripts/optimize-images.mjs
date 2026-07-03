// Converte as fotos de produto (PNG/JPG) para WebP (mais leve, ideal p/ mobile),
// atualiza os caminhos em src/data/products.ts e remove os originais.
// Uso: node scripts/optimize-images.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const IMG_DIR = path.join(ROOT, 'public', 'products')
const PRODUCTS = path.join(ROOT, 'src', 'data', 'products.ts')

const MAX = 900 // px — suficiente para a galeria em telas de celular/desktop
const QUALITY = 78

async function main() {
  const files = fs.readdirSync(IMG_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f))
  if (files.length === 0) { console.log('Nada para converter.'); return }

  let before = 0, after = 0, n = 0
  for (const f of files) {
    const src = path.join(IMG_DIR, f)
    const out = f.replace(/\.(png|jpe?g)$/i, '.webp')
    const dest = path.join(IMG_DIR, out)
    before += fs.statSync(src).size
    await sharp(src)
      .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dest)
    after += fs.statSync(dest).size
    fs.unlinkSync(src)
    n++
  }

  // atualiza os caminhos no catálogo (.png/.jpg -> .webp)
  let ts = fs.readFileSync(PRODUCTS, 'utf8')
  ts = ts.replace(/(\/products\/[^"']+?)\.(png|jpe?g)(["'])/gi, '$1.webp$3')
  fs.writeFileSync(PRODUCTS, ts)

  const mb = (b) => (b / 1024 / 1024).toFixed(1)
  console.log(`Convertidas ${n} imagens: ${mb(before)}MB -> ${mb(after)}MB (${Math.round((1 - after / before) * 100)}% menor)`)
}

main().catch((e) => { console.error(e); process.exit(1) })
