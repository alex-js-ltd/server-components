import { Suspense } from 'react'
import { Input } from '@/comps/form-elements'
import BookList from '@/comps/book-list'
import { getBooks } from '@/utils/actions'
import { FaSearch } from 'react-icons/fa'

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const { query } = searchParams

  const startsWith = query?.toString() ?? ''

  const books = await getBooks(startsWith)

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

      <Suspense fallback={<>...loading</>}>
        <BookList books={books} />
      </Suspense>
    </div>
  )
}

export default Page
