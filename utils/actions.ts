'use server'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/utils/db'
import { auth } from '@clerk/nextjs'
import type { Book } from '@prisma/client'

const getBooks = async (startsWith: string) => {
  try {
    const books = await prisma.book.findMany({
      where: {
        title: {
          startsWith,
          mode: 'insensitive',
        },
      },
    })
    return books
  } catch (error) {
    console.log(error)
  }
}

const getBook = async (id: string) => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id,
      },
    })
    return book
  } catch (error) {
    console.log(error)
  }
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

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        listItems: true,
      },
    })

    return user?.listItems ?? null
  } catch (error) {}
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
