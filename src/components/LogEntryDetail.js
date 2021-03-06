import React from 'react'
import { connect } from 'react-redux'
import { find, propEq, propOr, pathOr, map } from 'ramda'
import moment from 'moment'
import MapContainer from './MapContainer'
import Rating from './Rating'
import Title from './Title'
import Notes from './Notes'
import Tide from './Tide'
import WaterTemp from './WaterTemp'
import Wind from './Wind'
import Weather from './Weather'
import Fish from './Fish'
import { FloatingButton, IconButton } from 'react-buttons'
import { Link } from 'react-router-dom'

import { prop, path, split, compose, last } from 'ramda'

const PouchDB = require('pouchdb')
const db = new PouchDB('fishing')

const LogEntryDetail = props => {
	const pathID = prop('match')(props)
		? path(['match', 'params', 'id'])(props)
		: compose(last, split('/'), path(['location', 'pathname']))(props)

	const logEntry = find(propEq('_id', pathID))(props.log)
	const name = propOr('', 'name', logEntry)
	const notes = propOr('No notes provided.', 'notes', logEntry)
	const rating = propOr('', 'rating', logEntry)

	let startDateTime = propOr('', 'startDateTime', logEntry)
	startDateTime = moment.utc(startDateTime).format('lll').toString()

	const position = propOr('', 'position', logEntry)
	const centerMap = position === '' ? true : false

	const height = pathOr('', ['tide', 'height'], logEntry)
	const units = pathOr('', ['tide', 'units'], logEntry)
	const stage = pathOr('', ['tide', 'stage'], logEntry)

	const waterTemp = pathOr('', ['waterTemp', 'temp'], logEntry)
	const waterUnits = pathOr('', ['waterTemp', 'units'], logEntry)

	const windSpeed = pathOr('', ['wind', 'speed'], logEntry)
	const windUnits = pathOr('', ['wind', 'units'], logEntry)
	const windDirection = pathOr('', ['wind', 'direction'], logEntry)

	const weatherTemp = pathOr('', ['weather', 'temp'], logEntry)
	const weatherUnits = pathOr('', ['weather', 'units'], logEntry)
	const weatherDesc = pathOr('', ['weather', 'desc'], logEntry)
	const weatherIconURL = pathOr('', ['weather', 'wu_icon'], logEntry)

	const fishes = pathOr([], ['fishes'], logEntry)

	const fishItems = map(
		fish => (
			<Fish
				fishName={fish.species}
				fishTime={fish.time}
				fishStats={fish.stats}
				key={fish.time}
			/>
		),
		fishes
	)

	if (position === '') {
		return <div>Loading Map...</div>
	}

	return (
		<div>
			<div className="vh-25 cover bg-center">
				<MapContainer
					mapCenter={position}
					mapCenterCurrLoc={centerMap}
					mapZoom={14}
					mapStyle={{ width: '100%', height: '25%', position: 'relative' }}
				/>
			</div>

			<div className="cf">
				<Title name={name} startDateTime={startDateTime} />
				<Rating rating={rating} />
				<Notes notes={notes} />

				<div className="pa2 pb3 fl w-100 tc bg-black-10">
					<main className="mw6 center">
						{fishItems}
					</main>
				</div>
				<div>
					<Tide height={height} units={units} stage={stage} />
					<WaterTemp temp={waterTemp} units={waterUnits} />
					<Wind speed={windSpeed} units={windUnits} direction={windDirection} />
					<Weather
						temp={weatherTemp}
						units={weatherUnits}
						desc={weatherDesc}
						url={weatherIconURL}
					/>

				</div>
			</div>
			<div>
				<Link className="dim blue" to="/log">
					<FloatingButton
						color="primary"
						helpPosition="top"
						faIcon="home"
						label="back to fishing spots"
						onClick={e => e}
					/>
				</Link>

				<IconButton
					color="error"
					helpPosition="right"
					faIcon="trash"
					label="delete this spot"
					onClick={e => {
						props.delete(logEntry)

						props.history.push('/log')
					}}
				/>

			</div>
		</div>
	)
}

const mapActionsToProps = dispatch => {
	return {
		delete: logEntry => {
			db
				.remove(logEntry)
				.then(function(response) {
					// handle response
				})
				.catch(function(err) {
					console.log(err)
				})
		}
	}
}

const mapStateToProps = function(state) {
	return {
		log: state.log,
		dbStatus: state.dbStatus
	}
}

const connector = connect(mapStateToProps, mapActionsToProps)
export default connector(LogEntryDetail)
