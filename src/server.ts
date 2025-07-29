import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { shortenUrlRoute } from './http/routes/shorten-url'
import { getLinksRoute } from './http/routes/get-links'
import { redirectRoute } from './http/routes/redirect'
import { env } from './env'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: 'http://192.168.0.139:3000',
})
app.register(fastifyMultipart)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

app.register(shortenUrlRoute)
app.register(redirectRoute)
app.register(getLinksRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' })