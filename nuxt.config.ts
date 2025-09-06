export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL, // url del .env
      omdbApiKey: process.env.OMDB_API_KEY // api key del .env
    }
  },
  css: ['@/assets/css/tailwind.css'], // añadimos tailwind
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' }, // para las fuentes
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }, // para las fuentes
        { // fuente de iconos de material design
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap'
        }
      ]
    }
  }
})
