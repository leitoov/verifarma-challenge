<script setup lang="ts">
import type { MovieSummary } from '@/types/movies' // Tipo para las peliculas

const props = defineProps<{ movie: MovieSummary }>() // Recibimos la pelicula como prop
</script>

<template>
  <li class="p-3 rounded bg-white/5 border border-white/10">
    <!-- Enlazamos a la pagina de detalle de la pelicula -->
    <NuxtLink :to="`/movies/${props.movie.imdbID}`" class="block group">
      <div class="aspect-[2/3] bg-white/5 rounded overflow-hidden mb-2 flex items-center justify-center">
        <img
          v-if="props.movie.Poster && props.movie.Poster !== 'N/A'"
          :src="props.movie.Poster"
          :alt="`${props.movie.Title} poster`"
          class="w-full h-full object-cover group-hover:opacity-95"
          loading="lazy"
        />
        <span v-else class="text-white/50 text-sm">Sin Imagen</span>
      </div>
      <!-- Titulo y año -->
      <div class="font-medium group-hover:underline">
        {{ props.movie.Title }} ({{ props.movie.Year }})
      </div>
    </NuxtLink>
  </li>
  
</template>

