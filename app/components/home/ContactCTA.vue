<template>
  <section class="contact-cta section section--dark" aria-labelledby="contact-cta-heading">
    <div class="container">
      <div class="contact-cta__inner">
        <h2 id="contact-cta-heading" class="contact-cta__title">
          Hablemos de tu proyecto.
        </h2>
        <BaseButton to="/contacto" variant="secondary-light">Contactar</BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-cta__inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.contact-cta__title {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
}
</style>
