import Section from '../shared/Section'
import Button from '../shared/Button'
import AnimatedSection from '../shared/AnimatedSection'
import Logo from '../shared/Logo'

export default function AboutSection() {
  return (
    <Section>
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <AnimatedSection>
          <div className="flex aspect-square items-center justify-center rounded-xl2 bg-primary-800">
            <Logo variant="badge" className="scale-125" />
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.1}>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">Sobre a Levato</p>
          <h2 className="text-2xl font-medium text-primary-800 sm:text-3xl">
            Natureza e ciência a favor do seu bem-estar
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-primary-600/90 sm:text-base">
            A Levato nasceu para tornar o cuidado natural mais acessível no seu dia a dia. Selecionamos
            fitoterápicos, vitaminas e fórmulas naturais com rastreabilidade de origem e controle de qualidade em
            todas as etapas — para que você tenha confiança em cada cápsula.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-primary-600/90 sm:text-base">
            Nossos produtos são complementos de uma rotina saudável e não substituem uma alimentação equilibrada
            nem acompanhamento profissional.
          </p>
          <div className="mt-6">
            <Button to="/sobre" variant="outline">
              Conheça nossa história
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </Section>
  )
}
