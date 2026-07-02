<template>
  <div class="layout">
    <SiteHeader />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

main {
  flex: 1;
}
</style>
