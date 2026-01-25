import request from 'supertest'
import { app } from './index'

// Mock database for tests
jest.mock('./config/database', () => ({
  connect: jest.fn(),
  query: jest.fn(),
  release: jest.fn(),
}))

describe('Backend API Endpoints', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test'
  })

  it('GET /api should return welcome message', async () => {
    const res = await request(app).get('/api')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('version', '1.0.0')
  })
})
