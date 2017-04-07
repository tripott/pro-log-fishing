import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const LogEntryListItem = (props) => {
  let { _id, name, notes, startDateTime } = props.logEntry

  startDateTime = moment.utc(startDateTime).format('lll').toString()

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
