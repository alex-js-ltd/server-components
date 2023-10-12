import type { ListItem } from '@prisma/client'
import { Fragment } from 'react'

import { FaStar } from 'react-icons/fa'

const Rating = ({ listItem }: { listItem: ListItem }) => {
  const rootClassName = `list-item-${listItem.id}`

  const stars = Array.from({ length: 5 }).map((x, i) => {
    const ratingId = `rating-${listItem.id}-${i}`
    const ratingValue = i + 1
    return (
      <Fragment key={i}>
        <input
          name={rootClassName}
          type="radio"
          id={ratingId}
          value={ratingValue}
          checked={ratingValue === listItem.rating}
        />
        <label htmlFor={ratingId}>
          <span className="border-0 clip-none h-1 w-1 m-n1 overflow-hidden p-0 absolute">
            {ratingValue} {ratingValue === 1 ? 'star' : 'stars'}
          </span>
          <FaStar css={{ width: '16px', margin: '0 2px' }} />
        </label>
      </Fragment>
    )
  })
  return (
    <div className="inline-flex items-center group hover:text-orange">
      <span className="flex">{stars}</span>
    </div>
  )
}

export default Rating
