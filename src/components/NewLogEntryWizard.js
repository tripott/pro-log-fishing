import React from 'react'
import { TextField, Panel } from 'jrs-react-components'
import { equals, identity } from 'ramda'
import { connect } from 'react-redux'
import {
	SET_LOG_ENTRY_NAME,
	SET_LOG_ENTRY_TIDE,
	SET_LOG_ENTRY_WATER_TEMP,
	RESET_LOG_ENTRY,
	RESET_NEW_LOG_ENTRY_PANEL,
	SET_LOG_ENTRY_ID,
	SET_LOG_ENTRY_START_DATE,
	SET_LOG_ENTRY_NOTES
} from '../actions/actions'

import {
	getCurrentLocationCoords,
	newLogEntryWizardPanelNexting,
	newLogEntryWizardPanelPreviousing
} from '../actions/actioncreators'

import moment from 'moment'
const PouchDB = require('pouchdb')
const db = new PouchDB('fishing')

const NewLogEntryWizard = props => {
	console.log('props.panel', props.panel)
	return (
		<div className="pa4">

			{equals(props.panel, 'step1') &&
				<Panel
					themeStyles={props.themeStyles}
					title="New Spot (Step 1 of 4)"
					onNext={e => props.next('step2')}
				>
					<TextField
						label="Name"
						value={props.logEntry.name}
						onChange={e => props.setName(e.target.value)}
					/>
				</Panel>}

			{equals(props.panel, 'step2') &&
				<Panel
					themeStyles={props.themeStyles}
					title="New Spot (Step 2 of 4)"
					onPrevious={e => props.previous('step1')}
					onNext={e => props.next('step3')}
				>
					<TextField
						label="Tide Height"
						width="10"
						value={props.logEntry.tide.height}
						onChange={e =>
							props.setTide({
								height: e.target.value,
								units: 'ft',
								stage: props.logEntry.tide.stage
							})}
					/>

					<div className="cf">
						<div
							className={`fl pa2 ba tc br1 pointer ${equals(props.logEntry.tide.stage, 'Rising') && 'bg-black white b--black'}`}
							onClick={e => {
								props.setTide({
									height: props.logEntry.tide.height,
									units: 'ft',
									stage: 'Rising'
								})
								props.next('step3')
							}}
						>
							Rising
						</div>
						<div
							className={`fl mh1 pa2 ba tc br1 pointer ${equals(props.logEntry.tide.stage, 'Falling') && 'bg-black white b--black'}`}
							onClick={e => {
								props.setTide({
									height: props.logEntry.tide.height,
									units: 'ft',
									stage: 'Falling'
								})
								props.next('step3')
							}}
						>
							Falling
						</div>
					</div>
				</Panel>} {equals(props.panel, 'step3') &&
				<Panel
					themeStyles={props.themeStyles}
					title="Water Temp (Step 3 of 4)"
					onPrevious={e => props.previous('step2')}
					onNext={e => props.next('step4')}
				>
					<TextField
						label="Water Temp (F)"
						width="12"
						value={props.logEntry.waterTemp.temp}
						onChange={e =>
							props.setWaterTemp({
								temp: e.target.value,
								units: 'F'
							})}
					/>
				</Panel>} {equals(props.panel, 'step4') &&
				<Panel
					themeStyles={props.themeStyles}
					title="Add a note (Step 4 of 4)"
					onPrevious={e => props.previous('step3')}
					onFinish={e => {
						props.add(props.logEntry)
						props.reset()
						props.history.push('/')
					}}
				>
					<TextField
						label="Notes"
						width="100"
						value={props.logEntry.notes}
						onChange={e => props.setNotes(e.target.value)}
					/>
				</Panel>}
		</div>
	)
}

const mapActionsToProps = dispatch => {
	return {
		reset: () => {
			dispatch({ type: RESET_NEW_LOG_ENTRY_PANEL })
			dispatch({ type: RESET_LOG_ENTRY })
		},
		setTide: tide => {
			dispatch({ type: SET_LOG_ENTRY_TIDE, payload: tide })
		},
		setWaterTemp: temp => {
			dispatch({ type: SET_LOG_ENTRY_WATER_TEMP, payload: temp })
		},
		setNotes: notes => {
			dispatch({ type: SET_LOG_ENTRY_NOTES, payload: notes })
		},
		setName: name => {
			const startDate = moment().format()
			const newPKID = `entry_${startDate}_${name}`

			dispatch({ type: SET_LOG_ENTRY_ID, payload: newPKID })
			dispatch({ type: SET_LOG_ENTRY_START_DATE, payload: startDate })
			dispatch({ type: SET_LOG_ENTRY_NAME, payload: name })
		},
		previous: panel => dispatch(newLogEntryWizardPanelPreviousing(panel)),

		next: panel => {
			if (panel === 'step2') {
				dispatch(getCurrentLocationCoords())
			}

			dispatch(newLogEntryWizardPanelNexting(panel))
		},
		add: logEntry => {
			db
				.put(logEntry)
				.then(function(response) {
					// handle response
				})
				.catch(function(err) {
					console.log(err)
				})
		}
	}
}

const connector = connect(identity, mapActionsToProps)

export default connector(NewLogEntryWizard)
