import React from 'react'
import { connect } from 'react-redux'
import { find, propEq, view, propOr } from 'ramda'
import moment from 'moment'
import MapContainer from './MapContainer'


//GOOGLE API KEY:  AIzaSyA6PNXwjUhL0VD7WYutPfLVKILzvj74Y-8
const LogEntryDetail = (props) => {

  const logEntry = find(propEq('_id', props.match.params.id))(props.log)
  const name = propOr('', 'name', logEntry)
//  const startDateTime = moment(propOr('', 'startDateTime', logEntry), 'lll')
  let startDateTime = propOr('', 'startDateTime', logEntry)
  startDateTime = moment.utc(startDateTime).format('lll').toString()

  const position = propOr('', 'position', logEntry)
  const centerMap = position === '' ? true : false
  //{{lat: 37.762391, lng: -122.439192}}
  if (position === '') {
    return <div>Loading Map...</div>
  }

  return (
    <div>
      <div  className="vh-25 cover bg-center">
        <MapContainer
          mapCenter={position}
          mapCenterCurrLoc={centerMap}
          mapZoom={14}
          mapStyle={{width: '100%', height: '25%', position: 'relative'}}/>
      </div>
      <header className="tc">
        <h1 className="f4 f3-m f2-l fw2 mt1 mb0 black-90">
          {name}
        </h1>
        <h2 className="f6 f5-m f4-l fw2 black-50 mt0 mb1 lh-copy">
          {startDateTime}
        </h2>
      </header>

      <div className="cf">
        <div className="fl w-50 w-20-ns tc pv5 bg-black-20">
          1
        </div>
        <div className="fl w-50 w-20-ns tc pv5 bg-black-10">
          2
        </div>
        <div className="fl w-50 w-20-ns tc pv5 bg-black-15">
          3
        </div>
        <div className="fl w-50 w-20-ns tc pv5 bg-black-20">
          4
        </div>
        <div className="fl w-50 w-20-ns tc pv5 bg-black-30">
          5
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    log: state.log,
    dbStatus: state.dbStatus
  }
}

const connector = connect(mapStateToProps)
export default connector(LogEntryDetail);
