import type { Book } from '@prisma/client'
import { Fragment } from 'react'
import { CircleButton } from './buttons'

const TooltipButton = () => {
  return <CircleButton></CircleButton>
}

const StatusButtons = ({ book }: { book: Book }) => {
  return <Fragment></Fragment>
}

export default StatusButtons
