<template>
  <section class="about section" aria-labelledby="about-heading">
    <div class="container">
      <div class="about__grid">
        <div class="about__image-wrap" aria-hidden="true">
          <div class="about__image-placeholder" />
        </div>

        <div class="about__content">
          <p class="about__eyebrow" aria-hidden="true">Estudio</p>
          <h2 id="about-heading" class="about__title">César Barón</h2>
          <p class="about__bio">
            <!-- TODO: Replace with real biographical information provided by César -->
            Arquitecto con visión técnica e integradora. El estudio combina arquitectura, tecnología aplicada al proyecto y soluciones de energía para ofrecer un servicio completo a quienes construyen y transforman espacios.
          </p>
          <p class="about__bio">
            <!-- TODO: Add real credentials, formation, and professional background -->
            Arquitectura, tecnología y energía no son servicios separados: son tres formas de entender y mejorar el espacio en que vivimos y trabajamos.
          </p>
          <BaseButton to="/estudio" variant="ghost">
            Conocer el estudio →
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  border-top: 1px solid var(--color-border);
}

.about__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .about__grid {
    grid-template-columns: 1fr 2fr;
  }
}

.about__image-wrap {
  width: 100%;
}

.about__image-placeholder {
  aspect-ratio: 3 / 4;
  background-color: var(--color-surface);
  width: 100%;
  max-width: 20rem;
}

@media (min-width: 1024px) {
  .about__image-placeholder {
    max-width: 100%;
  }
}

.about__eyebrow {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 0.75rem;
}

.about__title {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}

.about__bio {
  font-size: 0.9375rem;
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 40rem;
  margin-bottom: 1rem;
}
</style>
