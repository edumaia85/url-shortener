import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import { z } from 'zod/v4'

import { prisma } from '../../libs/prisma.ts'

export const getLinksRoute: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/url/links',
    {
      schema: {
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.number(),
                code: z.string(),
                originalUrl: z.url(),
                createdAt: z.date(),
              }),
            ),
          }),
        },
      },
    },
    async (_, reply) => {
      const links = await prisma.link.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })

      return reply.send({ links })
    },
  )
}