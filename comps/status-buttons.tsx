import type { Book, ListItem } from '@prisma/client'
import type { ReactElement } from 'react'
import type { CircleButtonProps } from './buttons'
import { Fragment } from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
} from 'react-icons/fa'
import { SubmitCircleButton } from './buttons'
import * as actions from '@/utils/actions'

const TooltipButton = <DataType,>({
  action,
  book,
  icon,
  variant,
}: {
  action: (book: DataType) => Promise<void>
  book: DataType
  icon: ReactElement
  variant?: CircleButtonProps['variant']
}) => {
  const actionWithArgument = action.bind(null, book)
  return (
    <form action={actionWithArgument}>
      <SubmitCircleButton variant={variant} icon={icon} />
    </form>
  )
}

const StatusButtons = async ({ book }: { book: ListItem }) => {
  const listItem = await actions.getListItem(book.bookId)

  console.log('listItem', listItem)
  return (
    <Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton<ListItem>
            action={actions.markAsUnRead}
            book={listItem}
            icon={<FaBook />}
            variant="yellow"
          />
        ) : (
          <TooltipButton<ListItem>
            action={actions.markAsRead}
            book={listItem}
            icon={<FaCheckCircle />}
            variant="green"
          />
        )
      ) : null}

      {listItem ? (
        <TooltipButton<ListItem>
          action={actions.removeListItem}
          book={listItem}
          icon={<FaMinusCircle />}
          variant="red"
        />
      ) : (
        <TooltipButton<Book>
          action={actions.createListItem}
          book={book}
          icon={<FaPlusCircle />}
          variant="blue"
        />
      )}
    </Fragment>
  )
}

export default StatusButtons
