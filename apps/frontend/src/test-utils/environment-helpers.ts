// Mock global para ambientes de testing
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
process.env.CYPRESS_ENV = process.env.CYPRESS_ENV || ''

// Función helper para saber si estamos en testing
export const isTestingEnvironment = () => {
  return process.env.NODE_ENV === 'test' || process.env.CYPRESS_ENV === 'e2e'
}

// Exportamos una instancia mock del fetch
export const createMockFetch = () => {
  if (isTestingEnvironment()) {
    return jest.fn().mockRejectedValue(new Error('Disabled in testing'))
  }
  return global.fetch
}
