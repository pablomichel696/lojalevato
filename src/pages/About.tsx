import Section, { SectionHeader } from '../components/shared/Section'
import AnimatedSection from '../components/shared/AnimatedSection'
import Logo from '../components/shared/Logo'
import Button from '../components/shared/Button'

const VALUES = [
  { title: 'Transparência', body: 'Composição e origem de cada ingrediente sempre visíveis, sem letras miúdas.' },
  { title: 'Qualidade', body: 'Controle rigoroso em todas as etapas de produção, de fórmulas fitoterápicas a vitaminas.' },
  { title: 'Acessibilidade', body: 'Preços justos e kits com desconto progressivo para uma rotina de bem-estar sustentável.' },
]

export default function About() {
  return (
    <Section maxWidth="max-w-4xl">
      <AnimatedSection>
        <div className="mb-10 flex aspect-[21/9] items-center justify-center rounded-xl2 bg-primary-800">
          <Logo variant="badge" className="scale-125" />
        </div>
      </AnimatedSection>

      <SectionHeader eyebrow="Nossa história" title="Sobre a Levato" />
      <AnimatedSection>
        <p className="text-sm leading-relaxed text-primary-600 sm:text-base">
          A Levato nasceu da vontade de tornar o cuidado natural mais simples e acessível no dia a dia das pessoas.
          Reunimos fitoterápicos, vitaminas e fórmulas naturais cuidadosamente selecionadas, sempre com
          rastreabilidade de origem e testes de qualidade em cada lote produzido.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-primary-600 sm:text-base">
          Acreditamos que bem-estar é construído com pequenos hábitos consistentes — por isso, nossos produtos são
          pensados para complementar, e não substituir, uma alimentação equilibrada e o acompanhamento de
          profissionais de saúde.
        </p>
      </AnimatedSection>

      <div className="my-10 grid gap-5 sm:grid-cols-3">
        {VALUES.map((v) => (
          <AnimatedSection key={v.title}>
            <div className="rounded-xl2 bg-primary-50 p-5">
              <h3 className="mb-1.5 font-serif text-lg text-primary-800">{v.title}</h3>
              <p className="text-sm text-primary-600">{v.body}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection className="text-center">
        <Button to="/loja" variant="cta" size="lg">
          Conhecer nossos produtos
        </Button>
      </AnimatedSection>
    </Section>
  )
}
