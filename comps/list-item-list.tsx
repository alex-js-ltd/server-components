import type { ListItem } from '@prisma/client'
import * as actions from '@/utils/actions'
import BookList from './book-list'

type Props = {
  filterListItems: (li: ListItem) => boolean
}

const ListItemList = async ({ filterListItems }: Props) => {
  const listItems = (await actions.getListItems()) ?? []

  const filteredListItems = listItems.filter(filterListItems)

  return <BookList books={filteredListItems} />
}

export default ListItemList
