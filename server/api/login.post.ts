// Ruta de login: acepta email y password, devuelve token y user (dummy)
export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event) // Leemos el body de la peticion
  const email = body?.email?.trim()
  const password = body?.password?.trim()
  // Si no hay email o password, devolvemos error 400
  if (!email || !password) {
    setResponseStatus(event, 400)
    return { message: 'Email y password requeridos' }
  }

  // Dummy: aceptamos cualquier combinacion no vacia
  const token = 'dummy-' + Math.random().toString(36).slice(2, 10)

  // Devolvemos token y user (sin password)
  return {
    token,
    user: { email }
  }
})
