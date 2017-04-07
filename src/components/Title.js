import React from 'react'
import {propOr} from 'ramda'
const Title = (props) => {

  const name = propOr('N/A', 'name', props)
  const startDateTime = propOr('', 'startDateTime', props)

  return (
    <div className="pa3 fl w-50 w-50-ns tc bg-white">
      <div className="pa1 fl v-mid w-100 ">
        <h1 className="f3-m f2-l black-70 fw2 mt3 mb0">{name}</h1>
      </div>

      <div className="fl w-100 ">
        <h2 className="f5 fw5 black-40 mt1 mb1 lh-copy">{startDateTime}</h2>
      </div>
    </div>
  )
}

export default Title
