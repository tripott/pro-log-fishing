import React from 'react'
import {propOr, toLower} from 'ramda'
const Tide = (props) => {

  const height = propOr('--', 'height', props)
  const units = propOr('--', 'units', props)
  const stage = toLower(propOr('--', 'stage', props))

  const arrow = stage === 'falling' ? 'down' : 'up'

  return (
    <div className="pa3 fl w-50 w-25-ns tc black bg-light-blue">
      <div className="pa1 fl v-mid w-50 ">
        <h1 className="f3 fw2 black-90">{height} <span className="f5 fw1">{units}</span></h1>
      </div>
      <div className="pa3 fl w-50 ">
        <i className={`fa fa-arrow-circle-o-${arrow} fa-4x`} aria-hidden="true"></i>


      </div>
      <div className="fl w-100 ">
        <h2 className="f3  fw2 black-50 mt0 lh-copy">{stage} tide</h2>
      </div>
    </div>
  )
}

export default Tide
