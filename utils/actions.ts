'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/utils/db'
import { auth } from '@clerk/nextjs'
import type { Book } from '@prisma/client'

const getBooks = async (startsWith: string) => {
  let books
  try {
    books = await prisma.book.findMany({
      where: {
        title: {
          startsWith,
          mode: 'insensitive',
        },
      },
    })
  } catch (error) {
    console.log(error)
  }

  return books
}

const getBook = async (id: string) => {
  let book

  try {
    book = await prisma.book.findUnique({
      where: {
        id,
      },
    })
  } catch (error) {
    console.log(error)
  }

  return book
}

const createListItem = async (book: Book) => {
  const { userId }: { userId: string | null } = auth()

  if (!userId) return

  const listItem = await getListItem(book.id)

  if (listItem) return

  const { id: bookId, ...rest } = book

  try {
    await prisma.listItem.create({
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
  } catch (error) {
    console.log(error)
  }

  revalidatePath(`/`)
  revalidatePath(`/book/${book.id}`)
}

const removeListItem = async (book: Book) => {
  try {
    await prisma.listItem.delete({
      where: {
        id: book.id,
      },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath(`/`)
  revalidatePath(`/book/${book.id}`)
}

const getListItems = async () => {
  const { userId }: { userId: string | null } = auth()

  if (!userId) return null

  let user
  try {
    user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        listItems: true,
      },
    })
  } catch (error) {}

  return user?.listItems ?? null
}

const getListItem = async (bookId: string) => {
  const listItems = await getListItems()

  return listItems?.find(li => li.bookId === bookId) ?? null
}

export {
  getBooks,
  getBook,
  createListItem,
  removeListItem,
  getListItems,
  getListItem,
}
