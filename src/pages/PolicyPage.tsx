import { Navigate, useLocation } from 'react-router-dom'
import { getPolicyBySlug } from '../data/policies'
import Section, { SectionHeader } from '../components/shared/Section'
import AnimatedSection from '../components/shared/AnimatedSection'

export default function PolicyPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace('/', '')
  const policy = getPolicyBySlug(slug)

  if (!policy) return <Navigate to="/404" replace />

  return (
    <Section maxWidth="max-w-3xl">
      <SectionHeader title={policy.title} subtitle={`Última atualização em ${policy.updatedAt}`} />
      <div className="flex flex-col gap-6">
        {policy.sections.map((s) => (
          <AnimatedSection key={s.heading}>
            <h2 className="mb-1.5 font-serif text-lg text-primary-800">{s.heading}</h2>
            <p className="text-sm leading-relaxed text-primary-600">{s.body}</p>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  )
}
