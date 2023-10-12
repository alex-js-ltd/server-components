import * as React from 'react'

import { FaStar } from 'react-icons/fa'

import { ListItem } from '@prisma/client'

const Rating = ({ listItem }: { listItem: ListItem }) => {
  const rootClassName = `list-item-${listItem.id}`

  const stars = Array.from({ length: 5 }).map((x, i) => {
    const ratingId = `rating-${listItem.id}-${i}`
    const ratingValue = i + 1
    return (
      <React.Fragment key={i}>
        <input
          name={rootClassName}
          type="radio"
          id={ratingId}
          value={ratingValue}
          checked={ratingValue === listItem.rating}
          className={`sr-only ${
            ratingValue === listItem.rating
              ? 'text-orange-300'
              : 'text-gray-400'
          } hover:text-orange }`}
        />
        <label
          htmlFor={ratingId}
          className={
            listItem.rating && listItem.rating < 0
              ? 'text-gray-400'
              : 'text-orange-300'
          }
        >
          <FaStar className="w-4 h-4 mx-1" />
        </label>
      </React.Fragment>
    )
  })

  return (
    <div
      className={`inline-flex items-center ${rootClassName} hover:text-orange`}
    >
      <span className="flex">{stars}</span>
    </div>
  )
}

export default Rating
