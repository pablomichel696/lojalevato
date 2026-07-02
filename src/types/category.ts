export type CategoryGroup = 'bem-estar' | 'fitness' | 'especial'

export type Category = {
  slug: string
  name: string
  /** slug of the parent category, if this is a submenu item */
  parentSlug?: string
  group?: CategoryGroup
  description?: string
  /** tailwind color token used for placeholder art + badges */
  tone: 'primary' | 'gold' | 'leaf'
  /** icon key rendered by <CategoryIcon /> */
  icon: string
}
