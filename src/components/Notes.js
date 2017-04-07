import React from 'react'
import {propOr} from 'ramda'
const Notes = (props) => {

  const notes = propOr('No notes provided.', 'notes', props)

  return (
    <div className="pa2 pb3 fl w-100 tc bg-light-gray">
      <div className=" f4 f2-ns measure center">

        <p className="db lh-copy black-70 serif fw1 mv0 pt0 f4 f3-m f2-l measure baskerville">
          "{notes}"
        </p>
      </div>
    </div>
  )
}

export default Notes
