import React from 'react'
import { connect } from 'react-redux'
import {map} from 'ramda'
import ListItem from './LogEntryListItem'
import { Link } from 'react-router-dom'

const List = (props) => {

const listItems = map(logEntry =>  <ListItem key={logEntry.startDateTime} logEntry={logEntry} {...props} />, props.log)
const status = props.dbStatus

let statusTextColor = "black-70"

  switch (status) {
        case 'Loading':
            statusTextColor = "blue"
            break
        case 'Syncing':
            statusTextColor = "blue"
            break
        case 'Paused':
            statusTextColor = "black-70"
            break
        case 'Resumed':
            statusTextColor = "blue"
            break
        case 'Data failed to replicate':
            statusTextColor = "red"
            break
        case 'Complete':
            statusTextColor = "green"
            break
        case 'Error':
            statusTextColor = "red"
            break
        default:
            statusTextColor = "black-70"
    }

  return (
    <div>
      <div className="w-100 pa4">
        <h1>Fishing Log</h1>
        <main className="">
          {listItems}
        </main>


      </div>
      <div>
        <Link className="link dt w-100 bb b--black-10 pb2 mt2 dim blue" to="/log/new">

        </Link>
      </div>
      <footer className="black-70">
        <div className="db">
          <p className={`pa2 f7 bg-${statusTextColor} white`}>
            Sync status: {status}
          </p>
        </div>
      </footer>
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
export default connector(List);
