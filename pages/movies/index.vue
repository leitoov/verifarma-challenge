<script setup lang="ts">
import { useOmdbClient } from '@/services/omdbClient'
import type { MovieSummary } from '@/types/movies'

const route = useRoute()
const router = useRouter()
const { searchByTitle } = useOmdbClient()

// Query y pagina desde la URL (para permitir paginacion SSR)
const q = ref<string>(String(route.query.q || ''))
const page = computed(() => {
  const p = Number(route.query.page || 1)
  return Number.isFinite(p) && p > 0 ? Math.floor(p) : 1
})
const hasSearched = computed(() => q.value.trim().length > 0)

// Buscar al enviar: actualiza la URL y resuelve SSR/CSR
function doSearch() {
  const term = q.value.trim()
  if (!term) return
  router.push({ path: route.path, query: { q: term, page: 1 } })
}

type MoviesPage = { items: MovieSummary[]; total: number }

// usamos useAsyncData con clave y watch sobre q y page
const { data, pending: loading, error } = await useAsyncData<MoviesPage>(
  () => `movies-${q.value}-${page.value}`,
  async () => {
    const term = q.value.trim()
    if (!term) return { items: [], total: 0 } // sin terminos no hay busqueda
    const r = await searchByTitle(term, page.value) // buscamos por el termino y pagina actual
    if (r.Response === 'True' && r.Search) {
      const total = Number(r.totalResults || 0) || 0
      return { items: r.Search, total }
    }
    // Sin resultados no es error: devolvemos vacio
    return { items: [], total: 0 }
  },
  { watch: [q, page] },
)

const results = computed(() => data.value?.items ?? [])
const total = computed(() => data.value?.total ?? 0) // total de resultados
const pageSize = 10
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize))) // al menos 1 pagina
</script>

<template>
  <section>
    <h1 class="text-2xl font-semibold mb-3">Peliculas</h1>
    <!-- Actualiza la URL (q y page) y dispara la carga SSR/CSR -->
    <form @submit.prevent="doSearch" class="flex gap-2 items-end pb-6" aria-label="Buscar peliculas">
      <div class="flex-1">
        <BaseInput
          id="q"
          v-model="q"
          label="Busca en nuestro catalogo"
          placeholder="Buscar por titulo"
        />
      </div>
      <BaseButton type="submit">
        Buscar
      </BaseButton>
    </form>

    <p v-if="loading" class="mt-4" aria-live="polite">Cargando...</p>

    <p v-else-if="error" class="mt-4 text-red-400" aria-live="polite">{{ (error as any)?.message || error }}</p>

    <!-- Al menos una busqueda sin resultado -->
    <div v-if="hasSearched && !loading && results.length === 0" class="mt-6 p-6 rounded border border-white/10 bg-white/5">
      <h2 class="font-semibold mb-1">No encontramos coincidencias</h2>
      <p class="text-white/80 text-sm">Prueba con otro titulo.</p>
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

    <!-- Paginacion -->
    <nav v-if="hasSearched && totalPages > 1" class="mt-6 flex items-center gap-2">
      <NuxtLink
        :to="{ path: route.path, query: { q, page: Math.max(1, page - 1) } }"
        class="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
        :aria-disabled="page <= 1"
      >Anterior</NuxtLink>
      <span class="opacity-70 text-sm">Pagina {{ page }} de {{ totalPages }}</span>
      <!-- limitar pagina al total de paginas -->
      <NuxtLink
        :to="{ path: route.path, query: { q, page: Math.min(totalPages, page + 1) } }"
        class="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
        :aria-disabled="page >= totalPages"
      >Siguiente</NuxtLink>
    </nav>
  </section>
  </template>

