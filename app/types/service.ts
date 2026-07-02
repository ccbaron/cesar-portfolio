export interface Service {
  slug: string
  number: string
  title: string
  shortTitle: string
  category: ServiceCategory
  summary: string
  description: string
  deliverables: string[]
  featured: boolean
  heroImage: string
}

export type ServiceCategory =
  | 'arquitectura'
  | 'tecnologia'
  | 'energia'
