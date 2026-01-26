import { env } from './config/env'
import express, { Request, Response, Application } from 'express'
import cors from 'cors'

const app: Application = express()
const PORT = env.PORT

// Middleware
app.use(cors())
app.use(express.json())

import { checkDatabaseConnection } from './controllers/health.controller'
import { getAppSettings, updateAppSettings } from './controllers/app-settings.controller'
import { RegisterRoutes } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

// Health check endpoint
app.get('/health', checkDatabaseConnection)

// API routes
app.get('/api', (_req: Request, res: Response) => {
  console.log('[Backend] API root endpoint called')
  res.json({
    message: 'Welcome to SmartAgenda API',
    version: '1.0.0',
  })
})

// App Settings endpoint
app.get('/api/settings/app-title', getAppSettings)
app.post('/api/settings/app-title', updateAppSettings)

// Swagger UI
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Tsoa Routes
RegisterRoutes(app)

// Export app for testing
export { app }

// Start server only if run directly
if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [Backend] Server is running on http://0.0.0.0:${PORT}`)
    console.log(`📋 [Backend] Health check: http://127.0.0.1:${PORT}/health`)
    console.log(`🔗 [Backend] API: http://127.0.0.1:${PORT}/api`)
    console.log(`📖 [Backend] Swagger Docs: http://127.0.0.1:${PORT}/docs`)
  })
}
