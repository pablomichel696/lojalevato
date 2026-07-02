import AnimatedSection from '../shared/AnimatedSection'

const BENEFITS = [
  { icon: 'M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4', label: 'Frete grátis acima de R$ 199' },
  { icon: 'M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5Z', label: '10% OFF na primeira compra' },
  { icon: 'M3 9h18M7 15h4M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', label: 'Parcele em até 3x sem juros' },
  { icon: 'M12 3 4 6.5v5c0 5 3.4 8.5 8 9.5 4.6-1 8-4.5 8-9.5v-5L12 3Zm-1.5 9.5 4.5-5 1.2 1.2-5.7 6.3-3-3 1.2-1.2 2 2Z', label: 'Compra 100% segura' },
]

export default function BenefitsStrip() {
  return (
    <div className="border-y border-primary-100 bg-white">
      <AnimatedSection>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {BENEFITS.map((b) => (
            <div key={b.label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
              <svg viewBox="0 0 24 24" className="h-7 w-7 flex-shrink-0 text-leaf-600" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d={b.icon} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-xs font-medium text-primary-700 sm:text-sm">{b.label}</p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  )
}
