<script setup lang="ts">
import { useOmdbClient } from '@/services/omdbClient' // Servicio para consumir la API de OMDB
import type { MovieSummary } from '@/types/movies' // Tipo para las peliculas

const { searchByTitle } = useOmdbClient() // Extraemos la funcion para buscar por titulo

// Estado de busqueda
const loading = ref(false)
const error = ref<string | null>(null)
const results = ref<MovieSummary[]>([]) //Tipamos el array de resultados
const hasSearched = ref(false) //Parametro para identificar si es primera busqueda o no
const q = ref('')

async function fetchNow() {
  const term = q.value.trim()
  if (!term) return

  loading.value = true
  error.value = null
  results.value = []

  try {
    //Realizamos la busqueda
    const r = await searchByTitle(term, 1)
    //Si hay resultados los asignamos a results
    results.value = (r.Response === 'True' && r.Search) ? r.Search : []
  } catch (err: any) {
    //si hay error lo asignamos a error
    error.value = err?.message || 'Error en la busqueda'
  } finally {
    // si finalizo la busqueda se indica que ya se hizo una busqueda
    hasSearched.value = true
    loading.value = false
  }
}
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-3">Peliculas</h1>
    <!-- ejecutamos fetchNow para realizar la busqueda -->
    <form @submit.prevent="fetchNow" class="flex gap-2 items-end pb-6" aria-label="Buscar peliculas">
      <div class="flex-1">
        <BaseInput
          id="q"
          v-model="q"
          label="Buscá en nuestro catálogo"
          placeholder="Buscar por título"
        />
      </div>
      <BaseButton type="submit">
        Buscar
      </BaseButton>
    </form>

    <p v-if="loading" class="mt-4" aria-live="polite">Cargando...</p>

    <p v-else-if="error" class="mt-4 text-red-400" aria-live="polite">{{ error }}</p>

    <!-- Al menos una busqueda sin resultado -->
    <div v-if="hasSearched && results.length === 0" class="mt-6 p-6 rounded border border-white/10 bg-white/5">
      <h2 class="font-semibold mb-1">No encontramos coincidencias</h2>
      <p class="text-white/80 text-sm">Proba con otro titulo.</p>
    </div>

    <!-- componente de recomendados (sin busqueda inicial o sin resultado) -->
    <div v-if="!hasSearched || results.length === 0" class="mt-10">
      <RecommendedGrid
        title="Recomendados"
        query="Disney"
        :limit="4"
      />
    </div>

    <!-- Resultados de la busqueda -->
    <ul v-if="results.length > 0" class="grid gap-3 sm:grid-cols-2 md:grid-cols-4 mt-4">
      <MovieCard v-for="m in results" :key="m.imdbID" :movie="m" />
    </ul>
  </section>
</template>
