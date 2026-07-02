<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { contactSchema, SERVICE_OPTIONS } from '~~/shared/schemas/contact'
import type { ContactPayload } from '~~/shared/schemas/contact'

useSeoMeta({
  title: 'Contacto',
  description: 'Cuéntanos sobre tu proyecto. Responderemos en menos de 24 horas.',
})

type FormState = 'idle' | 'submitting' | 'success' | 'error' | 'rate-limited'

const state = ref<FormState>('idle')
const serverError = ref('')

const form = reactive<Partial<ContactPayload> & { website?: string }>({
  name: '',
  email: '',
  phone: '',
  service: undefined,
  location: '',
  message: '',
  privacyConsent: undefined,
  website: '', // honeypot
  turnstileToken: '',
  utmSource: undefined,
  utmMedium: undefined,
  utmCampaign: undefined,
  utmContent: undefined,
  utmTerm: undefined,
  pagePath: undefined,
  referrer: undefined,
})

const fieldErrors = reactive<Partial<Record<keyof ContactPayload | 'website', string>>>({})

onMounted(() => {
  const params = new URLSearchParams(window.location.search)
  form.utmSource = params.get('utm_source') ?? undefined
  form.utmMedium = params.get('utm_medium') ?? undefined
  form.utmCampaign = params.get('utm_campaign') ?? undefined
  form.utmContent = params.get('utm_content') ?? undefined
  form.utmTerm = params.get('utm_term') ?? undefined
  form.pagePath = window.location.pathname
  form.referrer = document.referrer || undefined
})

const SERVICE_LABELS: Record<string, string> = {
  arquitectura: 'Arquitectura',
  remodelacion: 'Remodelación / Rehabilitación',
  planimetria: 'Planimetría / Levantamiento',
  topografia: 'Topografía',
  dron: 'Dron / Fotogrametría',
  'modelado-3d': 'Modelado 3D',
  'energia-solar': 'Energía Solar',
  otro: 'Otro',
}

function clearErrors() {
  const keys = Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>
  for (const k of keys) {
    fieldErrors[k] = undefined
  }
}

function onTurnstileVerified(token: string) {
  form.turnstileToken = token
}

async function handleSubmit() {
  if (state.value === 'submitting') return
  clearErrors()
  state.value = 'submitting'
  serverError.value = ''

  const payload = { ...form }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    const errs = parsed.error.flatten().fieldErrors
    Object.entries(errs).forEach(([field, messages]) => {
      if (messages && messages.length > 0) {
        fieldErrors[field as keyof typeof fieldErrors] = messages[0]
      }
    })
    state.value = 'idle'
    return
  }

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: parsed.data,
      headers: { 'Content-Type': 'application/json' },
    })
    state.value = 'success'
  }
  catch (err: unknown) {
    const fetchError = err as { status?: number; data?: { message?: string } }
    if (fetchError.status === 429) {
      state.value = 'rate-limited'
    }
    else {
      state.value = 'error'
      serverError.value = fetchError.data?.message || 'Error inesperado. Por favor intenta de nuevo.'
    }
  }
}

const config = useRuntimeConfig()
const turnstileSiteKey = config.public.turnstileSiteKey || ''
</script>

