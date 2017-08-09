import React from 'react'
import { connect } from 'react-redux'
import { map } from 'ramda'
import ListItem from './LogEntryListItem'
import { Link } from 'react-router-dom'
import { FloatingButton } from 'react-buttons'
import MainHeader from './MainHeader'
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

  return (
    <div>
      <MainHeader title="ProLog" auth={props.auth} target="/log/new" />
      <div className="pa4 tc">

        <main>
          <div className="cf">
            {listItems}
          </div>
        </main>

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
  return {
    log: state.log,
    dbStatus: state.dbStatus,
    themeStyles: state.themeStyles
  }
}

const connector = connect(mapStateToProps)
export default connector(List)
