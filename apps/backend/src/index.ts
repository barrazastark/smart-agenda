import { env } from './config/env'
import express, { Request, Response, Application } from 'express'
import cors from 'cors'
import { checkDatabaseConnection } from './controllers/health.controller'
import { RegisterRoutes } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

const app: Application = express()
const PORT = env.PORT

// Middleware
app.use(cors())
app.use(express.json())

// Health check endpoint
app.get('/health', checkDatabaseConnection)

// API routes
app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to SmartAgenda API',
    version: '1.0.0',
  })
})

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Tsoa Routes
RegisterRoutes(app)

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [Backend] Server is running on port ${PORT}`)
  console.log(`📋 [Backend] Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 [Backend] API: http://localhost:${PORT}/api`)
  console.log(`📖 [Backend] Swagger Docs: http://localhost:${PORT}/docs`)
})

export { app, server }
