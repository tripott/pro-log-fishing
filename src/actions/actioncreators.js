if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

import {
	LOADING_DATA,
	SET_LOG_ENTRY_POSITION,
	NEXT_NEW_LOG_ENTRY_PANEL,
	PREVIOUS_NEW_LOG_ENTRY_PANEL,
	SET_LOG,
	SYNC_COMPLETE,
	SYNC_CHANGE,
	SYNC_PAUSED,
	SYNC_ACTIVE,
	SYNC_DENIED,
	SYNC_ERROR,
	SET_LOG_ENTRY_WIND,
	SET_LOG_ENTRY_WEATHER
	//  RESET_LOG_ENTRY_TIDE_LOG_ENTRY
} from './actions'
import fetch from 'isomorphic-fetch'
import {
	compose,
	concat,
	replace,
	reduce,
	pluck,
	filter,
	prop,
	head,
	take,
	pathOr,
	contains,
	__
} from 'ramda'

////////////////////
//    Location
////////////////////

const getLocation = () => {
	const geolocation = navigator.geolocation
	const location = new Promise((resolve, reject) => {
		if (!geolocation) {
			reject(new Error('Not Supported'))
		}

		geolocation.getCurrentPosition(
			position => {
				resolve(position)
			},
			() => {
				reject(new Error('Permission denied'))
			}
		)
	})
	return location
}

export function getCurrentLocationCoords() {
	return dispatch => {
		getLocation()
			.then(position => {
				dispatch(setLogEntryPosition(position))
				return reverseGeoCodePosition(position)
			})
			.then(res => res.json())
			.then(function(reverseGeoCodeResult) {
				return compose(
					concat(__, '.json'),
					replace(' ', '_'),
					reduce((acc, val) => '/' + val + acc, ''),
					pluck('short_name'),
					filter(
						ac =>
							contains('administrative_area_level_1', ac.types) ||
							contains('locality', ac.types)
					),
					prop('address_components'),
					head,
					take(1),
					prop('results')
				)(reverseGeoCodeResult)
			})
			.then(location => {
				return getWeatherConditions(location)
			})
			.then(res => res.json())
			.then(weatherConditions => {
				dispatch(setWeatherConditions(weatherConditions))
				dispatch(setWind(weatherConditions))
			})
			.catch(err =>
				console.log(
					'action creators: geolocation() problem getting geolocation, or reverseGeoCodePosition or  getWeatherConditions',
					err
				)
			)
	}
}

export function setLogEntryPosition(position) {
	return {
		type: SET_LOG_ENTRY_POSITION,
		payload: { lat: position.coords.latitude, lng: position.coords.longitude }
	}
}
/////// END LOCATION

/////////////////
//   Weather
/////////////////

function reverseGeoCodePosition(position) {
	// position object parameter example:
	// position: {
	// 	lat: '32.7921705',
	// 	lng: '-79.9060039'
	// }

	const latlng = `${position.coords.latitude},${position.coords.longitude}`

	return fetch(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&sensor=true`,
		{
			method: 'get'
		}
	)
}

function getWeatherConditions(location) {
	// location parameter example:
	// "/SC/Mt_Pleasant.json"

	return fetch(
		`https://api.wunderground.com/api/${process.env.REACT_APP_WU}/conditions/q${location}`,
		{
			method: 'get'
		}
	)
}

export function setWeatherConditions(weatherConditions) {
	// SET_LOG_ENTRY_WEATHER
	// weather: {
	// 	temp: 0,
	// 	units: 'F',
	// 	desc: 'Partly Cloudy'
	// }

	const temp_f = pathOr(
		'N/A',
		['current_observation', 'temp_f'],
		weatherConditions
	)
	const desc = pathOr(
		'N/A',
		['current_observation', 'weather'],
		weatherConditions
	)
	const icon_url = pathOr(
		'N/A',
		['current_observation', 'icon_url'],
		weatherConditions
	)

	return {
		type: SET_LOG_ENTRY_WEATHER,
		payload: { temp: temp_f, units: 'F', desc: desc, wu_icon: icon_url }
	}
}

export function setWind(weatherConditions) {
	// SET_LOG_ENTRY_WIND
	// wind: {
	// 	speed: 5,
	// 	units: 'mph',
	// 	direction: 'SSW',
	//  desc: 'calm'
	// },

	const windDir = pathOr(
		'N/A',
		['current_observation', 'wind_dir'],
		weatherConditions
	)
	const windSpeed = pathOr(
		'N/A',
		['current_observation', 'wind_mph'],
		weatherConditions
	)
	const windDesc = pathOr(
		'N/A',
		['current_observation', 'wind_string'],
		weatherConditions
	)

	return {
		type: SET_LOG_ENTRY_WIND,
		payload: {
			speed: windSpeed,
			units: 'mph',
			direction: windDir,
			desc: windDesc
		}
	}
}

/////// END WEATHER

export function dataIsLoading() {
	return {
		type: LOADING_DATA,
		payload: 'Loading'
	}
}

export function setLog(logDocs) {
	//console.log('docs', JSON.stringify(logDocs, null, 2))
	return {
		type: SET_LOG,
		payload: logDocs
	}
}

export function syncCompleted() {
	return {
		type: SYNC_COMPLETE,
		payload: 'Complete'
	}
}

export function syncErroring() {
	return {
		type: SYNC_ERROR,
		payload: 'Error'
	}
}

export function syncChanged() {
	return {
		type: SYNC_CHANGE,
		payload: 'Syncing'
	}
}

export function syncPaused() {
	return {
		type: SYNC_PAUSED,
		payload: 'Paused'
	}
}

export function syncResumed() {
	return {
		type: SYNC_ACTIVE,
		payload: 'Resumed'
	}
}

export function syncDenied() {
	return {
		type: SYNC_DENIED,
		payload: 'Data failed to replicate'
	}
}

// export function newLogEntryWizardPanelResetting() {
// 	console.log('newLogEntryWizardPanelResetting')
// 	return { type: RESET_NEW_LOG_ENTRY_PANEL }
// }

export function newLogEntryWizardPanelNexting(panel) {
	return { type: NEXT_NEW_LOG_ENTRY_PANEL, payload: panel }
}

export function newLogEntryWizardPanelPreviousing(panel) {
	return { type: PREVIOUS_NEW_LOG_ENTRY_PANEL, payload: panel }
}
