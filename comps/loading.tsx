import type { Book } from '@prisma/client'
import BookList from '@/comps/book-list'

const loadingBook: Book = {
  id: '1',
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: '/book-placeholder.svg',
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  pageCount: 0,
}

const loadingBooks: Array<Book> = Array.from({ length: 10 }, (v, index) => ({
  ...loadingBook,
  id: `loading-book-${index}`,
}))

const Loading = () => <BookList books={loadingBooks} />

export default Loading
