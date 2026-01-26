import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:4100'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  IS_DOCKER: z.string().optional(),
})

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NODE_ENV: process.env.NODE_ENV,
  IS_DOCKER: process.env.IS_DOCKER,
})

if (!_env.success) {
  console.error('❌ Invalid frontend environment variables:', _env.error.format())
  // In frontend we don't necessarily want to process.exit(1) as it might break the build or runtime differently
  // but we should at least log it.
}

export const env = _env.data || {
  NEXT_PUBLIC_API_URL: 'http://localhost:4100',
  NODE_ENV: 'development',
}
