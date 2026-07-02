<script setup lang="ts">
import { getServiceBySlug } from '~/data/services'
import { projects } from '~/data/projects'
import type { ServiceCategory } from '~/types/service'

const categoryLabels: Record<ServiceCategory, string> = {
  arquitectura: 'Arquitectura',
  tecnologia: 'Tecnología',
  energia: 'Energía',
}

const route = useRoute()
const slug = route.params.slug as string

const service = getServiceBySlug(slug)

if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Servicio no encontrado' })
}

const relatedProjects = projects.filter((p) =>
  p.category === service!.category || p.services.some((s) => s.toLowerCase().includes(service!.shortTitle.toLowerCase()))
).slice(0, 3)

useSeoMeta({
  title: service.title,
  description: service.summary,
  ogTitle: `${service.title} · César Barón`,
  ogDescription: service.summary,
})

const config = useRuntimeConfig()
const base = config.public.siteUrl || ''
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Servicios', item: `${base}/servicios` },
          { '@type': 'ListItem', position: 2, name: service.title, item: `${base}/servicios/${service.slug}` },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="service-detail">
    <section class="service-detail__hero section" aria-labelledby="service-heading">
      <div class="container">
        <div class="service-detail__header">
          <p class="service-detail__number" aria-hidden="true">{{ service.number }}</p>
          <p class="service-detail__category">{{ categoryLabels[service.category] }}</p>
          <h1 id="service-heading" class="service-detail__title">{{ service.title }}</h1>
          <p class="service-detail__intro">{{ service.summary }}</p>
        </div>
      </div>

      <div class="service-detail__cover-wrap" aria-hidden="true">
        <div class="service-detail__cover-placeholder" />
      </div>
    </section>

    <section class="section" aria-labelledby="service-desc-heading">
      <div class="container service-detail__body">
        <div>
          <h2 id="service-desc-heading" class="sr-only">Descripción del servicio</h2>
          <p class="service-detail__description">{{ service.description }}</p>
        </div>

        <aside class="service-detail__sidebar" aria-label="Entregables">
          <p class="service-detail__sidebar-label">Entregables</p>
          <ul class="service-detail__deliverables">
            <li v-for="item in service.deliverables" :key="item">{{ item }}</li>
          </ul>
        </aside>
      </div>
    </section>

    <section v-if="relatedProjects.length > 0" class="section" aria-labelledby="related-heading">
      <div class="container">
        <SectionHeading
          id="related-heading"
          eyebrow="Proyectos"
          title="Trabajo relacionado"
        />
        <div class="service-detail__related">
          <ProjectGrid :projects="relatedProjects" />
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>

<style scoped>
.service-detail__header {
  max-width: 48rem;
  padding-bottom: 3rem;
}

.service-detail__number {
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 0.5rem;
}

.service-detail__category {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.service-detail__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}

.service-detail__intro {
  font-size: 1.0625rem;
  color: var(--color-muted);
  line-height: 1.65;
}

.service-detail__cover-wrap {
  padding-inline: var(--page-padding-x);
  max-width: var(--content-width-wide);
  margin-inline: auto;
}

.service-detail__cover-placeholder {
  aspect-ratio: 16 / 6;
  background-color: var(--color-surface);
  width: 100%;
}

.service-detail__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .service-detail__body {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }
}

.service-detail__description {
  font-size: 1rem;
  color: var(--color-muted);
  line-height: 1.75;
}

.service-detail__sidebar {
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
}

.service-detail__sidebar-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 0.75rem;
}

.service-detail__deliverables {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.service-detail__deliverables li {
  font-size: 0.875rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-border);
}

.service-detail__related {
  margin-top: 2.5rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
