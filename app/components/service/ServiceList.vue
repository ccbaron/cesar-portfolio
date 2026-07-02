<script setup lang="ts">
import type { Service } from '~/types/service'

defineProps<{
  services: Service[]
}>()
</script>

<template>
  <div class="service-list">
    <ServiceItem
      v-for="service in services"
      :key="service.slug"
      :service="service"
    />
    <hr class="divider" >
  </div>
</template>
