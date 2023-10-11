'use server'

import { prisma } from '@/utils/db'

const getBooks = async (query: string) => {
  const books = await prisma.book.findMany({
    where: {
      title: {
        startsWith: query,
        mode: 'insensitive',
      },
    },
  })

  return books
}

const getBook = async (id: string) => {
  const book = await prisma.book.findUnique({
    where: {
      id,
    },
  })

  return book
}

export { getBooks, getBook }
