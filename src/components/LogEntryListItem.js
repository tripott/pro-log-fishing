import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
const LogEntryListItem = (props) => {
let { _id, name, position, notes, startDateTime } = props.logEntry

startDateTime = moment.utc(startDateTime).format('lll').toString()

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
          <div className="dtc pl3">
            <i className="fa fa-map-pin fa-2x" aria-hidden="true"></i>
          </div>
          <div className="dtc v-top pl3">
            <h1 className="f6 f3-l fw1-l fw5 lh-title black mv0"><span className="fw6">{name}</span> - {startDateTime}</h1>
            <h2 className="f6 fw4 mt2 mb0 black-60">{notes}</h2>
          </div>
        </Link>
      </article>
  )
}


export default LogEntryListItem
