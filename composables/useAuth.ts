
export type AuthUser = { email: string }

// funcionalidad de autenticacion: login, logout, estado
export const useAuth = () => {
  const token = useCookie<string | null>('auth_token', {
    sameSite: 'lax',
    // cookie de sesion
  })
  const user = useState<AuthUser | null>('auth_user', () => null) // estado global del user

  const isAuthenticated = computed(() => Boolean(token.value)) // si hay token, esta logueado

  // funcion de login: llama a la api y guarda token y user
  async function login(email: string, password: string) {
    const res = await $fetch<{ token: string; user: AuthUser }>(
      '/api/login',
      {
        method: 'POST',
        body: { email, password }, // enviamos email y contraseña
      }
    )
    token.value = res.token // guardamos el token en la cookie
    user.value = res.user // guardamos el user en el estado
    return res
  }

  // funcion de logout: borra token y user
  function logout() {
    token.value = null
    user.value = null
  }

  // retornamos token, user, estado y funciones
  return { token, user, isAuthenticated, login, logout }
}
