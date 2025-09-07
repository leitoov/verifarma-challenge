import type { OmdbSearchResponse, MovieDetail } from '@/types/movies' // Importamos los tipos de datos

// Funcion para construir la URL con los parametros necesarios
export const makeUrl = (base: string, key: string, params: Record<string, string>) => { //makeUrl necesita base, key y params
  const u = new URL(base) // Creamos una nueva URL con la base
  u.searchParams.set('apikey', key) // Añadimos el apikey a los parametros de busqueda
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v)) // Añadimos los demas parametros
  return u.toString() // Devolvemos la URL como string
}

// Hook para usar el cliente de OMDB
export const useOmdbClient = () => {
  const { public: cfg } = useRuntimeConfig() // Obtenemos la configuracion publica
  const base = cfg.apiUrl // url
  const key = cfg.omdbApiKey //api key

  // listado: búsqueda por titulo (para /movies)
  const searchByTitle = (title: string, page = 1) =>
    $fetch<OmdbSearchResponse>(makeUrl(base, key, { s: title, page: String(page) })) // Hacemos la peticion con $fetch y devolvemos la respuesta tipada por titulo

  // detalle por id (para /movies/[id])
  const getById = (id: string) =>
    $fetch<MovieDetail>(makeUrl(base, key, { i: id, plot: 'full' })) // Hacemos la peticion con $fetch y devolvemos la respuesta tipada por id


  return { searchByTitle, getById, } // retornamos las funciones de titulo o id
}
