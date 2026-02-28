import express, { Request, Response, Application } from 'express'
import cors from 'cors'
import { checkDatabaseConnection } from './controllers/health.controller'
import { RegisterRoutes } from './routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'

const app: Application = express()

app.use(cors())
app.use(express.json())

app.get('/health', checkDatabaseConnection)

app.get('/api', (_req: Request, res: Response) => {
  res.json({
    message: 'Welcome to SmartAgenda API',
    version: '1.0.0',
  })
})

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

RegisterRoutes(app)

export { app }
