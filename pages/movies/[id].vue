<script setup lang="ts">
import { useOmdbClient } from '@/services/omdbClient' // Servicio para consumir la API de OMDB
import type { MovieDetail } from '@/types/movies' // Tipo para el detalle de pelicula

const route = useRoute()

const { getById } = useOmdbClient()  // Extraemos la funcion para buscar por ID

// usamos useAsyncData para cargar el detalle en servidor cuando sea posible
const { data: movie, pending: loading, error } = await useAsyncData<MovieDetail | null>(
  () => `movie-${String(route.params.id || '')}`,
  async () => {
    const id = String(route.params.id || '')
    if (!id) throw new Error('Tuvimos problemas al cargar el detalle de tu pelicula.')
    const data = await getById(id)
    if ((data as any)?.Response === 'False') {
      throw new Error((data as any).Error || 'No encontrado')
    }
    return data
  },
  { watch: [() => route.params.id] },
)

// Cambiamos el titulo de la pagina segun la pelicula cargada utilizando useHead
useHead(() => ({
  title: movie.value ? `${movie.value.Title} (${movie.value.Year}) – Verifarma Movies` : 'Detalle – Verifarma Movies',
}))
</script>

<template>
  <section class="p-4 max-w-5xl mx-auto">
    <div class="flex items-center gap-3">
      <!-- Boton para volver a movies -->
      <NuxtLink to="/movies" class="text-sm opacity-80 hover:underline">
        <div class="material-symbols-outlined align-middle" aria-hidden="true">arrow_back</div>
        Volver
      </NuxtLink>
    </div>

    <div v-if="loading" class="mt-6">Cargando…</div>
    <div v-else-if="error" class="mt-6 text-red-400">{{ (error as any)?.message || error }}</div>

    <!-- Mostramos el detalle si tenemos movie -->
    <article v-else-if="movie" class="mt-6 grid gap-6 md:grid-cols-[220px,1fr]">
      <!-- Poster de la pelicula -->
      <img :src="movie.Poster" :alt="movie.Title" class="rounded-lg shadow-md" />
      <div>
        <!-- Titulo y año -->
        <h1 class="text-3xl font-bold"> 
          {{ movie.Title }} <span class="opacity-70">({{ movie.Year }})</span>
        </h1>
        <!-- Sinopsis -->
        <p class="mt-2 opacity-80">{{ movie.Plot }}</p>

        <!-- Datos adicionales  (genero, director, premios y valoracion)-->
        <ul class="mt-3 space-y-1 text-sm">
          <li v-if="movie.Genre"><strong>Género:</strong> {{ movie.Genre }}</li>
          <li v-if="movie.Director"><strong>Director:</strong> {{ movie.Director }}</li>
          <li v-if="movie.Awards"><strong>Premios:</strong> {{ movie.Awards }}</li>
          <li v-if="movie.imdbRating">
            <strong>IMDb:</strong> {{ movie.imdbRating }}
            <span v-if="movie.imdbVotes"> • {{ movie.imdbVotes }} votos</span>
          </li>
        </ul>
        
        <!-- Valoraciones adicionales si las hay -->
        <details v-if="movie.Ratings?.length" class="mt-3">
          <summary class="cursor-pointer">Reseñas</summary>
          <ul class="list-disc ml-6">
            <li v-for="r in movie.Ratings" :key="r.Source">{{ r.Source }} — {{ r.Value }}</li>
          </ul>
        </details>
      </div>
    </article>
  </section>
</template>
