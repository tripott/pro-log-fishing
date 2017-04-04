import React, { Component } from 'react'
import { connect } from 'react-redux'
import {map} from 'ramda'
import ListItem from './LogEntryListItem'

const List = (props) => {

  const listItems = map(logEntry =>  <ListItem key={logEntry.startDateTime} logEntry={logEntry} {...props} />, props.log)
  const loading = <i className="icon-spinner icon-spin icon-large"></i>

  const display = props.isDataLoaded ? listItems : loading
  return (
    <div className="pa4">
      <h1>Fishing Log</h1>
      <main className="mw6 center">
        {display}
      </main>
      <h3>{props.counter}</h3>
        <button onClick={e=>props.dispatch({type: 'INCR', playload: null})}>+</button>
        <button onClick={e=>props.dispatch({type: 'DECR', playload: null})}>-</button>
    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    log: state.log,
    counter: state.counter,
    isDataLoaded: state.isDataLoaded
  }
}

const connector = connect(mapStateToProps)
export default connector(List);
