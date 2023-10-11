import React from 'react'
import { Input } from '@/comps/form-elements'
import { prisma } from '@/utils/db'

const AuthenticatedApp = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  return (
    <div>
      <form>
        <Input placeholder="Search books..." name="query" className="w-full" />

        <label htmlFor="search">
          <button
            type="submit"
            className="border-0 relative ml-[-35px] bg-transparent"
          ></button>
        </label>
      </form>

      <BookList searchParams={searchParams} />
    </div>
  )
}

export default AuthenticatedApp

const BookList = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const { query } = searchParams
  const books = await prisma.book.findMany({
    where: {
      title: {
        startsWith: query?.toString(),
        mode: 'insensitive',
      },
    },
  })
  return (
    <ul className="list-none p-0 grid grid-rows-auto-100 gap-4">
      {books.map(book => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  )
}
