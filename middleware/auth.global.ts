

// middleware para proteger rutas y redirigir segun estado de autenticacion
export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth()

  // Ruta raíz: permite home publica; si ya esta autenticado, redirige a /movies
  if (to.path === '/') {
    if (isAuthenticated.value) return navigateTo('/movies')
    return
  }

  // Permitir siempre la pagina de login
  if (to.path === '/login') {
    // Si ya esta logueado, mandar al area principal
    if (isAuthenticated.value) return navigateTo('/movies')
    return
  }

  // Bloquear el resto de rutas si no esta autenticado
  if (!isAuthenticated.value) return navigateTo('/login')
})
