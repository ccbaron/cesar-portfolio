<script setup lang="ts">
import { getProjectBySlug, projects } from '~/data/projects'

const route = useRoute()
const slug = route.params.slug as string

const project = getProjectBySlug(slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Proyecto no encontrado' })
}

const allProjects = projects
const currentIndex = allProjects.findIndex((p) => p.slug === slug)
const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

useSeoMeta({
  title: project.title,
  description: project.summary,
  ogTitle: `${project.title} · César Barón`,
  ogDescription: project.summary,
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
          { '@type': 'ListItem', position: 1, name: 'Proyectos', item: `${base}/proyectos` },
          { '@type': 'ListItem', position: 2, name: project.title, item: `${base}/proyectos/${project.slug}` },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div class="project-detail">
    <div class="project-detail__hero">
      <div class="container">
        <div class="project-detail__header">
          <ProjectMeta
            :category="project.category"
            :location="project.location"
            :year="project.year"
          />
          <h1 class="project-detail__title">{{ project.title }}</h1>
        </div>
      </div>

      <div class="project-detail__cover-wrap" aria-hidden="true">
        <div class="project-detail__cover-placeholder" />
      </div>
    </div>

    <section class="section" aria-labelledby="project-intro-heading">
      <div class="container project-detail__body">
        <div class="project-detail__intro">
          <h2 id="project-intro-heading" class="project-detail__summary">
            {{ project.summary }}
          </h2>
          <p class="project-detail__description">{{ project.description }}</p>
        </div>

        <aside class="project-detail__sidebar" aria-label="Ficha del proyecto">
          <div class="project-detail__info-block">
            <p class="project-detail__info-label">Servicios</p>
            <ul class="project-detail__services">
              <li v-for="service in project.services" :key="service">{{ service }}</li>
            </ul>
          </div>
          <div class="project-detail__info-block">
            <p class="project-detail__info-label">Estado</p>
            <p class="project-detail__info-value">{{ project.status === 'completed' ? 'Completado' : project.status === 'in-progress' ? 'En curso' : 'Concepto' }}</p>
          </div>
        </aside>
      </div>
    </section>

    <section class="project-detail__gallery section" aria-label="Galería del proyecto">
      <div class="container">
        <div class="project-detail__gallery-grid">
          <div
            v-for="(_, i) in project.gallery"
            :key="i"
            class="project-detail__gallery-item"
            aria-hidden="true"
          >
            <div class="project-detail__gallery-placeholder" />
          </div>
        </div>
      </div>
    </section>

    <nav class="project-detail__nav section" aria-label="Proyectos anterior y siguiente">
      <div class="container">
        <hr class="divider" >
        <div class="project-detail__nav-inner">
          <NuxtLink
            v-if="prevProject"
            :to="`/proyectos/${prevProject.slug}`"
            class="project-detail__nav-link project-detail__nav-link--prev"
          >
            <span class="project-detail__nav-label">Anterior</span>
            <span class="project-detail__nav-title">{{ prevProject.title }}</span>
          </NuxtLink>
          <span v-else />

          <NuxtLink
            v-if="nextProject"
            :to="`/proyectos/${nextProject.slug}`"
            class="project-detail__nav-link project-detail__nav-link--next"
          >
            <span class="project-detail__nav-label">Siguiente</span>
            <span class="project-detail__nav-title">{{ nextProject.title }}</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.project-detail__header {
  padding-block: var(--section-spacing) 3rem;
  max-width: 48rem;
}

.project-detail__title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-top: 1rem;
}

.project-detail__cover-wrap {
  width: 100%;
  max-width: var(--content-width-wide);
  margin-inline: auto;
  padding-inline: var(--page-padding-x);
}

.project-detail__cover-placeholder {
  aspect-ratio: 16 / 7;
  background-color: var(--color-surface);
  width: 100%;
}

.project-detail__body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 1024px) {
  .project-detail__body {
    grid-template-columns: 2fr 1fr;
    align-items: start;
  }
}

.project-detail__summary {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: -0.01em;
  margin-bottom: 1.5rem;
}

.project-detail__description {
  font-size: 0.9375rem;
  color: var(--color-muted);
  line-height: 1.75;
}

.project-detail__sidebar {
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.project-detail__info-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 0.5rem;
}

.project-detail__services {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.project-detail__services li {
  font-size: 0.875rem;
}

.project-detail__info-value {
  font-size: 0.875rem;
}

.project-detail__gallery-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .project-detail__gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.project-detail__gallery-placeholder {
  aspect-ratio: 4 / 3;
  background-color: var(--color-surface);
  width: 100%;
}

.project-detail__nav-inner {
  display: flex;
  justify-content: space-between;
  padding-block: 2rem;
}

.project-detail__nav-link {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-decoration: none;
  color: inherit;
}

.project-detail__nav-link--next {
  text-align: right;
  margin-left: auto;
}

.project-detail__nav-label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
}

.project-detail__nav-title {
  font-size: 0.9375rem;
  transition: color 0.15s ease;
}

.project-detail__nav-link:hover .project-detail__nav-title {
  color: var(--color-muted);
}
</style>
