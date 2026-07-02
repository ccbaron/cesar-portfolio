import type { Project } from '~/types/project'

/**
 * Sample project data — placeholder content only.
 * These projects are illustrative and do not represent real César Barón projects.
 * Replace with CMS API calls in Phase 3.
 */
export const projects: Project[] = [
  {
    id: '1',
    slug: 'vivienda-unifamiliar-sierra',
    title: 'Vivienda Unifamiliar en Sierra',
    location: 'Bogotá, Colombia',
    year: 2024,
    category: 'arquitectura',
    status: 'completed',
    summary:
      'Diseño y dirección de obra de vivienda unifamiliar en entorno natural.',
    description:
      'Este proyecto de muestra ilustra el tipo de trabajo de diseño arquitectónico residencial. Los datos de este proyecto son ficticios y tienen únicamente carácter demostrativo para la estructura del portfolio.',
    services: ['Diseño arquitectónico', 'Proyecto de ejecución', 'Dirección de obra'],
    coverImage: '/images/placeholders/project-cover-1.jpg',
    gallery: [
      '/images/placeholders/project-gallery-1a.jpg',
      '/images/placeholders/project-gallery-1b.jpg',
    ],
    featured: true,
  },
  {
    id: '2',
    slug: 'levantamiento-edificio-industrial',
    title: 'Levantamiento Edificio Industrial',
    location: 'Medellín, Colombia',
    year: 2024,
    category: 'tecnologia',
    status: 'completed',
    summary:
      'Levantamiento planimétrico completo de nave industrial existente para proyecto de rehabilitación.',
    description:
      'Este proyecto de muestra ilustra el tipo de trabajo de documentación técnica y levantamiento de edificios existentes. Los datos son ficticios y tienen únicamente carácter demostrativo.',
    services: ['Levantamiento planimétrico', 'Modelado 3D', 'Documentación técnica'],
    coverImage: '/images/placeholders/project-cover-2.jpg',
    gallery: ['/images/placeholders/project-gallery-2a.jpg'],
    featured: true,
  },
  {
    id: '3',
    slug: 'vuelo-fotogrametrico-parcela',
    title: 'Vuelo Fotogramétrico de Parcela Agrícola',
    location: 'Cundinamarca, Colombia',
    year: 2023,
    category: 'tecnologia',
    status: 'completed',
    summary:
      'Captura aérea con dron, generación de ortomosaico y modelo digital del terreno.',
    description:
      'Este proyecto de muestra ilustra el tipo de trabajo de topografía y fotogrametría con dron. Los datos son ficticios y tienen únicamente carácter demostrativo.',
    services: ['Vuelo fotogramétrico', 'Ortomosaico', 'Modelo digital del terreno'],
    coverImage: '/images/placeholders/project-cover-3.jpg',
    gallery: ['/images/placeholders/project-gallery-3a.jpg'],
    featured: true,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
