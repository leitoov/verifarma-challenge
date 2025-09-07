import { describe, it, expect, vi, beforeEach } from 'vitest'

const ref = <T,>(v: T) => ({ value: v })

// funcion para resetear los mocks antes de cada test
beforeEach(() => {
  vi.restoreAllMocks() // restauramos todos los mocks
  vi.stubGlobal('useCookie', <T,>(name: string) => ref<T | null>(null as any)) // retornamos una cookie nula
  const states = new Map<string, any>()
  vi.stubGlobal('useState', <T,>(key: string, init: () => T) => { // retornamos un estado con key e init
    if (!states.has(key)) states.set(key, ref(init()))
    return states.get(key)
  })
  vi.stubGlobal('computed', (fn: any) => ({ get value() { return fn() } }))
})

// importamos el useAuth para el testeo
import { useAuth } from '../composables/useAuth'

// test para el useAuth enviando email y password
describe('useAuth composable', () => { 
  it('sets token and user on successful login', async () => {
    vi.stubGlobal('$fetch', vi.fn().mockResolvedValue({ token: 'dummy', user: { email: 'a@b.c' } }))
    const { login, token, user, isAuthenticated } = useAuth()
    expect(isAuthenticated.value).toBe(false)
    await login('a@b.c', 'x')
    expect(token.value).toBe('dummy')
    expect(user.value).toEqual({ email: 'a@b.c' })
    expect(isAuthenticated.value).toBe(true)
  })
  // test para el logout con token y user
  it('logout clears token and user', () => {
    const { token, user, logout } = useAuth()
    token.value = 't'
    user.value = { email: 'x@y.z' }
    logout()
    expect(token.value).toBeNull()
    expect(user.value).toBeNull()
  })
})

