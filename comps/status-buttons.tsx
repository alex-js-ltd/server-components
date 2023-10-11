import type { Book } from '@prisma/client'
import { Fragment } from 'react'
import { CircleForm } from './form-elements'
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
    <CircleForm action={actionWithArgument}>
      <button type="submit">xxxxxxxxx</button>
    </CircleForm>
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
