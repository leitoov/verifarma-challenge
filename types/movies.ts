export interface MovieSummary { // Tipo para el resumen de pelicula
  imdbID: string
  Title: string
  Year: string
  Poster: string
  Type: string
}
export interface MovieDetail extends MovieSummary { // Tipo para el detalle de pelicula
  Genre?: string
  Director?: string
  imdbVotes?: string
  Plot?: string
  Awards?: string
  imdbRating?: string
  Ratings?: { Source: string; Value: string }[] // Array de objetos con fuente y valor
}
export interface OmdbSearchResponse { // Tipo para la respuesta de busqueda
  Search?: MovieSummary[] // Array de resumenes de peliculas
  totalResults?: string
  Response: 'True' | 'False'
  Error?: string
}
