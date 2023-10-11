'use server'

import { prisma } from '@/utils/db'
import { auth } from '@clerk/nextjs'
import { isBook } from './type-guards'

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

const getBookData = (data: FormData) => {
  const bookId = data.get('id')?.toString()
  const title = data.get('author')?.toString()
  const coverImageUrl = data.get('coverImageUrl')?.toString()
  const publisher = data.get('publisher')?.toString()
  const synopsis = data.get('synopsis')?.toString()
  const author = data.get('author')?.toString()
  const pageCount = parseInt(data.get('pageCount'))

  return {
    bookId,
    title,
    coverImageUrl,
    author,
    publisher,
    synopsis,
    pageCount,
  }
}

const createListItem = async (data: FormData) => {
  const { userId }: { userId: string | null } = auth()

  if (!userId) return

  const book = getBookData(data)

  console.log('create list item', book)

  const { bookId, ...rest } = book

  const res = await prisma.listItem.create({
    data: {
      ...rest,
      User: {
        connect: { id: userId },
      },
      Book: {
        connect: { id: bookId },
      },
    },
  })

  console.log(res)
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

export { getBooks, getBook, createListItem, getListItems, getListItem }
