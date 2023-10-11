import React from 'react'
import { Input } from '@/comps/form-elements'
import BookList from '@/comps/book-list'
import { getBooks } from '@/utils/actions'
import { FaSearch, FaTimes } from 'react-icons/fa'

const AuthenticatedApp = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const { query } = searchParams

  const startsWith = query?.toString() ?? ''

  const books = await getBooks(startsWith)

  return (
    <div>
      <form>
        <Input placeholder="Search books..." name="query" className="w-full" />

        <label htmlFor="search">
          <button
            type="submit"
            className="border-0 relative ml-[-35px] bg-transparent"
          >
            <FaSearch aria-label="search" />
          </button>
        </label>
      </form>

      <BookList books={books} />
    </div>
  )
}

export default AuthenticatedApp
