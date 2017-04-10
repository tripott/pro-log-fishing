import React from 'react'
import {propOr} from 'ramda'

const Fish = (props) => {

  const name = propOr('N/A', 'fishName', props)
  const time = propOr('', 'fishTime', props)
  const stats = propOr('', 'fishStats', props)

  return (
    <article className="dt w-100 bb b--black-05 pb2 mt2" href="#0">
      <div className="dtc v-mid pl3">
        <h1 className="f4 fw2 lh-title black mv0">{name} <span className="f4 fw2 mt0 mb0 black-60"> ({stats}) </span>  @ {time} </h1>
      </div>
      <div className="dtc v-mid">
        <form className="w-100 tr">
          <button className="f6 button-reset bg-white ba b--black-10 dim pointer pv1 black-60" type="submit">+ Add</button>
        </form>
      </div>
    </article>
  )
}

export default Fish
