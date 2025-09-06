import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  darkMode: 'media',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './app.vue',
    './plugins/**/*.{js,ts}',
    './error.vue'
  ], 
  theme: {
    extend: {
      colors: {
        // Paleta de colores del proyecto
        primary: colors.sky,
        secondary: colors.violet,
        muted: colors.slate,
        success: colors.emerald,
        warning: colors.amber,
        danger: colors.rose,
        background: {
          DEFAULT: '#0b1220',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
