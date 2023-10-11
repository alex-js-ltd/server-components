import type { Book } from '@prisma/client'
import type { ReactElement } from 'react'
import { Fragment } from 'react'
import {
  FaCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
  FaBook,
  FaTimesCircle,
} from 'react-icons/fa'
import { SubmitButton } from './buttons'
import * as actions from '@/utils/actions'

const TooltipButton = ({
  action,
  book,
  icon,
}: {
  action: (book: Book) => Promise<void>
  book: Book
  icon: ReactElement
}) => {
  const actionWithArgument = action.bind(null, book)
  return (
    <form action={actionWithArgument}>
      <SubmitButton icon={icon} />
    </form>
  )
}

const StatusButtons = ({ book }: { book: Book }) => {
  return (
    <Fragment>
      <TooltipButton
        action={actions.createListItem}
        book={book}
        icon={<FaPlusCircle />}
      />
    </Fragment>
  )
}

export default StatusButtons
