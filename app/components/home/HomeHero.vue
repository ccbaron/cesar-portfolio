<template>
  <section class="hero section section--dark" aria-labelledby="hero-heading">
    <!--
      Background: dark gradient standing in for real project photography.
      Swap `.hero__media` background-image for an actual photo (drone/site shot)
      once available — the scrim layer should be kept for text contrast.
    -->
    <div class="hero__media" aria-hidden="true">
      <div class="hero__scrim" />
    </div>

    <!-- Geometric accents: registration-style corner marks + a partial circle,
         referencing surveying/technical-drawing precision. Static, no motion. -->
    <div class="hero__lines" aria-hidden="true">
      <span class="hero__corner hero__corner--tl" />
      <span class="hero__corner hero__corner--br" />
      <svg class="hero__circle" viewBox="0 0 400 400" fill="none">
        <circle cx="200" cy="200" r="199" stroke="currentColor" stroke-width="1" />
      </svg>
    </div>

    <div class="container hero__container">
      <p class="hero__eyebrow">
        <span class="hero__eyebrow-dot" aria-hidden="true" />
        César Barón — Arquitectura &amp; Ingeniería
      </p>

      <h1 id="hero-heading" class="hero__title">
        Diseñamos espacios.<br>Proyectamos futuro.
      </h1>

      <p class="hero__body">
        Arquitectura, tecnología y soluciones de energía solar para transformar ideas en proyectos reales.
      </p>

      <div class="hero__cta">
        <BaseButton to="/proyectos" variant="primary-light">Ver proyectos</BaseButton>
        <BaseButton to="/contacto" variant="secondary-light">Hablemos de tu proyecto</BaseButton>
      </div>
    </div>

    <div class="hero__scroll-cue" aria-hidden="true">
      <span class="hero__scroll-line" />
      <span class="hero__scroll-label">Scroll</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100dvh - 4.5rem);
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* Background media */
.hero__media {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 75% 20%, rgba(120, 130, 110, 0.35), transparent 55%),
    radial-gradient(ellipse at 20% 85%, rgba(60, 65, 55, 0.4), transparent 60%),
    linear-gradient(160deg, #1c1f1a 0%, #111211 55%, #0b0b0a 100%);
}

.hero__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.1) 45%, rgba(0, 0, 0, 0.25) 100%);
}

/* Geometric line accents */
.hero__lines {
  position: absolute;
  inset: 0;
  color: var(--color-dark-foreground);
  pointer-events: none;
}

.hero__corner {
  position: absolute;
  width: 1.75rem;
  height: 1.75rem;
  opacity: 0.4;
}

.hero__corner::before,
.hero__corner::after {
  content: '';
  position: absolute;
  background: currentColor;
}

.hero__corner::before {
  width: 100%;
  height: 1px;
}

.hero__corner::after {
  width: 1px;
  height: 100%;
}

.hero__corner--tl {
  top: 2rem;
  left: var(--page-padding-x);
}

.hero__corner--tl::before {
  top: 0;
  left: 0;
}

.hero__corner--tl::after {
  top: 0;
  left: 0;
}

.hero__corner--br {
  bottom: 4.5rem;
  right: var(--page-padding-x);
}

.hero__corner--br::before {
  bottom: 0;
  right: 0;
}

.hero__corner--br::after {
  bottom: 0;
  right: 0;
}

.hero__circle {
  position: absolute;
  top: 50%;
  right: -8rem;
  width: 24rem;
  height: 24rem;
  transform: translateY(-50%);
  opacity: 0.18;
}

@media (max-width: 1023px) {
  .hero__circle {
    right: -12rem;
    width: 18rem;
    height: 18rem;
  }
}

/* Content */
.hero__container {
  position: relative;
  z-index: 1;
}

.hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-dark-muted);
  margin-bottom: 1.5rem;
}

.hero__eyebrow-dot {
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background-color: #8fae7a;
}

.hero__title {
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--color-dark-foreground);
  margin-bottom: 1.5rem;
  max-width: 40rem;
}

.hero__body {
  font-size: 1.0625rem;
  color: var(--color-dark-muted);
  line-height: 1.7;
  max-width: 32rem;
  margin-bottom: 2.5rem;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Scroll cue — single restrained motion element */
.hero__scroll-cue {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  z-index: 1;
}

.hero__scroll-line {
  position: relative;
  width: 1px;
  height: 2.5rem;
  background-color: rgba(245, 245, 242, 0.25);
  overflow: hidden;
}

.hero__scroll-line::after {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-dark-foreground);
  animation: scroll-cue 1.8s ease-in-out infinite;
}

.hero__scroll-label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--color-dark-muted);
}

@keyframes scroll-cue {
  0% {
    top: -100%;
  }
  50% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll-line::after {
    animation: none;
    top: 0;
  }
}

@media (max-width: 767px) {
  .hero__scroll-cue {
    display: none;
  }
}
</style>
