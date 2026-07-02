<script setup lang="ts">
defineProps<{
  tag?: 'button' | 'a'
  variant?: 'primary' | 'primary-light' | 'secondary' | 'secondary-light' | 'ghost'
  href?: string
  to?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  external?: boolean
}>()
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :class="['base-button', `base-button--${variant ?? 'primary'}`]"
  >
    <slot />
  </NuxtLink>

  <a
    v-else-if="href"
    :href="href"
    :class="['base-button', `base-button--${variant ?? 'primary'}`]"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </a>

  <button
    v-else
    :type="type ?? 'button'"
    :disabled="disabled"
    :class="['base-button', `base-button--${variant ?? 'primary'}`]"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  white-space: nowrap;
}

.base-button--primary {
  background-color: var(--color-foreground);
  color: var(--color-background);
  border-color: var(--color-foreground);
}

.base-button--primary:hover {
  background-color: transparent;
  color: var(--color-foreground);
}

.base-button--secondary {
  background-color: transparent;
  color: var(--color-foreground);
  border-color: var(--color-foreground);
}

.base-button--secondary:hover {
  background-color: var(--color-foreground);
  color: var(--color-background);
}

/* For use on dark section backgrounds */
.base-button--primary-light {
  background-color: var(--color-dark-foreground);
  color: var(--color-dark);
  border-color: var(--color-dark-foreground);
}

.base-button--primary-light:hover {
  background-color: transparent;
  color: var(--color-dark-foreground);
}

.base-button--secondary-light {
  background-color: transparent;
  color: var(--color-dark-foreground);
  border-color: var(--color-dark-foreground);
}

.base-button--secondary-light:hover {
  background-color: var(--color-dark-foreground);
  color: var(--color-dark);
}

.base-button--ghost {
  background-color: transparent;
  color: var(--color-muted);
  border-color: transparent;
  padding-inline: 0;
}

.base-button--ghost:hover {
  color: var(--color-foreground);
}

.base-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
