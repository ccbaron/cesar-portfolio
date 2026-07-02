<template>
  <section class="energy section" aria-labelledby="energy-heading">
    <div class="container">
      <div class="energy__grid">
        <div class="energy__visual" aria-hidden="true">
          <div class="energy__image-placeholder" />
        </div>

        <div class="energy__content">
          <p class="energy__eyebrow" aria-hidden="true">Energía & Sostenibilidad</p>
          <h2 id="energy-heading" class="energy__title">
            Soluciones de energía solar.
          </h2>
          <p class="energy__body">
            Energía integrada a la forma en que diseñamos y habitamos los espacios. Estudiamos la viabilidad e incorporamos instalaciones fotovoltaicas desde la fase de diseño, en proyectos residenciales y comerciales.
          </p>
          <BaseButton to="/energia-solar" variant="primary">
            Conocer soluciones solares
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.energy__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .energy__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.energy__eyebrow {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.energy__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.energy__body {
  font-size: 0.9375rem;
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 36rem;
  margin-bottom: 2.5rem;
}

.energy__visual {
  width: 100%;
}

.energy__image-placeholder {
  aspect-ratio: 4 / 3;
  background-color: var(--color-surface);
  width: 100%;
}
</style>
