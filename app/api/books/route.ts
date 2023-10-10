import { type NextRequest } from 'next/server'

import { prisma } from '@/utils/db'

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  console.log(query)

  const books = await prisma.book.findMany({
    where: {
      title: {
        startsWith: query?.toString(),
        mode: 'insensitive',
      },
    },
  })

  console.log('books', books)
  return Response.json({ message: books })
}
