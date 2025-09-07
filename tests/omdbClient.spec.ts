import { describe, it, expect } from 'vitest'
import { makeUrl } from '../services/omdbClient' // importamos makeUrl para testear


// tests para makeUrl buscando apikey y params (como nombre y pagina)
describe('makeUrl', () => {
  it('adds apikey and params correctly', () => {
    const url = makeUrl('https://www.omdbapi.com', 'KEY123', { s: 'matrix', page: '2' })
    expect(url).toContain('https://www.omdbapi.com')
    expect(url).toContain('apikey=KEY123')
    expect(url).toContain('s=matrix')
    expect(url).toContain('page=2')
  })
  // test para sobreescribir parametros duplicados con el ultimo
  it('overwrites duplicate params with latest', () => {
    const url = makeUrl('https://www.omdbapi.com/?foo=bar', 'K', { foo: 'baz' })
    const u = new URL(url)
    expect(u.searchParams.get('foo')).toBe('baz')
  })
})

