import React from 'react'
//import 'tachyons/css/tachyons.css'
import { Link } from 'react-router-dom'
const LogEntryListItem = (props) => {
  const { _id, name, position, notes, startDateTime } = props.logEntry

  // {
  //   _id: 1,
  //   name: "Sweet Spot",
  //   startDateTime: "2017-03-31T17:33:29Z",
  //   endDateTime: "2017-03-31T17:33:29Z",
  //   position: {lat: "32.8112502", long: "-79.8748790"},
  //   tide: {height: 4.5, stage: "Falling"},
  //   wind: {speed: 5, units: "mph", direction: "SSW"},
  //   weatherDesc: "Partly Cloudy",
  //   notes: "These are notes.",
  //   fish: [
  //     {species: "Trout (Spotted Sea)", weight: 3, units: "lbs" }
  //   ],
  //   rating: 2
  // }
  //<a className="link dt w-100 bb b--black-10 pb2 mt2 dim blue" href="#0">
  //<i className="fa fa-map-marker fa-3x" aria-hidden="true" alt="marker"></i>

  return (

      <article>
        <Link className="link dt w-100 bb b--black-10 pb2 mt2 dim blue" to={`/log/${_id}`}>
          <div className="dtc w3">
            X
          </div>
          <div className="dtc v-top pl2">
            <h1 className="f6 f5-ns fw6 lh-title black mv0">{startDateTime} - {name}</h1>
            <h2 className="f6 fw4 mt2 mb0 black-60">{notes}</h2>
            <dl className="mt2 f6">
              <dt className="clip">Price</dt>
              <dd className="ml0">{position.lat}</dd>
              <dd className="ml0">{position.lng}</dd>
            </dl>
          </div>
        </Link>
      </article>
  )
}


export default LogEntryListItem
