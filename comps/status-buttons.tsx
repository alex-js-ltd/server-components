import type { Book } from '@prisma/client'
import { Fragment } from 'react'
import { CircleButton } from './buttons'
import * as actions from '@/utils/actions'

const TooltipButton = ({ book }: { book: Book }) => {
  return (
    <form>
      {Object.entries(book).map(([key, value]) => (
        <input key={key} name={key} value={value} />
      ))}
      <CircleButton type="submit">x</CircleButton>
    </form>
  )
}

const StatusButtons = ({ book }: { book: Book }) => {
  return (
    <Fragment>
      <TooltipButton book={book} />
    </Fragment>
  )
}

export default StatusButtons
