import type { Book } from '@prisma/client'

export const isBook = (book: unknown): book is Book => {
  return (
    Boolean(book) &&
    typeof book === 'object' &&
    typeof (book as Book).id === 'string' &&
    typeof (book as Book).title === 'string' &&
    typeof (book as Book).coverImageUrl === 'string' &&
    typeof (book as Book).author === 'string' &&
    typeof (book as Book).publisher === 'string' &&
    typeof (book as Book).synopsis === 'string' &&
    typeof (book as Book).pageCount === 'number'
  )
}
