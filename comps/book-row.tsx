import type { Book, ListItem } from '@prisma/client'

import Link from 'next/link'
import StatusButtons from './status-buttons'
import Rating from './rating'
import { isFinishedItem } from '@/utils/type-guards'

const BookRow = ({ book }: { book: Book | ListItem }) => {
  const { title, author, coverImageUrl } = book

  const id = `book-row-book-${book.id}`

  return (
    <div className="flex items-center relative">
      <Link
        aria-labelledby={id}
        href={`/book/${book.id}`}
        className="min-h-96 flex-1 grid grid-cols-[140px_1fr] gap-5 p-5 border border-gray-200 text-text rounded-md transition-transform hover:no-underline hover:shadow-md hover:text-inherit"
      >
        <div className="w-36 sm:w-24">
          <img
            src={coverImageUrl}
            alt={`${title} book cover`}
            className="max-h-full w-full"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="flex-1">
              <h2 id={id} className="text-indigo-500 text-1.25em m-0">
                {title}
              </h2>
              {/* Add Rating component if listItem is available */}
              {isFinishedItem(book) ? <Rating listItem={book} /> : null}
            </div>
            <div className="ml-10">
              <div className="mt-0.4em italic text-0.85em">{author}</div>
              <small>{book.publisher}</small>
            </div>
          </div>
          <small className="whitespace-normal block">
            {book.synopsis.substring(0, 500)}...
          </small>
        </div>
      </Link>
      <div className="ml-20 absolute right-[-20px] text-gray-80 flex flex-col justify-around h-full">
        <StatusButtons book={book} />
      </div>
    </div>
  )
}

export default BookRow
