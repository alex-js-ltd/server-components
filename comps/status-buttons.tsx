import type { Book } from '@prisma/client'
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

const TooltipButton = ({
  action,
  book,
  icon,
  variant,
}: {
  action: (book: Book) => Promise<void>
  book: Book
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

const StatusButtons = async ({ book }: { book: Book }) => {
  const listItem = await actions.getListItem(book.id)
  return (
    <Fragment>
      {listItem ? (
        Boolean(listItem.finishDate) ? (
          <TooltipButton
            action={actions.markAsUnRead}
            book={listItem}
            icon={<FaBook />}
            variant="yellow"
          />
        ) : (
          <TooltipButton
            action={actions.markAsRead}
            book={listItem}
            icon={<FaCheckCircle />}
            variant="green"
          />
        )
      ) : null}

      {listItem ? (
        <TooltipButton
          action={actions.removeListItem}
          book={listItem}
          icon={<FaMinusCircle />}
          variant="red"
        />
      ) : (
        <TooltipButton
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
