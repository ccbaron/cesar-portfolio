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
</script>

<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <hr class="divider divider--dark">

      <div class="site-footer__grid">
        <div class="site-footer__brand">
          <p class="site-footer__name">{{ site.name }}</p>
          <p class="site-footer__tagline">{{ site.tagline }}</p>
        </div>

        <nav class="site-footer__nav" aria-label="Navegación del pie de página">
          <ul role="list">
            <li v-for="item in navItems" :key="item.to">
              <NuxtLink :to="item.to" class="site-footer__link">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="site-footer__contact">
          <p class="site-footer__label">Contacto</p>
          <a :href="`mailto:${site.email}`" class="site-footer__link">{{ site.email }}</a>
          <a :href="`tel:${site.phone.replace(/\s/g, '')}`" class="site-footer__link">
            {{ site.phone }}
          </a>
        </div>

        <div class="site-footer__social">
          <p class="site-footer__label">Redes</p>
          <template v-if="site.social.instagram || site.social.linkedin">
            <a
              v-if="site.social.instagram"
              :href="`https://instagram.com/${site.social.instagram}`"
              class="site-footer__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de César Barón"
            >
              Instagram
            </a>
            <a
              v-if="site.social.linkedin"
              :href="site.social.linkedin"
              class="site-footer__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de César Barón"
            >
              LinkedIn
            </a>
          </template>
          <span v-else class="site-footer__placeholder">Próximamente</span>
        </div>
      </div>

      <div class="site-footer__legal">
        <p class="site-footer__copyright">
          &copy; {{ new Date().getFullYear() }} {{ site.name }}
        </p>
        <div class="site-footer__legal-links">
          <NuxtLink :to="site.legal.privacyPolicy" class="site-footer__link site-footer__link--small">
            Política de privacidad
          </NuxtLink>
          <NuxtLink :to="site.legal.legalNotice" class="site-footer__link site-footer__link--small">
            Aviso legal
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: var(--color-dark);
  color: var(--color-dark-foreground);
  padding-block: 4rem;
  margin-top: var(--section-spacing);
}

.site-footer__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding-block: 3rem;
}

@media (min-width: 640px) {
  .site-footer__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .site-footer__grid {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }
}

.site-footer__name {
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--color-dark-foreground);
  margin-bottom: 0.25rem;
}

.site-footer__tagline {
  font-size: 0.75rem;
  color: var(--color-dark-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.site-footer__label {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-dark-muted);
  margin-bottom: 0.75rem;
}

.site-footer__nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.site-footer__contact {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.site-footer__social {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.site-footer__link {
  font-size: 0.8125rem;
  color: var(--color-dark-muted);
  text-decoration: none;
  transition: color 0.15s ease;
}

.site-footer__link:hover {
  color: var(--color-dark-foreground);
}

.site-footer__link--small {
  font-size: 0.75rem;
}

.site-footer__placeholder {
  font-size: 0.8125rem;
  color: var(--color-dark-border);
}

.site-footer__legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-dark-border);
}

.site-footer__copyright {
  font-size: 0.75rem;
  color: var(--color-dark-muted);
}

.site-footer__legal-links {
  display: flex;
  gap: 1.5rem;
}
</style>
