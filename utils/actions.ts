'use server'

import { prisma } from '@/utils/db'
import { auth } from '@clerk/nextjs'

const getBooks = async (startsWith: string) => {
  const books = await prisma.book.findMany({
    where: {
      title: {
        startsWith,
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

const getListItems = async () => {
  const { userId }: { userId: string | null } = auth()

  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      listItems: true,
    },
  })

  return user?.listItems ?? null
}

const getListItem = async (bookId: string) => {
  const listItems = await getListItems()

  return listItems?.find(li => li.bookId === bookId) ?? null
}

export { getBooks, getBook, getListItems, getListItem }
