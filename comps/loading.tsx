import type { LoadingBook } from '@/utils/type-guards'
import BookList from '@/comps/book-list'

export const loadingBook: LoadingBook = {
  id: '1',
  title: 'Loading...',
  author: 'loading...',
  coverImageUrl: '/book-placeholder.svg',
  publisher: 'Loading Publishing',
  synopsis: 'Loading...',
  pageCount: 0,
  loading: true,
}

const loadingBooks: Array<LoadingBook> = Array.from(
  { length: 10 },
  (v, index) => ({
    ...loadingBook,
    id: `loading-book-${index}`,
  }),
)

const Loading = () => <BookList books={loadingBooks} />

export default Loading
