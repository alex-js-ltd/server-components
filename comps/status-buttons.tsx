import type { Book } from '@prisma/client'
import { Fragment } from 'react'
import { SubmitButton } from './buttons'
import * as actions from '@/utils/actions'

const TooltipButton = ({
  action,
  book,
}: {
  action: (book: Book, data: FormData) => Promise<void>
  book: Book
}) => {
  const actionWithArgument = action.bind(null, book)
  return (
    <form action={actionWithArgument}>
      <SubmitButton />
    </form>
  )
}

const StatusButtons = ({ book }: { book: Book }) => {
  return (
    <Fragment>
      <TooltipButton action={actions.createListItem} book={book} />
    </Fragment>
  )
}

export default StatusButtons
