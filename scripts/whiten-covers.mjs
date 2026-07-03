// Deixa as fotos de CAPA como mockup uniforme: produto centralizado sobre
// fundo branco puro 1000x1000. Só processa capas cujo fundo NÃO é branco.
//
// A remoção de fundo (onnx) roda em processo filho SEM sharp (bg-cut.mjs);
// o sharp (decode/composição) roda só no processo pai. Rodar os dois juntos
// no mesmo processo causa segfault por conflito de libs nativas.
// Uso: node scripts/whiten-covers.mjs
import fs from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { products } from '../src/data/products.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUB = path.join(ROOT, 'public')
const BACKUP = path.join(ROOT, '.cover-backup')
const TMP = path.join(ROOT, '.tmp')
const CUT = path.join(__dirname, 'bg-cut.mjs')

const CANVAS = 1000
const FIT = 820

const isWhite = (r, g, b) => Math.min(r, g, b) > 236 && Math.max(r, g, b) - Math.min(r, g, b) < 12

async function needsWhitening(file) {
  const { data } = await sharp(file).resize(5, 5, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true })
  const px = (i) => [data[i * 3], data[i * 3 + 1], data[i * 3 + 2]]
  const white = [0, 4, 20, 24].map((i) => px(i)).filter((c) => isWhite(...c)).length
  return white < 3
}

fs.mkdirSync(TMP, { recursive: true })
const covers = [...new Set(products.map((p) => p.images?.[0]).filter(Boolean))]
let done = 0, skipped = 0, failed = 0
const updates = [] // [relAntigo, relNovo] para atualizar products.ts

for (const cov of covers) {
  const file = path.join(PUB, cov)
  if (!fs.existsSync(file)) { skipped++; continue }
  if (!(await needsWhitening(file))) { skipped++; continue }

  const inPng = path.join(TMP, 'in.png')
  const cutPng = path.join(TMP, 'cut.png')
  fs.rmSync(inPng, { force: true })
  fs.rmSync(cutPng, { force: true })

  // grava num arquivo NOVO (sobrescrever os originais está bloqueado neste ambiente)
  const relNew = cov.replace(/\.webp$/, '-w.webp')
  const fileNew = path.join(PUB, relNew)

  try {
    await sharp(file).png().toFile(inPng) // decode webp -> png (sharp por caminho)
    const r = spawnSync(process.execPath, [CUT, inPng, cutPng], { stdio: ['ignore', 'ignore', 'ignore'] })
    if (r.status !== 0 || !fs.existsSync(cutPng)) throw new Error('bg-cut status ' + r.status)
    const product = await sharp(cutPng)
      .trim({ threshold: 10 })
      .resize({ width: FIT, height: FIT, fit: 'inside', withoutEnlargement: false })
      .toBuffer()
    await sharp({ create: { width: CANVAS, height: CANVAS, channels: 4, background: '#ffffff' } })
      .composite([{ input: product, gravity: 'center' }])
      .flatten({ background: '#ffffff' })
      .webp({ quality: 85 })
      .toFile(fileNew)
    updates.push([cov, relNew])
    done++
    console.log('✓', path.basename(fileNew))
  } catch (e) {
    failed++
    console.log('✗', path.basename(file), '-', e.message)
  }
}

// aponta o catálogo para as novas capas em branco
if (updates.length) {
  const PRODUCTS = path.join(ROOT, 'src', 'data', 'products.ts')
  let ts = fs.readFileSync(PRODUCTS, 'utf8')
  for (const [oldRel, newRel] of updates) ts = ts.split(`"${oldRel}"`).join(`"${newRel}"`)
  fs.writeFileSync(PRODUCTS, ts)
}

fs.rmSync(TMP, { recursive: true, force: true })
console.log(`\nMockups: ${done} processadas, ${skipped} já brancas, ${failed} falhas`)
