<script setup lang="ts">
import { projects } from '~/data/projects'

useSeoMeta({
  title: 'Proyectos',
  description: 'Portfolio de proyectos de César Barón: arquitectura, planimetría, topografía, drone y modelado.',
})
</script>

<template>
  <div>
    <section class="section" aria-labelledby="projects-heading">
      <div class="container">
        <SectionHeading
          id="projects-heading"
          eyebrow="Portfolio"
          title="Proyectos"
          subtitle="Una selección de proyectos que representa el alcance del trabajo del estudio."
        />

        <div class="proyectos__grid">
          <ProjectGrid :projects="projects" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.proyectos__grid {
  margin-top: 3rem;
}
</style>
