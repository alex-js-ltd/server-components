import { type NextRequest } from 'next/server'

import { prisma } from '@/utils/db'

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  const books = await prisma.book.findMany({
    where: {
      title: {
        startsWith: query?.toString(),
        mode: 'insensitive',
      },
    },
  })
  return Response.json({ message: books })
}
