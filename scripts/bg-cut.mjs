// Remove o fundo de UMA imagem PNG e grava PNG transparente.
// Usa SOMENTE a remoção de fundo (onnx), sem sharp — evita conflito de libs
// nativas que causa segfault. Uso: node scripts/bg-cut.mjs <in.png> <out.png>
import fs from 'node:fs'
import { removeBackground } from '@imgly/background-removal-node'

const [inp, out] = process.argv.slice(2)
const blob = new Blob([fs.readFileSync(inp)], { type: 'image/png' })
const res = await removeBackground(blob)
fs.writeFileSync(out, Buffer.from(await res.arrayBuffer()))
