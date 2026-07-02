<script setup lang="ts">
import { services } from '~/data/services'

const mainServices = services.filter((s) => s.category !== 'energia')
</script>

<template>
  <section class="section" aria-labelledby="services-heading">
    <div class="container">
      <SectionHeading
        id="services-heading"
        eyebrow="Servicios"
        title="Qué hacemos"
        subtitle="Arquitectura, tecnología aplicada al proyecto y soluciones de energía: tres disciplinas integradas para construir mejor."
      />

      <div class="services-overview__list">
        <ServiceList :services="mainServices" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-overview__list {
  margin-top: 3rem;
}
</style>
