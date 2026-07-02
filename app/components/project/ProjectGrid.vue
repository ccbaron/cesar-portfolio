<script setup lang="ts">
import type { Project } from '~/types/project'

defineProps<{
  projects: Project[]
}>()
</script>

<template>
  <div class="project-grid">
    <ProjectCard
      v-for="project in projects"
      :key="project.id"
      :project="project"
    />
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem 2rem;
}

@media (min-width: 640px) {
  .project-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .project-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
