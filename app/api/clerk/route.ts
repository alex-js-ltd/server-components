import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'
import { prisma } from '@/utils/db'

import { getEnv } from '@/utils/env'

const { NODE_ENV, CLERK_WEBHOOK_SECRET_DEV, CLERK_WEBHOOK_SECRET_PRODUCTION } =
  getEnv()

const webhookSecret =
  NODE_ENV !== 'production'
    ? CLERK_WEBHOOK_SECRET_DEV
    : CLERK_WEBHOOK_SECRET_PRODUCTION

const validateRequest = async (request: Request) => {
  const payloadString = await request.text()
  const headerPayload = headers()

  const svixHeaders = {
    'svix-id': headerPayload.get('svix-id')!,
    'svix-timestamp': headerPayload.get('svix-timestamp')!,
    'svix-signature': headerPayload.get('svix-signature')!,
  }
  const wh = new Webhook(webhookSecret)
  return wh.verify(payloadString, svixHeaders) as WebhookEvent
}

export const POST = async (request: Request) => {
  const payload = await validateRequest(request)

  if (payload.type === 'user.created') {
    try {
      const user = await prisma.user.create({
        data: {
          email: payload.data.email_addresses[0]?.email_address,
        },
      })
      return Response.json({ message: user })
    } catch (error) {
      return Response.json({ message: error })
    }
  }

  return Response.json({ message: 'cannot create user' })
}

export const GET = async () => {
  return Response.json({ message: 'Hello World!' })
}
