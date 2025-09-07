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

 // Usamos useAsyncData para cargar datos de manera asyncrona y manejar estados de carga y error
const { data, pending: loading, error } = await useAsyncData<MovieSummary[]>(
  () => `recommended-${props.query}-${props.limit}`,
  async () => {
    const r = await searchByTitle(props.query, 1) // buscamos por el termino definido en props.query
    return (r.Response === 'True' && r.Search)
      ? r.Search.filter(m => m.Poster && m.Poster !== 'N/A').slice(0, props.limit) // filtramos para solo incluir peliculas con poster y limitamos por props.limit
      : []
  },
)

const items = computed(() => data.value || []) // utilizamos computed para manejar los items cargados
</script>

<template>
  <div>
    <h2 class="text-lg font-semibold mb-2">{{ props.title }}</h2>
    <p v-if="loading" aria-live="polite">Cargando sugerencias…</p>
    <p v-else-if="error" class="text-red-400" aria-live="polite">{{ (error as any)?.message || error }}</p>

    <ul v-else class="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      <!-- Mostramos las peliculas cargadas -->
      <MovieCard v-for="m in items" :key="m.imdbID" :movie="m" />
    </ul>
  </div>
</template>
