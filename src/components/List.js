import React from 'react'

import { connect } from 'react-redux'
import { map, last, propOr, compose, prop } from 'ramda'
import ListItem from './LogEntryListItem'
import { Link } from 'react-router-dom'
import { FloatingButton, IconButton } from 'react-buttons'
import MainHeader from './MainHeader'
import {
  getMoreDBLogEntries,
  getDBLogEntries, listen, sync} from '../syncronize'

const List = props => {
  var count = 0
  var bgColor = 'bg-black-10'

  const li = map(logEntry => {
    count += 1
    count % 2 === 0 ? (bgColor = 'bg-black-10') : (bgColor = 'bg-black-30')

    return (
      <ListItem
        themeStyles={props.themeStyles}
        key={logEntry.startDateTime}
        logEntry={logEntry}
        backgroundColor={bgColor}
        width="w-100"
        {...props}
      />
    )
  })

  const status = props.dbStatus
  let statusTextColor = 'black-70'

  switch (status) {
    case 'Loading':
      statusTextColor = 'blue'
      break
    case 'Syncing':
      statusTextColor = 'blue'
      break
    case 'Paused':
      statusTextColor = 'black-70'
      break
    case 'Resumed':
      statusTextColor = 'blue'
      break
    case 'Data failed to replicate':
      statusTextColor = 'red'
      break
    case 'Complete':
      statusTextColor = 'green'
      break
    case 'Error':
      statusTextColor = 'red'
      break
    default:
      statusTextColor = 'black-70'
  }

  const listItems = li(props.log)

  const profileSub = props.session.profile.sub
  const limit = propOr(5, 'limit', props)
  const lastItem = compose(propOr(null, 'startDateTime'), last)(propOr([], 'log', props))


//  console.log('List.js is being rendered')
  return (
    <div>
      <MainHeader session={props.session} title="ProLog" auth={props.auth} target="/log/new" />
      <div className="pa4 tc">

        <main>
          <div className="cf">
            {listItems}
          </div>
        </main>
        <div>
            <IconButton
              faIcon="step-forward"
              label="Next log entries"
              onClick={e => {
    						props.getMoreLog(profileSub, lastItem, limit)
    					}}
            />
        </div>

      </div>

      <footer className="black-70">
        <div className="db">
          <p className={`pa2 f7 bg-${statusTextColor} white`}>
            Sync status: {status}
          </p>
        </div>
      </footer>

      <div>
        <Link className="dim blue" to="/log/new">
          <FloatingButton
            faIcon="map-marker"
            label="Add a fishing spot"
            onClick={e => e}
          />
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = function(state) {
  //console.log('state session: ', JSON.stringify(state.session, null, 2))
  return {
    log: state.log,
    dbStatus: state.dbStatus,
    themeStyles: state.themeStyles,
    session: state.session
  }
}

const mapActionsToProps = dispatch => {
	return {
		getMoreLog: (profileSub, lastItem, limit) => {
      console.log("getMoreLog")
      getMoreDBLogEntries(profileSub, lastItem, limit)

		}
	}
}

const connector = connect(mapStateToProps, mapActionsToProps)
export default connector(List)
