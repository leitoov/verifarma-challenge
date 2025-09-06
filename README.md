# Verifarma Challenge — Admin de Películas (Nuxt 3 + TypeScript)

Web para explorar peliculas usando la API de OMDb.
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

OMDB_API_KEY=5cba1058
```

## Desarrollo

```bash
npm run dev
```

Servidor en `http://localhost:3000`.

Rutas principales:
- Home pública: `/` (muestra un inicio e invitacion a logueo)
- Login: `/login` (autenticación dummy)
- Zona protegida: `/movies` (búsqueda y resultados)

Protección de rutas: `middleware/auth.global.ts`.

---

## Build

```bash
# compilar
npm run build

---

## Autenticación (dummy)

- Endpoint: `server/api/login.post.ts`
- Acepta cualquier email/contraseña no vacíos y devuelve un `token` dummy.
- Estado y helpers: `composables/useAuth.ts` (maneja cookie `auth_token`).
- Guard global: `middleware/auth.global.ts` (redirige segun autenticación; la Home `/` es pública, el resto se protege).

---

## UI y estilos

- Tailwind CSS: configuración en `tailwind.config.ts`, `postcss.config.cjs` y estilos globales en `assets/css/tailwind.css`.
- Paleta: `primary`, `secondary`, `danger`, `background` (ver `tailwind.config.ts`).
- Iconos: Google Material Symbols cargado en `nuxt.config.ts` (`app.head.link`).
- Componentes base:
  - Botón: `components/BaseButton.vue:1`
  - Input: `components/BaseInput.vue:1`
  - Header/Footer: `components/AppHeader.vue:1`, `components/AppFooter.vue:1`
  - Cards: `components/MovieCard.vue:1`
  - Recomendados: `components/RecommendedGrid.vue:1`

---

## Accesibilidad

- Skip‑link a contenido principal en `layouts/default.vue`.
- Focus visible consistente (Tailwind ring) en `assets/css/tailwind.css` y botones.
- Formularios con labels visibles y mensajes con `aria-live`.
- Imágenes de posters con `alt` descriptivo.

---

## Scripts útiles

```bash
npm run lint     # ESLint
npm run format   # Prettier
```

---

## Estructura rápida

- `pages/index.vue` — Home pública con vista previa de posters.
- `pages/login.vue` — Login dummy.
- `pages/movies/index.vue` — Búsqueda y resultados; recomendados cuando no hay resultados.
- `services/omdbClient.ts` — Cliente OMDb.
- `composables/useAuth.ts` — Estado de autenticación.
- `middleware/auth.global.ts` — Protección de rutas.

