import { Input } from './form-elements'
import { FaSearch } from 'react-icons/fa'

const SearchForm = ({ defaultValue }: { defaultValue: string }) => {
  return (
    <form className="mb-5">
      <Input
        placeholder="Search books..."
        name="query"
        className="w-full"
        defaultValue={defaultValue}
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
  )
}

export default SearchForm
