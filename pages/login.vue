<script setup lang="ts">
const { login, isAuthenticated } = useAuth() // Extraemos login e isAuthenticated del composable useAuth

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)
const errorId = 'login-error'

async function onSubmit() {
  error.value = null
  //Validamos que haya email y contraseña
  if (!email.value || !password.value) {
    error.value = 'Completá tu email y contraseña'
    return
  }
  loading.value = true
  try {
    //hace el login y nos redirige a movies
    await login(email.value, password.value)
    await navigateTo('/movies')
  } catch (e: any) {
    error.value = e?.data?.message || e?.message || 'Error de login' //en caso de fallar
  } finally {
    loading.value = false
  }
}

if (isAuthenticated.value) {
  //Si ya esta logueado nos lleva a movies
  navigateTo('/movies')
}
</script>

<template>
  <main class="py-10">
    <section class="max-w-md mx-auto bg-white/5 border border-white/10 rounded-lg p-6 shadow">
      <h1 class="text-2xl font-semibold mb-4">Ingresar</h1>
      <form @submit.prevent="onSubmit" class="grid gap-4" novalidate>
        <BaseInput
          id="email"
          v-model="email"
          type="email"
          label="Email"
          placeholder="leonel@gmail.com"
          required
        />
        <BaseInput
          id="password"
          v-model="password"
          type="password"
          label="Contraseña"
          placeholder="••••••••"
          required
        />
        <BaseButton type="submit" :disabled="loading" class="mt-2">
          {{ loading ? 'Ingresando…' : 'Entrar' }}
        </BaseButton>
        <p v-if="error" :id="errorId" class="text-red-400 text-sm text-center" aria-live="polite">{{ error }}</p>
      </form>
    </section>
  </main>
</template>
