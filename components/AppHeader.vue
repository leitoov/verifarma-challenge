<script setup lang="ts">
const { isAuthenticated, logout } = useAuth() // Extraemos isAuthenticated y logout de useAuth

// funcion para cerrar sesion y redirigir a login
function onLogout() {
  logout()
  navigateTo('/login')
}
</script>

<template>
  <header class="border-b border-white/10">
    <div class="md:container md:mx-auto flex items-center gap-4 py-3 px-4 md:px-0">
      <!-- Utilizamos NuxtLink para navegar a la pagina principal -->
      <NuxtLink to="/movies" class="font-semibold tracking-wide flex items-center gap-2">
        <img
          src="https://www.verifarma.com/wp-content/uploads/2020/09/icon-verifarma-1.svg"
          alt="Logo Verifarma"
          class="h-8 w-auto"
        />
      </NuxtLink>
      <div class="ml-auto flex items-center gap-2">
        <!-- Mostrar boton de iniciar sesion en desktop/tablet; oculto en mobile -->
        <BaseButton v-if="!isAuthenticated" as="a" href="/login" class="hidden sm:inline-flex">
          <span class="material-symbols-outlined" aria-hidden="true">login</span>
          Iniciar sesión
        </BaseButton>
        <!-- Mostrar boton de cerrar sesion si el usuario esta logueado -->
        <BaseButton v-else variant="danger" @click="onLogout">
          <span class="material-symbols-outlined" aria-hidden="true">logout</span>
          Salir
        </BaseButton>
      </div>
    </div>
  </header>
</template>

