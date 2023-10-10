import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

import { prisma } from '@/utils/db'

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || ``

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
}

export const GET = async () => {
  return Response.json({ message: 'Hello World!' })
}