<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    statusMessage: string
    message?: string
  }
}>()

const is404 = props.error.statusCode === 404

useSeoMeta({
  title: is404 ? 'Página no encontrada' : 'Error inesperado',
})
</script>

<template>
  <NuxtLayout>
    <section class="error-page section" aria-labelledby="error-heading">
      <div class="container">
        <p class="error-page__code" aria-hidden="true">{{ error.statusCode }}</p>
        <h1 id="error-heading" class="error-page__title">
          {{ is404 ? 'Este espacio aún no existe.' : 'Algo ha ido mal.' }}
        </h1>
        <p class="error-page__body">
          {{ is404
            ? 'La página que buscas no existe o ha sido movida.'
            : 'Ha ocurrido un error inesperado. Por favor intenta de nuevo.' }}
        </p>
        <div class="error-page__actions">
          <BaseButton to="/proyectos" variant="primary" @click="clearError()">
            Volver a proyectos
          </BaseButton>
          <BaseButton to="/" variant="secondary" @click="clearError()">
            Ir al inicio
          </BaseButton>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  min-height: 60dvh;
  display: flex;
  align-items: center;
}

.error-page__code {
  font-size: 6rem;
  font-weight: 200;
  letter-spacing: -0.05em;
  color: var(--color-border);
  line-height: 1;
  margin-bottom: 1rem;
}

.error-page__title {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
}

.error-page__body {
  font-size: 0.9375rem;
  color: var(--color-muted);
  margin-bottom: 2.5rem;
  max-width: 32rem;
  line-height: 1.65;
}

.error-page__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
