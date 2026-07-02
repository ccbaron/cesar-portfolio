<script setup lang="ts">
import type { Service } from '~/types/service'

defineProps<{
  service: Service
}>()
</script>

<template>
  <div class="service-item">
    <hr class="divider" >
    <div class="service-item__inner">
      <span class="service-item__number">{{ service.number }}</span>
      <div class="service-item__content">
        <h3 class="service-item__title">{{ service.title }}</h3>
        <p class="service-item__summary">{{ service.summary }}</p>
      </div>
      <NuxtLink :to="`/servicios/${service.slug}`" class="service-item__link" :aria-label="`Ver servicio: ${service.title}`">
        Ver servicio
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.service-item__inner {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem 1.5rem;
  padding-block: 2rem;
  align-items: start;
}

@media (min-width: 768px) {
  .service-item__inner {
    grid-template-columns: 3rem 1fr auto;
  }
}

.service-item__number {
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  padding-top: 0.25rem;
}

.service-item__title {
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
}

.service-item__summary {
  font-size: 0.9375rem;
  color: var(--color-muted);
  line-height: 1.65;
  max-width: 40rem;
}

.service-item__link {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-foreground);
  text-decoration: none;
  white-space: nowrap;
  padding-top: 0.25rem;
  transition: color 0.15s ease;
  grid-column: 2;
}

@media (min-width: 768px) {
  .service-item__link {
    grid-column: auto;
  }
}

.service-item__link:hover {
  color: var(--color-muted);
}
</style>
