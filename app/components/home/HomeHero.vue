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

    <!-- Decorative geometry: a large-scale golden-ratio / Fibonacci
         construction bleeding off the right edge of the hero, plus a few
         faint full-bleed drafting guide lines, evoking architectural
         construction lines rather than a standalone diagram. Registration
         corner marks (technical-drawing crop marks) complete the set. A
         soft bright segment travels slowly along the spiral and the corner
         paths, like a pen tracing linework — the only motion cue, kept
         quiet so it never competes with the content. -->
    <div class="hero__lines" aria-hidden="true">
      <svg class="hero__corner hero__corner--tl" viewBox="0 0 28 28" fill="none">
        <path d="M28 0H0V28" stroke="currentColor" stroke-width="1" opacity="0.25" />
        <path class="hero__corner-travel" d="M28 0H0V28" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
      <svg class="hero__corner hero__corner--br" viewBox="0 0 28 28" fill="none">
        <path d="M0 28H28V0" stroke="currentColor" stroke-width="1" opacity="0.25" />
        <path class="hero__corner-travel" d="M0 28H28V0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>

      <!-- Faint full-bleed drafting guides: two golden-section verticals,
           one golden-section horizontal, one soft diagonal — background
           structure spanning the whole hero, independent of the box below. -->
      <svg class="hero__grid" viewBox="0 0 1600 900" preserveAspectRatio="none">
        <line x1="989" y1="0" x2="989" y2="900" />
        <line x1="611" y1="0" x2="611" y2="900" />
        <line x1="0" y1="344" x2="1600" y2="344" />
        <line class="hero__grid-diagonal" x1="240" y1="900" x2="1200" y2="0" />
      </svg>

      <!--
        Golden-ratio (whirling-squares) construction, viewBox units, φ ≈ 1.618.
        Squares of side s1..s7, each ≈ previous / φ (s1=200, s2=123.6068,
        s3=76.3932, s4=47.2136, s5=29.1796, s6=18.034, s7=11.1456 — note
        s_n = s_(n+1) + s_(n+2), the defining Fibonacci-style property).
        The spiral is ONE continuous path of 7 quarter-circle arcs, each
        centred on a corner of its square that lies on the shared edge with
        the previous square — this is what guarantees every arc is exactly
        tangent (C¹-continuous) to the next at their shared point, so the
        curve is mathematically smooth with no kinks. The circle
        circumscribes the largest square (s1), tying it into the same
        system as the construction's anchor shape.
      -->
      <svg class="hero__geometry" viewBox="0 0 324 200" fill="none">
        <defs>
          <path
            id="hero-fib-spiral"
            d="M323.6068 0
               A200 200 0 0 1 123.6068 200
               A123.6068 123.6068 0 0 1 0 76.3932
               A76.3932 76.3932 0 0 1 76.3932 0
               A47.2136 47.2136 0 0 1 123.6068 47.2136
               A29.1796 29.1796 0 0 1 94.4272 76.3932
               A18.034 18.034 0 0 1 76.3932 58.3592
               A11.1456 11.1456 0 0 1 87.5388 47.2136"
          />
          <!--
            Clearance mask: keeps the background (guide rectangles + circle)
            visible everywhere except in a channel following the spiral's
            exact path, slightly wider than its stroke. This is what
            guarantees the square/guide lines can never cover, clip, or eat
            into the spiral at the points where it is tangent to them — a
            precise, deliberate layering technique, not a visual patch.
          -->
          <mask id="hero-fib-declutter" maskUnits="userSpaceOnUse" x="-150" y="-150" width="650" height="500">
            <rect x="-150" y="-150" width="650" height="500" fill="#fff" />
            <use href="#hero-fib-spiral" stroke="#000" stroke-width="2.5" fill="none" stroke-linecap="round" />
          </mask>
        </defs>

        <circle class="hero__geo-circle" cx="223.6068" cy="100" r="141.4214" stroke="currentColor" mask="url(#hero-fib-declutter)" />

        <g class="hero__geo-detail" stroke="currentColor" mask="url(#hero-fib-declutter)">
          <!-- nested Fibonacci squares (s1–s4) -->
          <rect x="123.6068" y="0" width="200" height="200" />
          <rect x="0" y="76.3932" width="123.6068" height="123.6068" />
          <rect x="0" y="0" width="76.3932" height="76.3932" />
          <rect x="76.3932" y="0" width="47.2136" height="47.2136" />
          <!-- construction lines, extended further toward the hero centre -->
          <line x1="123.6068" y1="-40" x2="123.6068" y2="240" />
          <line x1="-40" y1="76.3932" x2="364" y2="76.3932" />
          <!-- proportion triangle, inscribed in the smallest guide square -->
          <path d="M76.3932 47.2136L123.6068 47.2136L123.6068 0Z" />
        </g>

        <use href="#hero-fib-spiral" class="hero__geo-spiral-base" stroke="currentColor" />
        <use href="#hero-fib-spiral" class="hero__geo-spiral-travel" stroke="currentColor" />
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
}

