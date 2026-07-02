<script setup lang="ts">
useSeoMeta({
  title: 'Energía Solar',
  description: 'Soluciones de energía solar para proyectos residenciales y comerciales. César Barón integra instalaciones fotovoltaicas desde la fase de diseño arquitectónico.',
})

const solutionAreas = [
  {
    title: 'Residencial',
    description: 'Integración fotovoltaica en viviendas de nueva construcción y remodelación. La instalación como parte del diseño, no como un añadido posterior.',
  },
  {
    title: 'Comercial',
    description: 'Estudio de viabilidad y diseño de instalaciones en edificios y locales comerciales, con criterio técnico y económico.',
  },
  {
    title: 'Integración arquitectónica',
    description: 'La instalación solar como parte del lenguaje arquitectónico del edificio: cubiertas, fachadas y espacios exteriores.',
  },
]

const processSteps = [
  { number: '01', label: 'Análisis', description: 'Estudio de la demanda energética, orientación, sombras y viabilidad técnica.' },
  { number: '02', label: 'Propuesta', description: 'Solución adaptada al edificio y al uso. Sin sobredimensionar.' },
  { number: '03', label: 'Diseño', description: 'Integración de la instalación en el proyecto arquitectónico.' },
  { number: '04', label: 'Implantación', description: 'Coordinación con instaladores certificados para la ejecución.' },
]
</script>

<template>
  <div class="energia-solar">
    <section class="energia-solar__hero section" aria-labelledby="energia-heading">
      <div class="container">
        <div class="energia-solar__header">
          <p class="energia-solar__eyebrow" aria-hidden="true">Energía & Sostenibilidad</p>
          <h1 id="energia-heading" class="energia-solar__title">
            Soluciones de energía solar.
          </h1>
          <p class="energia-solar__intro">
            Soluciones pensadas para integrar eficiencia, autonomía y sostenibilidad en viviendas, proyectos y negocios. Estudiamos la viabilidad e incorporamos la instalación fotovoltaica como parte del proceso de diseño.
          </p>
        </div>

        <div class="energia-solar__cover-placeholder" aria-hidden="true" />
      </div>
    </section>

    <section class="section" aria-labelledby="solar-areas-heading">
      <div class="container">
        <SectionHeading
          id="solar-areas-heading"
          eyebrow="Ámbitos"
          title="Dónde aplicamos la energía solar"
        />

        <div class="energia-solar__areas">
          <article v-for="area in solutionAreas" :key="area.title" class="energia-solar__area">
            <hr class="divider" >
            <div class="energia-solar__area-inner">
              <h3 class="energia-solar__area-title">{{ area.title }}</h3>
              <p class="energia-solar__area-desc">{{ area.description }}</p>
            </div>
          </article>
          <hr class="divider" >
        </div>
      </div>
    </section>

    <section class="energia-solar__process section" aria-labelledby="process-heading">
      <div class="container">
        <SectionHeading
          id="process-heading"
          eyebrow="Proceso"
          title="Cómo trabajamos"
        />

        <ol class="energia-solar__steps" aria-label="Fases del proceso">
          <li v-for="step in processSteps" :key="step.number" class="energia-solar__step">
            <span class="energia-solar__step-num" aria-hidden="true">{{ step.number }}</span>
            <div>
              <h3 class="energia-solar__step-title">{{ step.label }}</h3>
              <p class="energia-solar__step-desc">{{ step.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="energia-solar__disclaimer section" aria-label="Nota sobre el servicio">
      <div class="container">
        <p class="energia-solar__note">
          <!-- TODO: Update with specific certifications, registrations, or regulated activity limits when legally reviewed -->
          El servicio comprende el estudio, diseño e integración arquitectónica. La instalación eléctrica es ejecutada por instaladores debidamente certificados. Cada proyecto determina el alcance concreto del trabajo.
        </p>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>

<style scoped>
.energia-solar__header {
  max-width: 48rem;
  margin-bottom: 4rem;
}

.energia-solar__eyebrow {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.energia-solar__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}

.energia-solar__intro {
  font-size: 1.0625rem;
  color: var(--color-muted);
  line-height: 1.7;
}

.energia-solar__cover-placeholder {
  aspect-ratio: 21 / 9;
  background-color: var(--color-surface);
  width: 100%;
}

.energia-solar__areas {
  margin-top: 3rem;
}

.energia-solar__area-inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  padding-block: 2rem;
}

@media (min-width: 768px) {
  .energia-solar__area-inner {
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
  }
}

.energia-solar__area-title {
  font-size: 1.125rem;
  font-weight: 400;
}

.energia-solar__area-desc {
  font-size: 0.9375rem;
  color: var(--color-muted);
  line-height: 1.7;
}

.energia-solar__process {
  background-color: var(--color-surface);
}

.energia-solar__steps {
  list-style: none;
  padding: 0;
  margin: 3rem 0 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 640px) {
  .energia-solar__steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .energia-solar__steps {
    grid-template-columns: repeat(4, 1fr);
  }
}

.energia-solar__step {
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.energia-solar__step-num {
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--color-muted);
}

.energia-solar__step-title {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.energia-solar__step-desc {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.65;
}

.energia-solar__note {
  font-size: 0.8125rem;
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 48rem;
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
}
</style>
