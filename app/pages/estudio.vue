<script setup lang="ts">
useSeoMeta({
  title: 'Estudio',
  description: 'Conoce el estudio de César Barón: arquitectura, tecnología y energía solar.',
})
</script>

<template>
  <div class="estudio">
    <section class="section" aria-labelledby="estudio-heading">
      <div class="container">
        <div class="estudio__grid">
          <div>
            <p class="estudio__eyebrow" aria-hidden="true">Estudio</p>
            <h1 id="estudio-heading" class="estudio__title">César Barón</h1>
            <p class="estudio__tagline">Arquitectura · Tecnología · Energía</p>

            <div class="estudio__bio">
              <!--
                TODO: Replace the following placeholder paragraphs with real
                biographical information, professional background, formation,
                and credentials provided by César Barón.
              -->
              <p>
                Arquitecto. El estudio nace de la convicción de que arquitectura, tecnología y energía son disciplinas complementarias que permiten abordar los proyectos de forma más completa e informada.
              </p>
              <p>
                El trabajo abarca desde el diseño arquitectónico hasta la documentación técnica del espacio, combinando levantamientos, topografía, tecnología dron y soluciones de energía solar en un único proceso integrado.
              </p>
              <p>
                <em>Información biográfica y formación pendiente de completar.</em>
              </p>
            </div>
          </div>

          <div class="estudio__image-wrap" aria-hidden="true">
            <div class="estudio__image-placeholder" />
          </div>
        </div>
      </div>
    </section>

    <section class="estudio__pillars section" aria-labelledby="pillars-heading">
      <div class="container">
        <h2 id="pillars-heading" class="estudio__pillars-title">Tres pilares</h2>

        <div class="estudio__pillars-grid">
          <div class="estudio__pillar">
            <hr class="divider" >
            <div class="estudio__pillar-inner">
              <span class="estudio__pillar-num" aria-hidden="true">I</span>
              <div>
                <h3 class="estudio__pillar-name">Arquitectura</h3>
                <p class="estudio__pillar-desc">Diseño, proyecto y dirección de obras. El espacio como resultado de rigor técnico y criterio.</p>
              </div>
            </div>
          </div>

          <div class="estudio__pillar">
            <hr class="divider" >
            <div class="estudio__pillar-inner">
              <span class="estudio__pillar-num" aria-hidden="true">II</span>
              <div>
                <h3 class="estudio__pillar-name">Tecnología</h3>
                <p class="estudio__pillar-desc">Topografía, dron, fotogrametría y modelado 3D para capturar y documentar el espacio con precisión antes de intervenir.</p>
              </div>
            </div>
          </div>

          <div class="estudio__pillar">
            <hr class="divider" >
            <div class="estudio__pillar-inner">
              <span class="estudio__pillar-num" aria-hidden="true">III</span>
              <div>
                <h3 class="estudio__pillar-name">Energía</h3>
                <p class="estudio__pillar-desc">Integración de soluciones solares fotovoltaicas como parte del proyecto arquitectónico, no como un complemento.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ContactCTA />
  </div>
</template>

<style scoped>
.estudio__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: start;
}

@media (min-width: 1024px) {
  .estudio__grid {
    grid-template-columns: 3fr 2fr;
  }
}

.estudio__eyebrow {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 0.75rem;
}

.estudio__title {
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
}

.estudio__tagline {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-muted);
  margin-bottom: 2.5rem;
}

.estudio__bio {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 38rem;
}

.estudio__bio p {
  font-size: 1rem;
  color: var(--color-muted);
  line-height: 1.75;
}

.estudio__image-wrap {
  width: 100%;
}

.estudio__image-placeholder {
  aspect-ratio: 3 / 4;
  background-color: var(--color-surface);
  width: 100%;
}

.estudio__pillars-title {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 2rem;
}

.estudio__pillars-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}

@media (min-width: 768px) {
  .estudio__pillars-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.estudio__pillar-inner {
  display: flex;
  gap: 1.5rem;
  padding-block: 2rem;
}

.estudio__pillar-num {
  font-size: 0.75rem;
  color: var(--color-muted);
  letter-spacing: 0.05em;
  flex-shrink: 0;
  padding-top: 0.25rem;
}

.estudio__pillar-name {
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}

.estudio__pillar-desc {
  font-size: 0.875rem;
  color: var(--color-muted);
  line-height: 1.65;
}
</style>
