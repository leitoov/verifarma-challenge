<script setup lang="ts">
import { useOmdbClient } from '@/services/omdbClient' // Servicio para consumir la API de OMDB para previsualizacion
import type { MovieSummary } from '@/types/movies' // Tipo para las peliculas en previsualizacion

const { searchByTitle } = useOmdbClient() // Extraemos la funcion para buscar pelicula por titulo en previsualizacion
const { isAuthenticated } = useAuth() // Composables de autenticacion

// Traer resultados para previsualizacion 
const consulta = 'netflix'

// Usamos useAsyncData para cargar datos de manera asyncrona y manejar estados de carga y error
// asignamos preview con data, previewCargando con pending y previewError con error
const { data: preview, pending: previewCargando, error: previewError } =
  await useAsyncData<MovieSummary[]>('homePreview', async () => {
    try {
      const r = await searchByTitle(consulta, 1) // Buscamos por el termino definido en consulta "netflix"
      if (r.Response !== 'True' || !r.Search) return [] // si hay no hay resultado devolvemos array vacio
      return r.Search // sino, retornamos los resultados con un filtro para solo incluir peliculas con poster
        .filter(m => m.Poster && m.Poster !== 'N/A')
        .slice(0, 6) // primeros 6
    } catch {
      return []
    }
})
</script>

<template>
  <section class="py-16">
    <div class="content-container grid md:grid-cols-2 gap-10 items-center">
      <div>
        <h1 class="text-3xl sm:text-4xl font-bold mb-4">
          Todo sobre tus películas favoritas en un solo lugar
        </h1>
        <p class="text-white/80">
          Explorá fichas completas, calificaciones y detalles. Accedé a una experiencia simple y rápida.
        </p>
        <ul class="mt-6 space-y-3 text-white/90">
          <li class="flex items-start gap-2">
            <span class="material-symbols-outlined text-primary-400" aria-hidden="true">search</span>
            <span><strong>Búsqueda instantánea</strong> por título.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="material-symbols-outlined text-primary-400" aria-hidden="true">movie</span>
            <span><strong>Detalles completos</strong> de cada película.</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="material-symbols-outlined text-primary-400" aria-hidden="true">favorite</span>
            <span><strong>Experiencia enfocada</strong> y accesible.</span>
          </li>
        </ul>
      </div>
      <!-- Vista previa de peliculas -->
      <div class="rounded-xl border border-white/10 bg-white/5 p-6">
        <!-- Si tiene preview y tiene elementos recorre data que esta en preview y muestra poster y titulo -->
        <div v-if="preview && preview.length" class="grid grid-cols-3 gap-3">
          <div v-for="m in preview" :key="m.imdbID" class="rounded overflow-hidden aspect-[2/3] bg-white/5">
            <img :src="m.Poster" :alt="`${m.Title} poster`" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
        <!-- Sino muestra placeholders de carga -->
        <div v-else class="grid grid-cols-3 gap-3">
          <div v-for="i in 6" :key="i" class="rounded bg-white/5 aspect-[2/3] animate-pulse" />
        </div>
        <p class="mt-4 text-sm text-white/70 text-center">
          {{ previewCargando ? 'Cargando vista previa…': 'Inicia sesion y enterate de todo el contenido exclusivo' }}
        </p>
        <p v-if="previewError" class="mt-1 text-xs text-red-400">No se pudo cargar la vista previa.</p>
      </div>

      <!-- login solo visible en mobile y cuando no está autenticado -->
      <div class="sm:hidden mt-4">
        <BaseButton v-if="!isAuthenticated" as="a" href="/login" class="w-full">
          <span class="material-symbols-outlined" aria-hidden="true">login</span>
          Iniciar sesión
        </BaseButton>
      </div>
    </div>
  </section>
</template>