<template>
  <main class="contacto">
    <div class="container">
      <div class="contacto__header">
        <p class="contacto__eyebrow" aria-hidden="true">Contacto</p>
        <h1 class="contacto__title">Cuéntanos sobre tu proyecto.</h1>
        <p class="contacto__subtitle">Respondemos en menos de 24 horas.</p>
      </div>

      <!-- Success state -->
      <div v-if="state === 'success'" class="contacto__feedback contacto__feedback--success" role="alert">
        <p class="contacto__feedback-title">Mensaje enviado.</p>
        <p>Gracias por contactarnos. Te responderemos pronto.</p>
      </div>

      <!-- Rate-limited state -->
      <div v-else-if="state === 'rate-limited'" class="contacto__feedback contacto__feedback--warning" role="alert">
        <p class="contacto__feedback-title">Demasiados intentos.</p>
        <p>Has enviado varias solicitudes en poco tiempo. Por favor espera 15 minutos antes de intentar de nuevo.</p>
      </div>

      <!-- Form -->
      <form
        v-else
        class="contacto__form"
        novalidate
        @submit.prevent="handleSubmit"
      >
        <!-- Honeypot — visually hidden, never filled by real users -->
        <div class="sr-only" aria-hidden="true">
          <label for="website">No rellenar</label>
          <input
            id="website"
            v-model="form.website"
            type="text"
            name="website"
            autocomplete="off"
            tabindex="-1"
          >
        </div>

        <!-- Name -->
        <div class="contacto__field" :class="{ 'contacto__field--error': fieldErrors.name }">
          <label class="contacto__label" for="contact-name">
            Nombre completo <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            v-model="form.name"
            class="contacto__input"
            type="text"
            name="name"
            autocomplete="name"
            :aria-invalid="!!fieldErrors.name"
            aria-describedby="contact-name-error"
            required
          >
          <span v-if="fieldErrors.name" id="contact-name-error" class="contacto__error" role="alert">
            {{ fieldErrors.name }}
          </span>
        </div>

        <!-- Email -->
        <div class="contacto__field" :class="{ 'contacto__field--error': fieldErrors.email }">
          <label class="contacto__label" for="contact-email">
            Correo electrónico <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            v-model="form.email"
            class="contacto__input"
            type="email"
            name="email"
            autocomplete="email"
            :aria-invalid="!!fieldErrors.email"
            aria-describedby="contact-email-error"
            required
          >
          <span v-if="fieldErrors.email" id="contact-email-error" class="contacto__error" role="alert">
            {{ fieldErrors.email }}
          </span>
        </div>

        <!-- Phone -->
        <div class="contacto__field">
          <label class="contacto__label" for="contact-phone">
            Teléfono <span class="contacto__optional">(opcional)</span>
          </label>
          <input
            id="contact-phone"
            v-model="form.phone"
            class="contacto__input"
            type="tel"
            name="phone"
            autocomplete="tel"
          >
        </div>

        <!-- Service -->
        <div class="contacto__field" :class="{ 'contacto__field--error': fieldErrors.service }">
          <label class="contacto__label" for="contact-service">
            Tipo de proyecto <span aria-hidden="true">*</span>
          </label>
          <select
            id="contact-service"
            v-model="form.service"
            class="contacto__select"
            name="service"
            :aria-invalid="!!fieldErrors.service"
            aria-describedby="contact-service-error"
            required
          >
            <option value="" disabled selected>Selecciona una opción</option>
            <option v-for="opt in SERVICE_OPTIONS" :key="opt" :value="opt">
              {{ SERVICE_LABELS[opt] }}
            </option>
          </select>
          <span v-if="fieldErrors.service" id="contact-service-error" class="contacto__error" role="alert">
            {{ fieldErrors.service }}
          </span>
        </div>

        <!-- Location -->
        <div class="contacto__field contacto__field--full">
          <label class="contacto__label" for="contact-location">
            Ciudad / Municipio <span class="contacto__optional">(opcional)</span>
          </label>
          <input
            id="contact-location"
            v-model="form.location"
            class="contacto__input"
            type="text"
            name="location"
            autocomplete="address-level2"
          >
        </div>

        <!-- Message -->
        <div class="contacto__field contacto__field--full" :class="{ 'contacto__field--error': fieldErrors.message }">
          <label class="contacto__label" for="contact-message">
            Cuéntanos sobre tu proyecto <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="contact-message"
            v-model="form.message"
            class="contacto__textarea"
            name="message"
            rows="6"
            :aria-invalid="!!fieldErrors.message"
            aria-describedby="contact-message-error"
            required
          />
          <span v-if="fieldErrors.message" id="contact-message-error" class="contacto__error" role="alert">
            {{ fieldErrors.message }}
          </span>
        </div>

        <!-- Turnstile widget -->
        <div v-if="turnstileSiteKey" class="contacto__field contacto__field--full">
          <div
            class="cf-turnstile"
            :data-sitekey="turnstileSiteKey"
            data-theme="light"
            data-language="es"
            :data-callback="onTurnstileVerified"
          />
          <span v-if="fieldErrors.turnstileToken" class="contacto__error" role="alert">
            {{ fieldErrors.turnstileToken }}
          </span>
        </div>

        <!-- Privacy consent -->
        <div
          class="contacto__field contacto__field--full contacto__field--consent"
          :class="{ 'contacto__field--error': fieldErrors.privacyConsent }"
        >
          <label class="contacto__checkbox-label">
            <input
              v-model="form.privacyConsent"
              class="contacto__checkbox"
              type="checkbox"
              name="privacyConsent"
              :true-value="true"
              :false-value="undefined"
              :aria-invalid="!!fieldErrors.privacyConsent"
              aria-describedby="contact-privacy-error"
              required
            >
            <span>
              He leído y acepto la
              <NuxtLink to="/privacidad" class="contacto__privacy-link">política de privacidad</NuxtLink>.<span aria-hidden="true"> *</span>
            </span>
          </label>
          <span v-if="fieldErrors.privacyConsent" id="contact-privacy-error" class="contacto__error" role="alert">
            {{ fieldErrors.privacyConsent }}
          </span>
        </div>

        <!-- Server error -->
        <div v-if="state === 'error'" class="contacto__field contacto__field--full">
          <p class="contacto__server-error" role="alert">
            {{ serverError || 'Error al enviar el formulario. Por favor intenta de nuevo.' }}
          </p>
        </div>

        <!-- Submit -->
        <div class="contacto__field contacto__field--full contacto__actions">
          <BaseButton type="submit" variant="primary" :disabled="state === 'submitting'">
            {{ state === 'submitting' ? 'Enviando…' : 'Enviar mensaje' }}
          </BaseButton>
          <p class="contacto__required-note" aria-hidden="true">* Campos obligatorios</p>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
