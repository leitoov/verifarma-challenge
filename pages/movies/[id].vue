<script setup lang="ts">
import { useOmdbClient } from '@/services/omdbClient' // Servicio para consumir la API de OMDB
import type { MovieDetail } from '@/types/movies' // Tipo para el detalle de pelicula

const route = useRoute()

const { getById } = useOmdbClient()  // Extraemos la funcion para buscar por ID

const loading = ref(false)
const error = ref<string | null>(null)
const movie = ref<MovieDetail | null>(null) //Tipamos el detalle de pelicula

// Funcion para cargar el detalle de la pelicula
async function load() {
  // Validamos que el ID venga en la ruta
  const id = String(route.params.id || '')
  if (!id) { error.value = 'Tuvimos problemas al cargar el detalle de tu pelicula.'; return } // si no hay id, error.
  loading.value = true
  error.value = null
  movie.value = null
  try {
    // Hacemos la consulta por ID
    const data = await getById(id)
    // Si la respuesta es negativa, mostramos un error
    if ((data as any)?.Response === 'False') {
      throw new Error((data as any).Error || 'No encontrado')
    }
    //si esta todo ok, asignamos el detalle a movie
    movie.value = data
  } catch (e: any) {
    error.value = e?.message || 'No se pudo cargar el detalle'
  } finally {
    loading.value = false
  }
}

// Cargamos al montar el componente
onMounted(load)

// El watch recarga si cambia el ID en la URL
watch(() => route.params.id, () => load())

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
    <div v-else-if="error" class="mt-6 text-red-400">{{ error }}</div>

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
