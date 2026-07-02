<script setup lang="ts">
useSeoMeta({
  title: 'Política de Privacidad',
  description: 'Política de privacidad y protección de datos personales de César Barón.',
})
</script>

<template>
  <main class="privacidad section">
    <div class="container">
      <div class="privacidad__header">
        <p class="privacidad__eyebrow" aria-hidden="true">Legal</p>
        <h1 class="privacidad__title">Política de privacidad</h1>
        <p class="privacidad__updated">
          <!-- TODO: Update with actual effective date before launch -->
          Última actualización: <time datetime="2025-01-01">enero 2025</time>
        </p>
      </div>

      <!-- ⚠️ TODO: Replace all placeholder sections below with real legal text
           reviewed by a legal professional before the site goes live.
           The content below is a structural placeholder only. -->

      <div class="privacidad__body">
        <section class="privacidad__section" aria-labelledby="priv-responsable">
          <h2 id="priv-responsable" class="privacidad__heading">1. Responsable del tratamiento</h2>
          <p>
            <!-- TODO: Fill in legal name, address, tax ID and contact email -->
            <strong>Nombre / Razón social:</strong> [PENDIENTE — nombre completo o razón social]<br>
            <strong>NIT / Identificación:</strong> [PENDIENTE]<br>
            <strong>Dirección:</strong> [PENDIENTE]<br>
            <strong>Correo electrónico:</strong> [PENDIENTE — correo de contacto oficial]
          </p>
        </section>

        <section class="privacidad__section" aria-labelledby="priv-datos">
          <h2 id="priv-datos" class="privacidad__heading">2. Datos que recopilamos</h2>
          <p>A través del formulario de contacto recopilamos la siguiente información:</p>
          <ul>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Número de teléfono (opcional)</li>
            <li>Tipo de proyecto</li>
            <li>Ciudad o municipio (opcional)</li>
            <li>Descripción del proyecto</li>
          </ul>
          <p>
            También recopilamos de forma automática datos técnicos de navegación (dirección IP anonimizada,
            parámetros UTM de campaña, URL de la página y referidor). Esta información se utiliza
            exclusivamente para mejorar la comunicación y analizar el origen del contacto.
          </p>
        </section>

        <section class="privacidad__section" aria-labelledby="priv-finalidad">
          <h2 id="priv-finalidad" class="privacidad__heading">3. Finalidad del tratamiento</h2>
          <p>Los datos recogidos se utilizan únicamente para:</p>
          <ul>
            <li>Atender tu consulta o solicitud de presupuesto.</li>
            <li>Mantener comunicación contigo durante el desarrollo del proyecto.</li>
            <li><!-- TODO: Añadir otras finalidades si aplica --></li>
          </ul>
          <p>No se realizan comunicaciones comerciales sin consentimiento previo.</p>
        </section>

        <section class="privacidad__section" aria-labelledby="priv-base">
          <h2 id="priv-base" class="privacidad__heading">4. Base legal</h2>
          <p>
            <!-- TODO: Ajustar según la legislación aplicable (GDPR, Ley 1581 de 2012 Colombia, etc.) -->
            El tratamiento se basa en el consentimiento expreso del interesado, otorgado al marcar la casilla
            de aceptación al enviar el formulario de contacto.
          </p>
        </section>

        <section class="privacidad__section" aria-labelledby="priv-conservacion">
          <h2 id="priv-conservacion" class="privacidad__heading">5. Conservación de los datos</h2>
          <p>
            <!-- TODO: Define actual retention period -->
            Los datos se conservarán durante el tiempo necesario para atender la solicitud y, posteriormente,
            durante el plazo legalmente exigido. [PENDIENTE — definir plazo concreto]
          </p>
        </section>

        <section class="privacidad__section" aria-labelledby="priv-destinatarios">
          <h2 id="priv-destinatarios" class="privacidad__heading">6. Destinatarios</h2>
          <p>
            Los datos no se ceden a terceros salvo obligación legal. Los datos son procesados por los
            siguientes proveedores de servicios técnicos, con las garantías adecuadas:
          </p>
          <ul>
            <li>Infraestructura de alojamiento: [PENDIENTE — proveedor de hosting]</li>
            <li>Base de datos: MongoDB Atlas (EE.UU.) — sujeto a cláusulas contractuales estándar.</li>
            <li>Notificaciones internas: Telegram API.</li>
            <li>Verificación antispam: Cloudflare Turnstile.</li>
          </ul>
        </section>

        <section class="privacidad__section" aria-labelledby="priv-derechos">
          <h2 id="priv-derechos" class="privacidad__heading">7. Tus derechos</h2>
          <p>Tienes derecho a:</p>
          <ul>
            <li>Acceder a tus datos personales.</li>
            <li>Solicitar la rectificación de datos inexactos.</li>
            <li>Solicitar la supresión de tus datos.</li>
            <li>Oponerte al tratamiento.</li>
            <li>Solicitar la portabilidad de tus datos.</li>
          </ul>
          <p>
            Para ejercer estos derechos, envía un correo a
            <!-- TODO: Replace with real contact email -->
            <a href="mailto:[PENDIENTE]">[PENDIENTE — correo de contacto]</a>.
          </p>
        </section>

        <section class="privacidad__section" aria-labelledby="priv-cambios">
          <h2 id="priv-cambios" class="privacidad__heading">8. Cambios en esta política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta política de privacidad. Te notificaremos cualquier
            cambio relevante a través de esta página. Te recomendamos revisarla periódicamente.
          </p>
        </section>
      </div>

      <div class="privacidad__back">
        <NuxtLink to="/" class="privacidad__back-link">← Volver al inicio</NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.privacidad {
  padding-block: var(--section-spacing);
}

.privacidad__header {
  max-width: 42rem;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.privacidad__eyebrow {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.privacidad__title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 0.75rem;
}

.privacidad__updated {
  font-size: 0.8125rem;
  color: var(--color-muted);
}

.privacidad__body {
  max-width: 48rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.privacidad__section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.privacidad__heading {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.privacidad__body p,
.privacidad__body li {
  font-size: 0.9375rem;
  color: var(--color-muted);
  line-height: 1.7;
}

.privacidad__body ul {
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.privacidad__body a {
  color: var(--color-foreground);
  text-underline-offset: 2px;
}

.privacidad__back {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-border);
}

.privacidad__back-link {
  font-size: 0.8125rem;
  color: var(--color-muted);
  text-decoration: none;
  text-underline-offset: 2px;
  transition: color 0.15s ease;
}

.privacidad__back-link:hover {
  color: var(--color-foreground);
  text-decoration: underline;
}
</style>
