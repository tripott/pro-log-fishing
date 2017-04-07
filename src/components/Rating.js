import React from 'react'
import {propOr} from 'ramda'
const Rating = (props) => {

  const rating = propOr('', 'rating', props)
  const ratingStyle = propOr('pa3 fl w-50 w-50-ns tc bg-white', 'ratingStyle', props)
  let src = "rating-no-stars.svg"
  
  switch (rating) {
        case 1:
            src = "rating-1-star.svg"
            break
        case 2:
            src = "rating-2-stars.svg"
            break
        case 3:
            src = "rating-3-stars.svg"
            break
        case 4:
            src = "rating-4-stars.svg"
            break
        case 5:
            src = "rating-5-stars.svg"
            break
        default:
            src = "rating-no-stars.svg"
    }

  return (
    <div className={ratingStyle}>
      <div className="">
        <img
        src={`/${src}`}
        alt={src}
        height="150px"
         />
      </div>
    </div>
  )
}

export default Rating
