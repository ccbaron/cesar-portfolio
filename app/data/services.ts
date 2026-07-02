import type { Service } from '~/types/service'

/**
 * Service definitions — source of truth for all service pages.
 * Replace with CMS API calls in Phase 3.
 */
export const services: Service[] = [
  {
    slug: 'arquitectura',
    number: '01',
    title: 'Arquitectura',
    shortTitle: 'Arquitectura',
    category: 'arquitectura',
    summary: 'Diseñamos espacios pensados para la forma en que las personas viven, trabajan y se relacionan con su entorno.',
    description:
      'Desarrollamos proyectos de arquitectura residencial y comercial desde el concepto inicial hasta la entrega. Cada proyecto parte de un análisis riguroso del lugar, el uso y las personas, y se traduce en espacios que funcionan, que duran y que aportan valor.',
    deliverables: [
      'Diseño arquitectónico',
      'Proyectos residenciales',
      'Proyectos comerciales',
      'Remodelaciones y rehabilitaciones',
      'Planimetría y levantamientos arquitectónicos',
      'Visualización arquitectónica',
    ],
    featured: true,
    heroImage: '/images/placeholders/service-arquitectura.jpg',
  },
  {
    slug: 'topografia',
    number: '02',
    title: 'Topografía & Dron',
    shortTitle: 'Topografía',
    category: 'tecnologia',
    summary: 'Datos precisos para diseñar, medir y tomar mejores decisiones.',
    description:
      'Combinamos topografía convencional con captura aérea mediante dron para documentar el espacio construido y el terreno. El resultado es información geoespacial precisa que sirve de base para cualquier proyecto arquitectónico, de construcción o de análisis del entorno.',
    deliverables: [
      'Levantamiento topográfico',
      'Vuelo fotogramétrico con dron',
      'Ortomosaico',
      'Modelo digital del terreno (MDT)',
      'Curvas de nivel',
      'Nube de puntos 3D',
      'Documentación técnica del terreno',
    ],
    featured: true,
    heroImage: '/images/placeholders/service-topografia.jpg',
  },
  {
    slug: 'modelado',
    number: '03',
    title: 'Modelado & Visualización',
    shortTitle: 'Modelado 3D',
    category: 'tecnologia',
    summary: 'Del espacio físico al modelo digital: arquitectura y terreno representados con precisión.',
    description:
      'Generamos modelos 3D de arquitectura y espacio para comunicar, analizar y presentar proyectos. Desde visualizaciones arquitectónicas hasta modelos digitales del terreno para planificación y toma de decisiones.',
    deliverables: [
      'Modelo 3D arquitectónico',
      'Renders y visualizaciones',
      'Modelo digital del terreno 3D',
      'Fotogrametría y reconstrucción 3D',
    ],
    featured: true,
    heroImage: '/images/placeholders/service-modelado.jpg',
  },
  {
    slug: 'energia-solar',
    number: '04',
    title: 'Energía Solar',
    shortTitle: 'Energía Solar',
    category: 'energia',
    summary: 'Soluciones pensadas para integrar eficiencia, autonomía y sostenibilidad en viviendas, proyectos y negocios.',
    description:
      'Estudiamos la viabilidad e integración de instalaciones fotovoltaicas en proyectos de nueva planta, remodelación y uso comercial. La energía solar se incorpora desde la fase de diseño, no como un añadido posterior.',
    deliverables: [
      'Estudio de viabilidad solar',
      'Diseño de instalación fotovoltaica',
      'Integración arquitectónica',
      'Coordinación con instaladores certificados',
    ],
    featured: false,
    heroImage: '/images/placeholders/service-energia-solar.jpg',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}

export function getFeaturedServices(): Service[] {
  return services.filter((s) => s.featured)
}
