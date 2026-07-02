<script setup lang="ts">
defineProps<{
  wide?: boolean
}>()
</script>

<template>
  <div :class="['container', { 'container--wide': wide }]">
    <slot />
  </div>
</template>
