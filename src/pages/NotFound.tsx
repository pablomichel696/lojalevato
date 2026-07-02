import Section from '../components/shared/Section'
import Button from '../components/shared/Button'

export default function NotFound() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-serif text-6xl text-primary-300">404</p>
      <h1 className="mt-2 font-serif text-2xl text-primary-800">Página não encontrada</h1>
      <p className="mt-2 max-w-sm text-sm text-primary-500">
        O link que você acessou pode estar incorreto ou o produto não está mais disponível.
      </p>
      <div className="mt-6">
        <Button to="/" variant="cta">
          Voltar para a loja
        </Button>
      </div>
    </Section>
  )
}
