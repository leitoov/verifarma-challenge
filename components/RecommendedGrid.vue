<script setup lang="ts">
// Componente de recomendados: muestra una grilla de peliculas sugeridas.
// Por defecto busca "Disney" y muestra 4 resultados con imagen.

import { useOmdbClient } from '@/services/omdbClient' // Servicio para consumir la API de OMDB
import type { MovieSummary } from '@/types/movies' // Tipo para las peliculas

const props = withDefaults(defineProps<{
  query?: string
  limit?: number
  title?: string
}>(), {
  query: 'Disney',
  limit: 4,
  title: 'Para empezar',
})

const { searchByTitle } = useOmdbClient() // Extraemos la funcion para buscar por titulo

const loading = ref(false)
const error = ref<string | null>(null)
const items = ref<MovieSummary[]>([])

// Cargamos las sugerencias al montar el componente
onMounted(async () => {
  loading.value = true
  error.value = null
  try {
    //Realizamos la busqueda por titulo y limitamos los resultados y filtramos con poster
    const r = await searchByTitle(props.query, 1)
    items.value = (r.Response === 'True' && r.Search)
      ? r.Search.filter(m => m.Poster && m.Poster !== 'N/A').slice(0, props.limit)
      : []
  } catch (e: any) {
    error.value = e?.message || 'Error cargando sugerencias'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">{{ props.title }}</h2>
    <p v-if="loading" aria-live="polite">Cargando sugerencias…</p>
    <p v-else-if="error" class="text-red-400" aria-live="polite">{{ error }}</p>

    <ul v-else class="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      <!-- Mostramos las peliculas cargadas -->
      <MovieCard v-for="m in items" :key="m.imdbID" :movie="m" />
    </ul>
  </div>
</template>

