export interface Project {
  id: string
  slug: string
  title: string
  location: string
  year: number
  category: ProjectCategory
  status: 'completed' | 'in-progress' | 'concept'
  summary: string
  description: string
  services: string[]
  coverImage: string
  gallery: string[]
  featured: boolean
}

export type ProjectCategory =
  | 'arquitectura'
  | 'tecnologia'
  | 'energia'
