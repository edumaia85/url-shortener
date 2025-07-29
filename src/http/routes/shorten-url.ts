import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z from 'zod/v4'

import { prisma } from '../../libs/prisma'
import { nanoid } from 'nanoid'
import { env } from '../../env'

export const shortenUrlRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/url/shorten', {
    schema: {
      body: z.object({
        url: z.url({ message: 'Link inválido. Forneça um link válido para prosseguir!' }),
      }),
      response: {
        201: z.object({
          shortLink: z.url(),
        }),
      },
    },
  }, async (request, reply) => {
    const { url } = request.body
    const host = request.headers.host

    const existingLink = await prisma.link.findFirst({
      where: {
        originalUrl: url,
      },
    })

    if (existingLink) {
      const shortLink = `${env.API_BASE_URL}/url/${existingLink.code}`

      return reply.status(200).send({ shortLink })
    }

    let code = ''
    let isCodeUnique = false
    while (isCodeUnique === false) {
      code = nanoid()

      const codeExists = await prisma.link.findUnique({
        where: { code },
      })

      if (codeExists === null) {
        isCodeUnique = true
      }
    }

    const link = await prisma.link.create({
      data: {
        originalUrl: url,
        code: code,
      },
    })

    const shortLink = `${env.API_BASE_URL}/url/${link.code}`

    return reply.status(201).send({ shortLink })
  })
}