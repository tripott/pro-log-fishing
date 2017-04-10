import React from 'react'
import {propOr} from 'ramda'

const Weather = (props) => {

  const temp = propOr('--', 'temp', props)
  const units = propOr('--', 'units', props)
  const desc = propOr('--', 'desc', props)

  let tempColor = "lightest-blue"

  if (temp < 33) tempColor = "blue"
  if (temp > 32 && temp < 46) tempColor = "lightest-blue"
  if (temp > 45 && temp < 61) tempColor = "light-yellow"
  if (temp > 60 && temp < 76) tempColor = "light-red"
  if (temp > 75) tempColor = "dark-red"

  let weatherImage = "sunny.svg"

  if (desc === "partly cloudy") weatherImage = "partly-cloudy.svg"
  if (desc === "rain") weatherImage = "rain.svg"
  if (desc === "sunny") weatherImage = "sunny.svg"


  return (
    <div className={`pa3 fl w-50 w-25-ns tc bg-${tempColor}`}>
      <div className="pa1 fl v-mid w-50 ">
        <h1 className="f3  fw2 black">{temp} <span className="f5 fw1">{units}</span></h1>
      </div>
      <div className="pa3 fl w-50">
        <img
        src= {`/${weatherImage}`}
        alt= {desc}
        height="60px"
        width="60px" />
      </div>
      <div className="fl w-100">
        <h2 className="f3  fw2 black-50 mt0 lh-copy">{desc}</h2>
      </div>
    </div>
  )
}

export default Weather
