<script setup lang="ts">
import { site } from '~/data/site'

const navItems = [
  { label: 'Proyectos', to: '/proyectos' },
  { label: 'Arquitectura', to: '/servicios/arquitectura' },
  { label: 'Topografía & Dron', to: '/servicios/topografia' },
  { label: 'Energía Solar', to: '/energia-solar' },
  { label: 'Estudio', to: '/estudio' },
  { label: 'Contacto', to: '/contacto' },
]

const mobileMenuOpen = ref(false)

function toggleMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMenu() {
  mobileMenuOpen.value = false
}

const route = useRoute()
watch(() => route.path, closeMenu)
</script>

<template>
  <header class="site-header" role="banner">
    <div class="container">
      <nav class="site-nav" aria-label="Navegación principal">
        <NuxtLink to="/" class="site-logo" aria-label="César Barón — Inicio">
          {{ site.name }}
        </NuxtLink>

        <ul class="site-nav__list" role="list">
          <li v-for="item in navItems" :key="item.to">
            <NuxtLink :to="item.to" class="site-nav__link" :aria-current="$route.path === item.to ? 'page' : undefined">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>

        <button
          class="site-nav__toggle"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-navigation"
          aria-label="Abrir menú de navegación"
          type="button"
          @click="toggleMenu"
        >
          <span class="site-nav__toggle-bar" />
          <span class="site-nav__toggle-bar" />
          <span :class="['site-nav__toggle-bar', { 'site-nav__toggle-bar--hidden': mobileMenuOpen }]" />
        </button>
      </nav>
    </div>

    <MobileNavigation
      id="mobile-navigation"
      :items="navItems"
      :open="mobileMenuOpen"
      @close="closeMenu"
    />
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--color-background);
  border-bottom: 1px solid var(--color-border);
}

.site-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  gap: 2rem;
}

.site-logo {
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: var(--color-foreground);
  white-space: nowrap;
  flex-shrink: 0;
}

.site-logo:hover {
  color: var(--color-muted);
}

.site-nav__list {
  display: none;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .site-nav__list {
    display: flex;
  }
}

.site-nav__link {
  font-size: 0.8125rem;
  letter-spacing: 0.03em;
  text-decoration: none;
  color: var(--color-muted);
  transition: color 0.15s ease;
}

.site-nav__link:hover,
.site-nav__link[aria-current='page'] {
  color: var(--color-foreground);
}

.site-nav__toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .site-nav__toggle {
    display: none;
  }
}

.site-nav__toggle-bar {
  display: block;
  width: 100%;
  height: 1px;
  background-color: var(--color-foreground);
  transition: opacity 0.15s ease;
}

.site-nav__toggle-bar--hidden {
  opacity: 0;
}
</style>
