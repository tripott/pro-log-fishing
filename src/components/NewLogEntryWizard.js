import React from 'react'
import { Button, TextField, Panel } from 'jrs-react-components'
import { equals, identity } from 'ramda'
import { connect } from 'react-redux'
import {
  ADD,
  PREVIOUS,
  NEXT,
  RESET,
  SET_LOG_ENTRY_NAME,
  SET_LOG_ENTRY_TIDE,
  RESET_LOG_ENTRY,
  SET_LOG_ENTRY_ID,
  SET_LOG_ENTRY_START_DATE
} from '../actions'

import moment from 'moment'

const PouchDB = require('pouchdb')
const db = new PouchDB('fishing')

const NewLogEntryWizard = props => {
  return (
    <div className='pa4'>

        {equals(props.panel, 'step1') && (

          <Panel title='Create Fishing Spot (1 of 2)' onNext={e => props.next('step2')} >
            <h2>Enter Fishing Spot Name (Step 1 of 2)</h2>
              <TextField
                label='Name'
                value={props.logEntry.name}
                onChange={e => props.setName(e.target.value)}
                />
          </Panel>
        )}

          {equals(props.panel, 'step2') && (
          <Panel
            title='Create Fishing Spot (2 of 2)'
            onPrevious={e => props.previous('step1')}
            onFinish={e => {
              props.add(props.logEntry)
              props.reset()
              props.history.push('/')
            }}>
            <h2>Enter Tide (Step 2 of 2)</h2>
            <TextField
              label='Tide Height' width='10'
              value={props.logEntry.tide.height}
              onChange={e => props.setTide({height: e.target.value, units: "ft", stage: props.logEntry.tide.stage})}
              />


            <div className="cf">
              <div className={`fl pa2 ba tc br1 pointer ${equals(props.logEntry.tide.stage, "Rising") && 'bg-black white b--black'}`} onClick={e => props.setTide({height: props.logEntry.tide.height, units: "ft", stage: "Rising"})}>Rising</div>
              <div className={`fl mh1 pa2 ba tc br1 pointer ${equals(props.logEntry.tide.stage, "Falling") && 'bg-black white b--black'}`} onClick={e => props.setTide({height: props.logEntry.tide.height, units: "ft", stage: "Falling"})}>Falling</div>
            </div>
          </Panel>
              )}
    </div>
  )
}

const mapActionsToProps = dispatch => {
  return {
    reset: () => {
      dispatch({ type: RESET })
      dispatch({ type: RESET_LOG_ENTRY })
    },
    setTide: tide => {
      dispatch({ type: SET_LOG_ENTRY_TIDE, payload: tide })
    },
    setName: name => {
      const startDate = moment().format()
      const newPKID = `entry_${startDate}_${name}`
      console.log("newPKID",newPKID )
      dispatch({type: SET_LOG_ENTRY_ID, payload: newPKID})
      dispatch({type: SET_LOG_ENTRY_START_DATE, payload: startDate })
      dispatch({ type: SET_LOG_ENTRY_NAME, payload: name })
    },
    previous: panel => dispatch({ type: PREVIOUS, payload: panel }),
    next: panel => dispatch({ type: NEXT, payload: panel }),
    add: logEntry => {

      db.put(logEntry).then(function (response) {
          // handle response
        }).catch(function (err) {
          console.log(err);
        });
      //dispatch({ type: ADD, payload: logEntry })
    }
  }
}

const connector = connect(identity, mapActionsToProps)

export default connector(NewLogEntryWizard)