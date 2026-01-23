import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: '../../apps/backend/src/swagger.json',
    output: {
      target: 'src/lib/api.ts',
      mode: 'single',
      client: 'fetch',
      baseUrl: 'http://localhost:4100', // Default base URL for dev
    },
  },
})
