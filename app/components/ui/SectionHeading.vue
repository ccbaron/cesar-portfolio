<script setup lang="ts">
defineProps<{
  tag?: string
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <component :is="tag ?? 'div'" :class="['section-heading', `section-heading--${align ?? 'left'}`]">
    <p v-if="eyebrow" class="section-heading__eyebrow" aria-hidden="true">{{ eyebrow }}</p>
    <h2 class="section-heading__title">{{ title }}</h2>
    <p v-if="subtitle" class="section-heading__subtitle">{{ subtitle }}</p>
  </component>
</template>

<style scoped>
.section-heading {
  max-width: 48rem;
}

.section-heading--center {
  margin-inline: auto;
  text-align: center;
}

.section-heading__eyebrow {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 0.75rem;
}

.section-heading__title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 400;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--color-foreground);
  margin-bottom: 1rem;
}

.section-heading__subtitle {
  font-size: 1rem;
  color: var(--color-muted);
  line-height: 1.65;
  max-width: 38rem;
}

.section-heading--center .section-heading__subtitle {
  margin-inline: auto;
}
</style>
