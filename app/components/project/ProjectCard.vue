<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article class="project-card">
    <NuxtLink :to="`/proyectos/${project.slug}`" class="project-card__link" :aria-label="project.title">
      <div class="project-card__image-wrap">
        <div class="project-card__image-placeholder" aria-hidden="true" />
      </div>

      <div class="project-card__meta">
        <ProjectMeta :category="project.category" :location="project.location" :year="project.year" />
        <h3 class="project-card__title">{{ project.title }}</h3>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.project-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.project-card__link:hover .project-card__title {
  color: var(--color-muted);
}

.project-card__image-wrap {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background-color: var(--color-surface);
  margin-bottom: 1.25rem;
}

.project-card__image-placeholder {
  width: 100%;
  height: 100%;
  background-color: var(--color-surface);
}

.project-card__meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.project-card__title {
  font-size: 1.125rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  transition: color 0.15s ease;
}
</style>
