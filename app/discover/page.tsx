import SearchForm from '@/comps/search-form'
import BookList from '@/comps/book-list'
import * as actions from '@/utils/actions'

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const { query } = searchParams

  const startsWith = query?.toString() ?? ''

  const books = await actions.getBooks(startsWith)

  return (
    <div>
      <SearchForm defaultValue={startsWith} />

      <BookList books={books} />
    </div>
  )
}

export default Page
