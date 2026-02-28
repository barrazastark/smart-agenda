jest.mock('./config/database', () => ({
  connect: jest.fn(),
  query: jest.fn(),
  release: jest.fn(),
}))

jest.mock('./config/prisma', () => ({
  __esModule: true,
  default: {
    appSettings: {
      findMany: jest.fn(),
      upsert: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  },
}))

import request from 'supertest'
import { app } from './app'
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

  it('GET /settings should return settings with pageTitle', async () => {
    ;(prisma.appSettings.findMany as jest.Mock).mockResolvedValue([
      { key: 'pageTitle', value: 'SmartAgenda' },
    ])

    const res = await request(app).get('/settings')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('pageTitle', 'SmartAgenda')
  })

  it('GET /settings should return default pageTitle when empty', async () => {
    ;(prisma.appSettings.findMany as jest.Mock).mockResolvedValue([])

    const res = await request(app).get('/settings')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('pageTitle', 'Smart Agenda')
  })
})
