<script setup lang="ts"></script>

<template>
  <!-- Pantalla por defecto: header, footer y slot para el contenido -->
  <div class="min-h-screen text-white bg-background flex flex-col">
    <a href="#main" class="skip-link">Saltar al contenido</a>
    <AppHeader />
    <main id="main" class="md:container md:mx-auto flex-grow px-4">
      <slot />
    </main>
    <AppFooter />
  </div>
  
</template>
