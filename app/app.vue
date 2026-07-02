<script setup lang="ts">
import { computed } from 'vue'
import { site } from '~/data/site'

const config = useRuntimeConfig()
const route = useRoute()
const siteUrl = config.public.siteUrl

// Canonical URL — only emitted when NUXT_PUBLIC_SITE_URL is configured
useHead(computed(() => ({
  link: siteUrl
    ? [{ rel: 'canonical', href: `${siteUrl}${route.path}` }]
    : [],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        description: site.description,
        ...(siteUrl ? { url: siteUrl } : {}),
      }),
    },
  ],
})))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
