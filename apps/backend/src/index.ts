import express, { Request, Response, Application } from 'express'
import cors from 'cors'

const app: Application = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())

import { checkDatabaseConnection } from './controllers/health.controller'
import { getAppSettings } from './controllers/app-settings.controller'

// Health check endpoint
app.get('/health', checkDatabaseConnection)

import { RegisterRoutes } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

// API routes
app.get('/api', (_req: Request, res: Response) => {
  console.log('[Backend] API root endpoint called')
  res.json({
    message: 'Welcome to SmartAgenda API',
    version: '1.0.0',
  })
})

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// App Settings endpoint
app.get('/api/settings/app-title', getAppSettings)

// Tsoa Routes
RegisterRoutes(app)

// Export app for testing
export { app }

// Start server only if run directly
if (require.main === module) {
  const HOST = 'localhost'
  app.listen(PORT, () => {
    console.log(`🚀 [Backend] Server is running on http://${HOST}:${PORT}`)
    console.log(`📋 [Backend] Health check: http://${HOST}:${PORT}/health`)
    console.log(`🔗 [Backend] API: http://${HOST}:${PORT}/api`)
    console.log(`📖 [Backend] Swagger Docs: http://${HOST}:${PORT}/docs`)
  })
}
