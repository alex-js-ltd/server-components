import type { NextRequest } from 'next/server'
import { getIronSession, createResponse } from 'iron-session'

interface Data {
  user?: {
    id: number
    name: string
  }
}

const getSession = (req: Request, res: Response) => {
  const session = getIronSession<Data>(req, res, {
    password: 'ThisIsNotASecurePasswordPleaseChangeIt',
    cookieName: 'session',
    cookieOptions: {
      secure: false,
    },
  })

  return session
}

export const POST = async (request: NextRequest) => {
  const response = new Response()
  const session = await getSession(request, response)

  session.user = {
    id: 1,
    name: 'John Doe',
  }

  await session.save()

  return createResponse(response, JSON.stringify({ message: 'User created' }))
}
