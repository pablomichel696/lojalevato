import { useState, type FormEvent } from 'react'
import Section from '../shared/Section'
import Button from '../shared/Button'
import AnimatedSection from '../shared/AnimatedSection'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Prototype only: no ESP wired up yet. Plug Mailchimp/Klaviyo/RD Station here.
    setSubmitted(true)
  }

  return (
    <Section>
      <AnimatedSection>
        <div className="rounded-xl2 bg-primary-800 px-6 py-10 text-center sm:px-12">
          <h2 className="font-serif text-2xl text-cream-50 sm:text-3xl">Ganhe 10% OFF na primeira compra</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-cream-100/80">
            Cadastre seu e-mail e receba o cupom, além de novidades e promoções exclusivas Levato.
          </p>
          {submitted ? (
            <p className="mt-6 font-medium text-gold-400">Cupom enviado! Confira sua caixa de entrada. 🎉</p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-full px-4 py-3 text-sm text-primary-800 outline-none"
              />
              <Button type="submit" variant="cta">
                Quero meu desconto
              </Button>
            </form>
          )}
        </div>
      </AnimatedSection>
    </Section>
  )
}