.hero__corner--tl {
  top: 2rem;
  left: var(--page-padding-x);
}

.hero__corner--br {
  bottom: 4.5rem;
  right: var(--page-padding-x);
}

/* Bright segment (14 = visible length, 42 = gap) travels the full 56px
   perimeter of each corner path in a continuous, slow loop. */
.hero__corner-travel {
  stroke-dasharray: 14 42;
  animation: corner-travel 5s linear infinite;
}

@keyframes corner-travel {
  to {
    stroke-dashoffset: -56;
  }
}

.hero__geometry {
  position: absolute;
  top: 50%;
  right: -15rem;
  width: 50rem;
  aspect-ratio: 324 / 200;
  transform: translateY(-50%);
}

/* Full-bleed faint drafting guides, independent of the Fibonacci box. */
.hero__grid {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.hero__grid line {
  stroke: currentColor;
  stroke-width: 1;
  opacity: 0.06;
  vector-effect: non-scaling-stroke;
}

/* Circle circumscribing the largest square — a faint construction guide,
   kept subordinate to the spiral. Its circumference passes exactly through
   the square's corners (by construction), which is expected and correct;
   the clearance mask (applied above) keeps the spiral fully intact there. */
.hero__geo-circle {
  fill: none;
  stroke-width: 0.5;
  opacity: 0.08;
  vector-effect: non-scaling-stroke;
}

/* Static construction layer: nested Fibonacci squares, their extended
   guide lines and the proportion triangle — sharp, architectural corners. */
.hero__geo-detail {
  fill: none;
  stroke-width: 0.5;
  opacity: 0.07;
}

.hero__geo-detail rect,
.hero__geo-detail line,
.hero__geo-detail path {
  vector-effect: non-scaling-stroke;
}

/* Base spiral — a faint, continuous thread the highlight follows. Rendered
   last, on top of the circle and squares, with a round cap on its own two
   open ends so the curve's start (exactly at a square's corner) reads as a
   clean, unbroken tip. Kept only slightly more legible than the guide
   lines — still clearly secondary to the hero content. */
.hero__geo-spiral-base {
  fill: none;
  stroke-width: 0.55;
  stroke-linecap: round;
  opacity: 0.16;
  vector-effect: non-scaling-stroke;
}

/* Short, understated bright segment (40 = visible length) travels the
   ≈794.15 unit length of the spiral (sum of its 7 tangent quarter-circle
   arcs) in one slow, continuous 16s loop — no acceleration, no glow. */
.hero__geo-spiral-travel {
  fill: none;
  stroke-width: 0.8;
  stroke-linecap: round;
  stroke-dasharray: 40 754.15;
  vector-effect: non-scaling-stroke;
  animation: geo-spiral-travel 16s linear infinite;
}

@keyframes geo-spiral-travel {
  to {
    stroke-dashoffset: -794.15;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .hero__geometry {
    right: -9rem;
    width: 32rem;
  }

  .hero__grid-diagonal {
    display: none;
  }
}

@media (max-width: 767px) {
  .hero__geometry {
    right: -8rem;
    width: 18rem;
  }

  /* Simplify on mobile: keep only the traveling spiral (and the corner
     marks, handled separately) — drop the grid, rectangles, guides,
     triangle and circle so the geometry doesn't turn into visual noise. */
  .hero__grid,
  .hero__geo-detail,
  .hero__geo-circle {
    display: none;
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

  .hero__corner-travel,
  .hero__geo-spiral-travel {
    animation: none;
  }
}

@media (max-width: 767px) {
  .hero__scroll-cue {
    display: none;
  }
}
</style>
