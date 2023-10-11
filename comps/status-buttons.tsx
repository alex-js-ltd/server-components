import type { Book } from '@prisma/client'
import { Fragment } from 'react'
import { CircleForm } from './form-elements'
import * as actions from '@/utils/actions'

const TooltipButton = ({
  action,
  book,
}: {
  action: (data: FormData) => Promise<void>
  book: Book
}) => {
  return (
    <CircleForm action={action}>
      {Object.entries(book).map(([key, value]) => (
        <input key={key} name={key} defaultValue={value} />
      ))}
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
