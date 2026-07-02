import { Link } from 'react-router-dom'
import Logo from '../shared/Logo'

const CATEGORY_LINKS = [
  { label: 'Bem-Estar', path: '/categoria/bem-estar' },
  { label: 'Fitness', path: '/categoria/fitness' },
  { label: 'Emagrecedores', path: '/categoria/emagrecedores' },
  { label: 'Combos / Kits', path: '/combos' },
  { label: 'Linha Premium', path: '/linha-premium' },
]

const INSTITUTIONAL_LINKS = [
  { label: 'Sobre a Levato', path: '/sobre' },
  { label: 'Política de Trocas', path: '/politica-de-trocas' },
  { label: 'Política de Privacidade', path: '/politica-de-privacidade' },
  { label: 'Política de Entrega', path: '/politica-de-entrega' },
  { label: 'Blog', path: '/blog' },
]

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm5.2-.9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9.5c0-.3.2-.5.5-.5Z' },
]

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-cream-100">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="col-span-2 md:col-span-1">
          <Logo tone="light" />
          <p className="mt-3 text-sm text-cream-200/70">
            Suplementos encapsulados e produtos naturais para o seu bem-estar, direto da Levato para você.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-400">Categorias</h3>
          <ul className="flex flex-col gap-2">
            {CATEGORY_LINKS.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-sm text-cream-200/80 hover:text-cream-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-400">Institucional</h3>
          <ul className="flex flex-col gap-2">
            {INSTITUTIONAL_LINKS.map((l) => (
              <li key={l.path}>
                <Link to={l.path} className="text-sm text-cream-200/80 hover:text-cream-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-400">Atendimento</h3>
          <ul className="flex flex-col gap-2 text-sm text-cream-200/80">
            <li>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noreferrer" className="hover:text-cream-50">
                WhatsApp: (00) 00000-0000
              </a>
            </li>
            <li>
              <a href="mailto:contato@levato.com.br" className="hover:text-cream-50">
                contato@levato.com.br
              </a>
            </li>
            <li>Seg. a sex., 9h às 18h</li>
          </ul>
          <div className="mt-4 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 text-cream-100 hover:bg-primary-700"
              >
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p className="text-xs text-cream-200/60">
            © {new Date().getFullYear()} Levato Suplementos LTDA · CNPJ 00.000.000/0001-00. Este produto não
            substitui uma alimentação equilibrada. Consulte sempre um profissional de saúde.
          </p>
          <div className="flex items-center gap-2 text-xs font-medium text-cream-200/80">
            <span className="rounded border border-cream-200/30 px-2 py-1">Pix</span>
            <span className="rounded border border-cream-200/30 px-2 py-1">Visa</span>
            <span className="rounded border border-cream-200/30 px-2 py-1">Master</span>
            <span className="rounded border border-cream-200/30 px-2 py-1">Boleto</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
