import type { Category } from '../types/category'

export const categories: Category[] = [
  { slug: 'toda-loja', name: 'Toda a Loja', tone: 'primary', icon: 'grid' },

  // Bem-estar (parent + submenus)
  { slug: 'bem-estar', name: 'Bem-Estar', tone: 'leaf', icon: 'leaf' },
  { slug: 'refluxo-gastrite', name: 'Refluxo e gastrite', parentSlug: 'bem-estar', tone: 'leaf', icon: 'stomach' },
  { slug: 'saude-prostata', name: 'Saúde da próstata', parentSlug: 'bem-estar', tone: 'leaf', icon: 'shield' },
  { slug: 'calmante', name: 'Calmante', parentSlug: 'bem-estar', tone: 'leaf', icon: 'moon' },
  { slug: 'anti-inflamatorio', name: 'Anti-inflamatório', parentSlug: 'bem-estar', tone: 'leaf', icon: 'drop' },
  { slug: 'circulacao-sanguinea', name: 'Circulação sanguínea', parentSlug: 'bem-estar', tone: 'leaf', icon: 'heart' },
  { slug: 'saude-feminina', name: 'Saúde feminina', parentSlug: 'bem-estar', tone: 'leaf', icon: 'flower' },
  { slug: 'articulacoes-dores', name: 'Articulações e dores', parentSlug: 'bem-estar', tone: 'leaf', icon: 'bone' },
  { slug: 'diuretico', name: 'Diurético', parentSlug: 'bem-estar', tone: 'leaf', icon: 'drop' },
  { slug: 'beleza-saude', name: 'Beleza e saúde', parentSlug: 'bem-estar', tone: 'leaf', icon: 'sparkle' },
  { slug: 'antioxidante', name: 'Antioxidante', parentSlug: 'bem-estar', tone: 'leaf', icon: 'sparkle' },
  { slug: 'controle-acucar-diabetes', name: 'Controle de açúcar/diabetes', parentSlug: 'bem-estar', tone: 'leaf', icon: 'drop' },
  { slug: 'imunidade', name: 'Imunidade', parentSlug: 'bem-estar', tone: 'leaf', icon: 'shield' },
  { slug: 'auxilio-intestinal', name: 'Auxílio intestinal', parentSlug: 'bem-estar', tone: 'leaf', icon: 'stomach' },

  // Fitness (parent + submenus)
  { slug: 'fitness', name: 'Fitness', tone: 'gold', icon: 'bolt' },
  { slug: 'estimulante-energetico', name: 'Estimulante e Energético', parentSlug: 'fitness', tone: 'gold', icon: 'bolt' },
  { slug: 'termogenico', name: 'Termogênico', parentSlug: 'fitness', tone: 'gold', icon: 'flame' },
  { slug: 'pre-treino', name: 'Pré-treino', parentSlug: 'fitness', tone: 'gold', icon: 'dumbbell' },

  // Top-level special collections
  { slug: 'emagrecedores', name: 'Emagrecedores', tone: 'gold', icon: 'flame' },
  { slug: 'estimulantes-sexuais', name: 'Estimulantes Sexuais', tone: 'primary', icon: 'heart' },
  { slug: 'desintoxicantes', name: 'Desintoxicantes', tone: 'leaf', icon: 'drop' },
  { slug: 'combos', name: 'Combos / Kits', tone: 'primary', icon: 'box' },
  { slug: 'mais-vendidos', name: 'Mais Vendidos', tone: 'gold', icon: 'star' },
  { slug: 'lancamentos', name: 'Lançamentos', tone: 'primary', icon: 'sparkle' },
  { slug: 'promocoes', name: 'Promoções', tone: 'gold', icon: 'tag' },
  { slug: 'linha-premium', name: 'Linha Premium', tone: 'primary', icon: 'crown' },
]

export const wellnessSubcategories = categories.filter((c) => c.parentSlug === 'bem-estar')
export const fitnessSubcategories = categories.filter((c) => c.parentSlug === 'fitness')

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export type NavItem = {
  label: string
  path: string
  submenu?: Category[]
}

export const mainNav: NavItem[] = [
  { label: 'Toda a Loja', path: '/loja' },
  { label: 'Bem-Estar', path: '/categoria/bem-estar', submenu: wellnessSubcategories },
  { label: 'Fitness', path: '/categoria/fitness', submenu: fitnessSubcategories },
  { label: 'Emagrecedores', path: '/categoria/emagrecedores' },
  { label: 'Estimulantes Sexuais', path: '/categoria/estimulantes-sexuais' },
  { label: 'Desintoxicantes', path: '/categoria/desintoxicantes' },
  { label: 'Combos / Kits', path: '/combos' },
  { label: 'Mais Vendidos', path: '/mais-vendidos' },
  { label: 'Lançamentos', path: '/lancamentos' },
  { label: 'Promoções', path: '/promocoes' },
  { label: 'Linha Premium', path: '/linha-premium' },
]
