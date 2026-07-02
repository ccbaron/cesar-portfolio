<template>
  <section class="tech section" aria-labelledby="tech-heading">
    <div class="container">
      <div class="tech__grid">
        <div class="tech__content">
          <p class="tech__eyebrow" aria-hidden="true">Tecnología</p>
          <h2 id="tech-heading" class="tech__title">
            Del espacio<br>al modelo digital.
          </h2>
          <p class="tech__body">
            Aplicamos topografía, dron y fotogrametría para capturar el entorno con precisión y convertirlo en información útil para diseñar, construir y decidir mejor.
          </p>

          <ol class="tech__process" aria-label="Proceso de trabajo">
            <li>
              <span class="tech__step-num" aria-hidden="true">01</span>
              <span>Captura</span>
            </li>
            <li>
              <span class="tech__step-num" aria-hidden="true">02</span>
              <span>Procesamiento</span>
            </li>
            <li>
              <span class="tech__step-num" aria-hidden="true">03</span>
              <span>Modelo</span>
            </li>
            <li>
              <span class="tech__step-num" aria-hidden="true">04</span>
              <span>Información</span>
            </li>
          </ol>

          <ul class="tech__tags" aria-label="Tecnologías aplicadas">
            <li>Topografía</li>
            <li>Dron</li>
            <li>Fotogrametría</li>
            <li>Ortomosaicos</li>
            <li>Modelos 3D</li>
            <li>Documentación técnica</li>
          </ul>

          <BaseButton to="/servicios/topografia" variant="secondary-light">
            Conocer más
          </BaseButton>
        </div>

        <div class="tech__visual" aria-hidden="true">
          <div class="tech__image-placeholder" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tech {
  background-color: var(--color-dark);
  color: var(--color-dark-foreground);
}

.tech__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .tech__grid {
    grid-template-columns: 1fr 1fr;
  }
}

.tech__eyebrow {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-dark-muted);
  margin-bottom: 1rem;
}

.tech__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--color-dark-foreground);
  margin-bottom: 1.5rem;
}

.tech__body {
  font-size: 0.9375rem;
  color: var(--color-dark-muted);
  line-height: 1.7;
  max-width: 36rem;
  margin-bottom: 2rem;
}

.tech__process {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.tech__process li {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-dark-foreground);
}

.tech__step-num {
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  color: var(--color-dark-muted);
}

.tech__tags {
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech__tags li {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-dark-muted);
  border: 1px solid var(--color-dark-border);
  padding: 0.25rem 0.625rem;
}

.tech__visual {
  width: 100%;
}

.tech__image-placeholder {
  aspect-ratio: 1;
  background-color: var(--color-dark-surface);
  border: 1px solid var(--color-dark-border);
  width: 100%;
}
</style>
