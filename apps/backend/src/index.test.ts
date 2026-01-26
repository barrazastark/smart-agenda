// Mock database for tests
jest.mock('./config/database', () => ({
  connect: jest.fn(),
  query: jest.fn(),
  release: jest.fn(),
}))

jest.mock('./config/prisma', () => ({
  __esModule: true,
  default: {
    appSettings: {
      findUnique: jest.fn(),
      upsert: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  },
}))

import request from 'supertest'
import { app } from './index'
import pool from './config/database'
import prisma from './config/prisma'

describe('Backend API Endpoints', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test'
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('GET /api should return welcome message', async () => {
    const res = await request(app).get('/api')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('version', '1.0.0')
  })

  it('GET /api/settings/app-title should return app title', async () => {
    const mockSetting = { key: 'app_title', value: 'SmartAgenda' }

    ;(prisma.appSettings.findUnique as jest.Mock).mockResolvedValue(mockSetting)

    const res = await request(app).get('/api/settings/app-title')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('key', 'app_title')
    expect(res.body).toHaveProperty('value', 'SmartAgenda')
  })
})
