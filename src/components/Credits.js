import React from 'react'
import { connect } from 'react-redux'
import {map} from 'ramda'
import ListItem from './LogEntryListItem'

const List = (props) => {
  return (
    <div className="pa4">
      <h1>Credits</h1>
      <h2>Icons</h2>
      <ul>
        <li>Wind Turbine by Sven Gabriel from the Noun Project</li>
        <li>Wind by Sven Gabriel from the Noun Project</li>
        <li>sun and cloud by Arthur Shlain from the Noun Project</li>
        <li>sun by Arthur Shlain from the Noun Project</li>
        <li>rain by Arthur Shlain from the Noun Project</li>
        <li>rating stars by Nikita Kozin from the Noun Project</li>
      </ul>
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
