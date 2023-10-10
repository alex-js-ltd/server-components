import React from 'react'
import { Input } from '@/comps/form-elements'
import { prisma } from '@/utils/db'

import AuthenticatedLayout from '@/comps/authenticated-layout'

const AuthenticatedApp = () => {
  const handleSearch = async (data: FormData) => {
    'use server'

    const query = data.get('query')

    console.log('query', query)

    const response = await fetch(
      `http://localhost:3000/api/books?query=${query}`,
    )
    console.log(response)
  }

  return (
    <AuthenticatedLayout>
      <div>
        <form action={handleSearch}>
          <Input
            placeholder="Search books..."
            id="search"
            type="search"
            name="query"
            className="w-full"
          />

          <label htmlFor="search">
            <button
              type="submit"
              className="border-0 relative ml-[-35px] bg-transparent"
            ></button>
          </label>
        </form>

        <BookList />
      </div>
    </AuthenticatedLayout>
  )
}

export default AuthenticatedApp

const BookList = async () => {
  const books = await prisma.book.findMany()
  return (
    <ul className="list-none p-0 grid grid-rows-auto-100 gap-4">
      {books.map(book => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  )
}
