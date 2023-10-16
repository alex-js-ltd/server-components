'use server'

import type { Book, ListItem } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/utils/db'
import { auth } from '@clerk/nextjs'
import { isNullableString } from './type-guards'

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

    revalidatePath(`/discover?query=${startsWith}`)
    return books
  } catch (error) {
    console.log(error)
    return []
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
    return null
  }
}

const createListItem = async (book: Book) => {
  const { userId }: { userId: string | null } = auth()

  if (!userId) return

  const listItem = await getListItem(book.id)

  if (listItem) return

  const { id, ...rest } = book

  try {
    await prisma.listItem.create({
      data: {
        ...rest,
        bookId: id,
        User: {
          connect: { id: userId },
        },
      },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath(`/`)
  revalidatePath(`/discover`)
  revalidatePath(`/book/${book.id}`)
}

const removeListItem = async (listItem: ListItem) => {
  try {
    await prisma.listItem.delete({
      where: {
        id: listItem.id,
      },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath(`/`)
  revalidatePath(`/discover`)
  revalidatePath(`/book/${listItem.bookId}`)
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

    return user?.listItems ?? []
  } catch (error) {}
}

const getListItem = async (bookId: string) => {
  const listItems = await getListItems()

  return listItems?.find(li => li.bookId === bookId) ?? null
}

const markAsRead = async (listItem: ListItem) => {
  const { id, ...rest } = listItem

  try {
    await prisma.listItem.update({
      where: { id },
      data: { ...rest, finishDate: new Date(Date.now()).toISOString() },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath(`/`)
  revalidatePath(`/finished`)
  revalidatePath(`/book/${listItem.bookId}`)
}

const markAsUnRead = async (listItem: ListItem) => {
  const { id, ...rest } = listItem

  try {
    await prisma.listItem.update({
      where: { id },
      data: { ...rest, finishDate: null },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath(`/`)
  revalidatePath(`/finished`)
  revalidatePath(`/book/${listItem.bookId}`)
}

const updateListItem = async (listItem: ListItem, data: FormData) => {
  const { id, ...rest } = listItem

  const notes = data.get('notes')

  if (isNullableString(notes))
    try {
      await prisma.listItem.update({
        where: { id },
        data: { ...rest, notes },
      })
    } catch (error) {
      console.log(error)
    }

  revalidatePath(`/book/${listItem.bookId}`)
}

export {
  getBooks,
  getBook,
  createListItem,
  removeListItem,
  getListItems,
  getListItem,
  markAsRead,
  markAsUnRead,
  updateListItem,
}
