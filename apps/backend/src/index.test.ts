import request from 'supertest'
import { app } from './index'

describe('Backend API Endpoints', () => {
  it('GET /health should return ok status', async () => {
    const res = await request(app).get('/health')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('status', 'ok')
  })

  it('GET /api should return welcome message', async () => {
    const res = await request(app).get('/api')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('version', '1.0.0')
  })
})
