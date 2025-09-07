# Verifarma Challenge — Admin de Películas (Nuxt 3 + TypeScript)

Web para explorar películas usando la API de OMDb.
Incluye autenticación dummy, grillas responsive y componentes base con Tailwind CSS.

---

## Stack
- Nuxt 3 + Vite
- TypeScript
- Tailwind CSS
- ESLint + Prettier

---

## Requisitos
- Node.js 18+
- npm (o pnpm/yarn si preferís)

---

## Instalación

1) Instalar dependencias

```bash
npm install
```

2) Configurar variables de entorno

Crear un archivo `.env` en la raíz basado en `.env.example` (si no existe, crealo con estos valores mínimos):

```env
# URL base de la API de OMDb
API_URL=https://www.omdbapi.com

OMDB_API_KEY=TU_API_KEY
```

## Desarrollo

```bash
npm run dev
```

Servidor en `http://localhost:3000`.

Rutas principales:
- Home pública: `/` (inicio e invitación a logueo)
- Login: `/login` (autenticación dummy)
- Zona protegida: `/movies` (búsqueda y resultados)

Protección de rutas: `middleware/auth.global.ts`.

---

## Build

```bash
# compilar
npm run build
```

## Docker

Build de imagen y ejecución local:

```bash
docker build -t verifarma-movies:latest .
docker run --rm -p 3000:3000 \
  -e API_URL=https://www.omdbapi.com \
  -e OMDB_API_KEY=TU_API_KEY \
  verifarma-movies:latest
```

Con docker-compose:

```bash
OMDB_API_KEY=TU_API_KEY docker compose up --build
```

La app queda disponible en `http://localhost:3000`.

---

## Autenticación (dummy)

- Endpoint: `server/api/login.post.ts`
- Acepta cualquier email/contraseña no vacíos y devuelve un `token` dummy.
- Estado y helpers: `composables/useAuth.ts` (maneja cookie `auth_token`).
- Guard global: `middleware/auth.global.ts` (redirige según autenticación; la Home `/` es pública, el resto se protege).

---
## PROTOTIPO MOBILE Y DESKTOP FIGMA
https://www.figma.com/design/4YJ5UPUXKgXt4dnmpPbnvw/Challenge-Verifarma?node-id=0-1&t=WuVZLIeqwcAkRVmm-1
---
## UI y estilos

- Tailwind CSS: configuración en `tailwind.config.ts`, `postcss.config.cjs` y estilos globales en `assets/css/tailwind.css`.
- Iconos: Google Material Symbols cargado en `nuxt.config.ts` (`app.head.link`).
- Componentes base:
  - Botón: `components/BaseButton.vue`
  - Input: `components/BaseInput.vue`
  - Header/Footer: `components/AppHeader.vue`, `components/AppFooter.vue`
  - Cards: `components/MovieCard.vue`
  - Recomendados: `components/RecommendedGrid.vue`

---

## Accesibilidad

- Skip-link a contenido principal en `layouts/default.vue`.
- Focus visible consistente (Tailwind ring) en `assets/css/tailwind.css` y botones.
- Formularios con labels visibles y mensajes con `aria-live`.
- Imágenes de posters con `alt` descriptivo.

---

## Scripts útiles

```bash
npm run lint     # ESLint
npm run format   # Prettier
npm run test     # Vitest en modo watch
npm run test:run # Vitest en modo CI
```

---

## Estructura rápida

- `pages/index.vue` — Home pública con vista previa de posters.
- `pages/login.vue` — Login dummy.
- `pages/movies/index.vue` — Búsqueda y resultados; recomendados cuando no hay resultados.
- `pages/movies/[id].vue` — Detalle de película.
- `services/omdbClient.ts` — Cliente OMDb.
- `composables/useAuth.ts` — Estado de autenticación.
- `middleware/auth.global.ts` — Protección de rutas.

