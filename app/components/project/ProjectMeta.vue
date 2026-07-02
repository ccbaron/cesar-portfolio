<script setup lang="ts">
import type { ProjectCategory } from '~/types/project'

defineProps<{
  category: ProjectCategory
  location: string
  year: number
}>()

const categoryLabels: Record<ProjectCategory, string> = {
  arquitectura: 'Arquitectura',
  tecnologia: 'Tecnología',
  energia: 'Energía Solar',
}
</script>

<template>
  <div class="project-meta">
    <span class="project-meta__category">{{ categoryLabels[category] }}</span>
    <span class="project-meta__separator" aria-hidden="true">·</span>
    <span class="project-meta__location">{{ location }}</span>
    <span class="project-meta__separator" aria-hidden="true">·</span>
    <span class="project-meta__year">{{ year }}</span>
  </div>
</template>

<style scoped>
.project-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-muted);
}

.project-meta__separator {
  color: var(--color-border);
}
</style>
