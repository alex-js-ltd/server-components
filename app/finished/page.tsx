import ListItemList from '@/comps/list-item-list'
import Link from 'next/link'

const Page = () => (
  <ListItemList
    filterListItems={li => Boolean(li.finishDate)}
    noListItems={
      <p>
        Hey there! This is where books will go when you've finished reading
        them. Get started by heading over to{' '}
        <Link className="text-blue-400" href="/discover">
          the Discover page
        </Link>{' '}
        to add books to your list.
      </p>
    }
    noFilteredListItems={
      <p>
        Looks like you've got some reading to do! Check them out in your{' '}
        <Link className="text-blue-400" href="/list">
          reading list
        </Link>{' '}
        or{' '}
        <Link className="text-blue-400" href="/discover">
          discover more
        </Link>
        .
      </p>
    }
  />
)

export default Page
