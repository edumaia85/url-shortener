import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

import { prisma } from '../../libs/prisma.ts'

export const redirectRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/url/:code',
    {
      schema: {
        params: z.object({
          code: z.string(),
        }),
        response: {
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { code } = request.params

      const link = await prisma.link.findUnique({
        where: { code },
      })

      if (link === null) {
        return reply.status(404).send({ message: 'Link não encontrado.' })
      }

      return reply.code(301).redirect(link.originalUrl);
    },
  )
}