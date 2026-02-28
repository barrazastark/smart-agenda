import { env } from './config/env'
import { app } from './app'

const PORT = env.PORT

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 [Backend] Server is running on port ${PORT}`)
  console.log(`📋 [Backend] Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 [Backend] API: http://localhost:${PORT}/api`)
  console.log(`📖 [Backend] Swagger Docs: http://localhost:${PORT}/docs`)
})

export { app, server }
