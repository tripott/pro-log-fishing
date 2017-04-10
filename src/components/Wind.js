import React from 'react'
import {propOr} from 'ramda'

const Wind = (props) => {

  const speed = propOr('--', 'speed', props)
  const units = propOr('--', 'units', props)
  const direction = propOr('--', 'direction', props)

  let backgroundColor = "lightest-blue"

  if (speed < 6) {
    backgroundColor = "lightest-blue"
  }
  if (speed > 5 && speed < 11) {
    backgroundColor = "light-blue"
  }
  if (speed > 10 && speed < 21) {
    backgroundColor = "light-yellow"
  }
  if (speed > 20 && speed < 76) {
    backgroundColor = "light-red"
  }


  /*
  fa-thermometer-empty            // below 32
  fa-thermometer-quarter          // 32 to 45
  fa-thermometer-half             // 46 to 70
  fa-thermometer-three-quarters   // 71 to 85
  fa-thermometer-full             // above 86
  */


  return (
    <div className={`pa3 fl w-50 w-25-ns tc bg-${backgroundColor}`}>
      <div className="pa1 fl v-mid w-50 ">
        <h1 className="f3 fw2 black-90">{speed} <span className={"f5 fw1 black-90"}>{units}</span></h1>
      </div>
      <div className="pa3 fl w-50" >
        <img
        src="/wind-turbine.svg"
        alt="windy"
        height="60px"
        width="60px" />
      </div>
      <div className="fl w-100">
        <h2 className={"f3 fw1 black-50 mt0 lh-copy"}>wind ({direction})</h2>
      </div>
    </div>
  )
}

export default Wind