.contacto {
  padding-block: var(--section-spacing);
}

.contacto__header {
  max-width: 42rem;
  margin-bottom: 4rem;
}

.contacto__eyebrow {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.contacto__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.contacto__subtitle {
  font-size: 1rem;
  color: var(--color-muted);
}

/* Feedback states */
.contacto__feedback {
  max-width: 36rem;
  padding: 2rem;
  border: 1px solid var(--color-border);
}

.contacto__feedback--success {
  border-color: #166534;
  background-color: #f0fdf4;
  color: #166534;
}

.contacto__feedback--warning {
  border-color: #92400e;
  background-color: #fffbeb;
  color: #92400e;
}

.contacto__feedback-title {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

/* Form grid */
.contacto__form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 56rem;
}

@media (min-width: 640px) {
  .contacto__form {
    grid-template-columns: repeat(2, 1fr);
  }
}

.contacto__field {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.contacto__field--full {
  grid-column: 1 / -1;
}

.contacto__field--consent {
  padding-top: 0.25rem;
}

.contacto__label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-foreground);
  letter-spacing: 0.02em;
}

.contacto__optional {
  font-weight: 400;
  color: var(--color-muted);
}

.contacto__input,
.contacto__select,
.contacto__textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.9375rem;
  font-family: var(--font-sans);
  color: var(--color-foreground);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  outline: none;
  transition: border-color 0.15s ease;
  appearance: none;
}

.contacto__input:focus,
.contacto__select:focus,
.contacto__textarea:focus {
  border-color: var(--color-foreground);
}

.contacto__textarea {
  resize: vertical;
  min-height: 8rem;
}

.contacto__field--error .contacto__input,
.contacto__field--error .contacto__select,
.contacto__field--error .contacto__textarea {
  border-color: #dc2626;
}

.contacto__error {
  font-size: 0.75rem;
  color: #dc2626;
}

.contacto__server-error {
  font-size: 0.875rem;
  color: #dc2626;
  padding: 1rem;
  border: 1px solid #dc2626;
}

/* Privacy checkbox */
.contacto__checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.875rem;
  color: var(--color-muted);
  cursor: pointer;
  line-height: 1.5;
}

.contacto__checkbox {
  margin-top: 0.2em;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  accent-color: var(--color-foreground);
  cursor: pointer;
}

.contacto__privacy-link {
  color: var(--color-foreground);
  text-underline-offset: 2px;
}

/* Actions */
.contacto__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.contacto__required-note {
  font-size: 0.75rem;
  color: var(--color-muted);
}
</style>
