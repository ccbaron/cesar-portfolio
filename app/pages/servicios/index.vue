<script setup lang="ts">
import { services } from '~/data/services'

useSeoMeta({
  title: 'Servicios',
  description: 'Servicios de César Barón: arquitectura, topografía, levantamientos con dron, modelado 3D y energía solar.',
})
</script>

<template>
  <div>
    <section class="section" aria-labelledby="services-page-heading">
      <div class="container">
        <SectionHeading
          id="services-page-heading"
          eyebrow="Qué hacemos"
          title="Servicios"
          subtitle="Arquitectura, tecnología y energía: tres disciplinas integradas para proyectar, construir y mejorar espacios."
        />

        <div class="servicios__list">
          <ServiceList :services="services" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.servicios__list {
  margin-top: 3rem;
}
</style>
