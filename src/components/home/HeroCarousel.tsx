import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../shared/Button'

type Slide = {
  eyebrow: string
  title: string
  subtitle: string
  ctaLabel: string
  ctaTo: string
  gradient: string
}

const SLIDES: Slide[] = [
  {
    eyebrow: 'Linha Premium Levato',
    title: 'Bem-estar natural em cada cápsula',
    subtitle: 'Suplementos fitoterápicos selecionados para cuidar de você, todos os dias.',
    ctaLabel: 'Comprar agora',
    ctaTo: '/loja',
    gradient: 'from-primary-700 via-primary-800 to-primary-900',
  },
  {
    eyebrow: 'Combos com desconto',
    title: 'Monte seu kit e economize até 25%',
    subtitle: 'Kits de 30 a 150 dias com desconto progressivo em toda a loja.',
    ctaLabel: 'Ver combos',
    ctaTo: '/combos',
    gradient: 'from-gold-600 via-gold-500 to-gold-400',
  },
  {
    eyebrow: 'Primeira compra',
    title: 'Ganhe 10% OFF na sua primeira compra',
    subtitle: 'Frete grátis acima de R$ 199 e parcelamento em até 3x sem juros.',
    ctaLabel: 'Aproveitar oferta',
    ctaTo: '/promocoes',
    gradient: 'from-leaf-600 via-leaf-500 to-leaf-400',
  },
]

export default function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5500)
    return () => clearInterval(id)
  }, [])

  const slide = SLIDES[index]

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) setIndex((i) => (i + 1) % SLIDES.length)
            else if (info.offset.x > 60) setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
          }}
          className={`flex min-h-[420px] flex-col items-center justify-center bg-gradient-to-br px-6 py-16 text-center sm:min-h-[480px] ${slide.gradient}`}
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-cream-100/80">{slide.eyebrow}</p>
          <h1 className="max-w-xl font-serif text-3xl leading-tight text-cream-50 sm:text-4xl md:text-5xl">
            {slide.title}
          </h1>
          <p className="mt-4 max-w-md text-sm text-cream-100/90 sm:text-base">{slide.subtitle}</p>
          <div className="mt-7">
            <Button to={slide.ctaTo} variant="cta" size="lg">
              {slide.ctaLabel}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-cream-50' : 'w-2 bg-cream-50/40'}`}
          />
        ))}
      </div>
    </div>
  )
}
