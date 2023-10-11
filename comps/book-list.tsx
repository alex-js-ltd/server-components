import type { Book, ListItem } from '@prisma/client'
import BookRow from './book-row'

const BookList = ({ books }: { books: Array<Book | ListItem> }) => (
  <ul className="list-none p-0 grid grid-rows-auto-100 gap-4 mt-5">
    {books.map(book => (
      <li key={book.id}>
        <BookRow book={book} />
      </li>
    ))}
  </ul>
)

export default BookList
