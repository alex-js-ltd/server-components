import type { ReactNode } from 'react'
import React from 'react'
import { Input } from '@/comps/form-elements'
import { prisma } from '@/utils/db'

const DisoverBooksScreen = () => {
  const handleSearch = async (data: FormData) => {
    'use server'
  }

  return (
    <div>
      <form action={handleSearch}>
        <Input
          placeholder="Search books..."
          id="search"
          type="search"
          className="w-full"
        />

        <label htmlFor="search">
          <button
            type="submit"
            className="border-0 relative ml-[-35px] bg-transparent"
          ></button>
        </label>
      </form>

      <BookList>
        <div></div>
      </BookList>
    </div>
  )
}

export default DisoverBooksScreen

const BookList = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="list-none p-0 grid grid-rows-auto-100 gap-4">{children}</ul>
  )
}
