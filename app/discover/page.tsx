import React from 'react'
import { Input } from '@/comps/form-elements'

const DisoverBooksScreen = () => {
  const handleSearch = async (data: FormData) => {
    'use server'
  }

  return (
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
  )
}

export default DisoverBooksScreen