<script setup lang="ts">
interface NavItem {
  label: string
  to: string
}

const props = defineProps<{
  id: string
  items: NavItem[]
  open: boolean
  scrolled?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}
</script>

<template>
  <div
    :id="props.id"
    :class="['mobile-nav', { 'mobile-nav--open': props.open, 'mobile-nav--scrolled': props.scrolled }]"
    role="navigation"
    aria-label="Menú móvil"
    @keydown="handleKeydown"
  >
    <ul class="mobile-nav__list" role="list">
      <li v-for="item in props.items" :key="item.to">
        <NuxtLink
          :to="item.to"
          class="mobile-nav__link"
          :aria-current="$route.path === item.to ? 'page' : undefined"
          @click="emit('close')"
        >
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.mobile-nav {
  display: none;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  transition:
    background-color 300ms ease,
    border-color 300ms ease,
    backdrop-filter 300ms ease;
}

.mobile-nav--open {
  display: block;
}

/* Same material system as the header's glass state, but kept more opaque:
   readability takes priority over transparency once the menu is open. */
.mobile-nav--scrolled {
  background-color: color-mix(in srgb, var(--color-background) 92%, transparent);
  border-bottom-color: var(--color-header-glass-border);
}

@supports (backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px)) {
  .mobile-nav--scrolled {
    background-color: color-mix(in srgb, var(--color-background) 88%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
}

@media (min-width: 1024px) {
  .mobile-nav,
  .mobile-nav--open {
    display: none;
  }
}

.mobile-nav__list {
  list-style: none;
  margin: 0;
  padding: 1.5rem var(--page-padding-x) 2rem;
}

.mobile-nav__link {
  display: block;
  padding-block: 0.75rem;
  font-size: 1rem;
  text-decoration: none;
  color: var(--color-foreground);
  border-bottom: 1px solid var(--color-border);
  transition: color 0.15s ease;
}

.mobile-nav__link:hover,
.mobile-nav__link[aria-current='page'] {
  color: var(--color-muted);
}
</style>
