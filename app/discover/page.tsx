import { Suspense } from 'react'
import { Input } from '@/comps/form-elements'
import { FaSearch } from 'react-icons/fa'
import BookList from '@/comps/book-list'
import Loading from '@/comps/loading'
import * as actions from '@/utils/actions'

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const { query } = searchParams

  const startsWith = query?.toString() ?? ''

  return (
    <div>
      <form className="mb-5">
        <Input
          placeholder="Search books..."
          name="query"
          className="w-full"
          defaultValue={startsWith}
        />

        <label htmlFor="search">
          <button
            type="submit"
            className="border-0 relative ml-[-35px] bg-transparent"
          >
            <FaSearch aria-label="search" />
          </button>
        </label>
      </form>

      <Suspense fallback={<Loading />}>
        <DiscoverList startsWith={startsWith} />
      </Suspense>
    </div>
  )
}

export default Page

const DiscoverList = async ({ startsWith }: { startsWith: string }) => {
  const books = await actions.getBooks(startsWith)

  return <BookList books={[...books.map(el => ({ ...el, bookId: el.id }))]} />
}
