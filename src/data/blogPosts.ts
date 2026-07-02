export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  content: string[]
  date: string
  readTime: string
  tone: 'primary' | 'gold' | 'leaf'
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'como-escolher-suplemento-natural-ideal',
    title: 'Como escolher o suplemento natural ideal para sua rotina',
    excerpt: 'Entenda os principais critérios para escolher um suplemento fitoterápico com segurança e consciência.',
    date: '2026-06-02',
    readTime: '5 min de leitura',
    tone: 'leaf',
    content: [
      'Escolher um suplemento natural vai além de olhar o preço ou a embalagem. É importante observar a composição, a concentração dos ativos e se o produto é registrado conforme as normas da ANVISA.',
      'Antes de iniciar o uso de qualquer suplemento, converse com um profissional de saúde para entender se ele é adequado para o seu caso — cada organismo responde de um jeito, e suplementos não substituem uma alimentação equilibrada nem hábitos de vida saudáveis.',
      'Na Levato, cada produto traz de forma transparente a composição, o modo de uso e as recomendações de segurança, para que você tome decisões informadas sobre o seu bem-estar.',
    ],
  },
  {
    slug: 'fitoterapicos-o-que-sao',
    title: 'Fitoterápicos: o que são e como agem no organismo',
    excerpt: 'Descubra a diferença entre fitoterápicos, vitaminas e suplementos alimentares e como cada um pode ajudar.',
    date: '2026-05-18',
    readTime: '4 min de leitura',
    tone: 'primary',
    content: [
      'Fitoterápicos são produtos obtidos a partir de plantas medicinais, usados há séculos em diferentes culturas para apoiar o bem-estar. Diferente de medicamentos sintéticos, eles utilizam extratos vegetais como princípio ativo.',
      'É importante lembrar que fitoterápicos não têm a finalidade de curar, tratar ou prevenir doenças — eles atuam como complemento de uma rotina saudável, sempre orientados por um profissional.',
      'A linha Levato reúne fórmulas fitoterápicas cuidadosamente selecionadas, com rastreabilidade de origem e testes de qualidade em todas as etapas de produção.',
    ],
  },
  {
    slug: 'rotina-saudavel-pequenos-habitos',
    title: '5 pequenos hábitos que fazem diferença na sua rotina saudável',
    excerpt: 'Mudanças simples no dia a dia que, junto de uma boa alimentação, contribuem para o seu bem-estar geral.',
    date: '2026-04-27',
    readTime: '6 min de leitura',
    tone: 'gold',
    content: [
      'Beber água ao longo do dia, dormir de 7 a 8 horas por noite e praticar atividade física regularmente são hábitos simples, mas com grande impacto na qualidade de vida.',
      'Organizar as refeições com mais alimentos in natura e menos ultraprocessados é outro passo importante — os suplementos funcionam melhor como complemento de uma dieta já equilibrada, nunca como substituto dela.',
      'Pequenas mudanças consistentes tendem a durar mais do que grandes mudanças repentinas. O segredo está na regularidade, não na intensidade.',
    ],
  },
]

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug)
}
