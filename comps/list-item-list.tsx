import type { ListItem } from '@prisma/client'
import type { ReactNode } from 'react'
import BookList from './book-list'
import * as actions from '@/utils/actions'

type Props = {
  filterListItems: (li: ListItem) => boolean
  noListItems: ReactNode
  noFilteredListItems: ReactNode
}

const ListItemList = async ({
  filterListItems,
  noListItems,
  noFilteredListItems,
}: Props) => {
  const listItems = (await actions.getListItems()) ?? []

  const filteredListItems = listItems.filter(filterListItems)

  if (!listItems.length) {
    return <div className="mt-4 text-lg [&>p]:text-gray-600">{noListItems}</div>
  }
  if (!filteredListItems.length) {
    return (
      <div className="mt-4 text-lg [&>p]:text-gray-600">
        {noFilteredListItems}
      </div>
    )
  }

  return <BookList books={filteredListItems} />
}

export default ListItemList
