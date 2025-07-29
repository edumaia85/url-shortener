import { z } from 'zod/v4'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.url().startsWith('postgresql://'),
  API_BASE_URL: z.url(),
})

export const env = envSchema.parse(process.env)