import { Navigate, useParams } from 'react-router-dom'
import { getPostBySlug } from '../data/blogPosts'
import Section from '../components/shared/Section'
import AnimatedSection from '../components/shared/AnimatedSection'

const TONE_BG: Record<string, string> = {
  primary: 'bg-primary-700',
  gold: 'bg-gold-500',
  leaf: 'bg-leaf-500',
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) return <Navigate to="/404" replace />

  return (
    <Section maxWidth="max-w-3xl">
      <AnimatedSection>
        <div className={`mb-8 flex h-52 items-center justify-center rounded-xl2 ${TONE_BG[post.tone]}`}>
          <span className="font-serif text-2xl text-cream-50">Levato</span>
        </div>
        <p className="text-xs text-primary-400">
          {post.date} · {post.readTime}
        </p>
        <h1 className="mt-2 font-serif text-2xl text-primary-900 sm:text-3xl">{post.title}</h1>
      </AnimatedSection>
      <div className="mt-6 flex flex-col gap-4">
        {post.content.map((paragraph, i) => (
          <AnimatedSection key={i} delay={i * 0.05}>
            <p className="text-sm leading-relaxed text-primary-600 sm:text-base">{paragraph}</p>
          </AnimatedSection>
        ))}
      </div>
    </Section>
  )
}
