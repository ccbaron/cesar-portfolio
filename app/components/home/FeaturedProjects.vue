<script setup lang="ts">
import { getFeaturedProjects } from '~/data/projects'

const projects = getFeaturedProjects()
</script>

<template>
  <section class="section" aria-labelledby="featured-heading">
    <div class="container">
      <div class="featured-projects__header">
        <SectionHeading
          id="featured-heading"
          eyebrow="Proyectos"
          title="Trabajo reciente"
        />
        <BaseButton to="/proyectos" variant="ghost">
          Ver todos →
        </BaseButton>
      </div>

      <ProjectGrid :projects="projects" />
    </div>
  </section>
</template>

<style scoped>
.featured-projects__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: 3rem;
}
</style>
