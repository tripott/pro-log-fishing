import React from 'react'
import {propOr} from 'ramda'

const WaterTemp = (props) => {

  const temp = propOr('--', 'temp', props)
  const units = propOr('--', 'units', props)

  let mercury = "half"
  let tempColor = "lightest-blue"

  if (temp < 33) {
    mercury = "empty"
    tempColor = "blue"
  }
  if (temp > 32 && temp < 46) {
    mercury = "quarter"
    tempColor = "lightest-blue"
  }
  if (temp > 45 && temp < 61) {
    mercury = "half"
    tempColor = "light-yellow"
  }
  if (temp > 60 && temp < 76) {
    mercury = "three-quarters"
    tempColor = "light-red"
  }
  if (temp > 75) {
    mercury = "full"
    tempColor = "dark-red"
  }

  /*
  fa-thermometer-empty            // below 32
  fa-thermometer-quarter          // 32 to 45
  fa-thermometer-half             // 46 to 70
  fa-thermometer-three-quarters   // 71 to 85
  fa-thermometer-full             // above 86
  */


  return (
    <div className={`pa3 fl w-50 w-25-ns tc dark-gray bg-${tempColor}`}>
      <div className="pa1 fl v-mid w-50 ">
        <h1 className="f3  fw3 black-90">{temp} <span className="f5 fw1">{units}</span></h1>
      </div>
      <div className="pa3 fl w-50 ">
        <i className={`fa fa-thermometer-${mercury} fa-4x`} aria-hidden="true"></i>
      </div>
      <div className="fl w-100 ">
        <h2 className="f3  fw2 black-50 mt0 lh-copy">water temp</h2>
      </div>
    </div>
  )
}

export default WaterTemp
