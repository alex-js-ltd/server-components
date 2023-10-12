import ListItemList from '@/comps/list-item-list'
import Link from 'next/link'

const AuthenticatedApp = () => (
  <ListItemList
    filterListItems={li => !li.finishDate}
    noListItems={
      <p>
        Hey there! Welcome to your bookshelf reading list. Get started by
        heading over to{' '}
        <Link className="text-indigo-600" href="/discover">
          the Discover page{' '}
        </Link>
        to add books to your list.
      </p>
    }
    noFilteredListItems={
      <p>
        Looks like you've finished all your books! Check them out in your{' '}
        <Link className="text-indigo-600" href="/finished">
          finished books{' '}
        </Link>
        or{' '}
        <Link className="text-indigo-600" href="/discover">
          discover more
        </Link>
        .
      </p>
    }
  />
)

export default AuthenticatedApp
