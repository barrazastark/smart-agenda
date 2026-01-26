import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  PORT: z.string().default('4100').transform(Number),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z
    .string()
    .url()
    .default('postgresql://postgres:password@127.0.0.1:5432/smartagenda'),
  CORS_ORIGIN: z.string().default('*'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format())
  process.exit(1)
}

export const env = _env.data
