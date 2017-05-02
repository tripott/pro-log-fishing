import React from 'react'
import { propOr } from 'ramda'
import { Tile } from 'jrs-react-components'

const WaterTemp = props => {
	const temp = propOr('--', 'temp', props)
	const units = propOr('--', 'units', props)

	let mercury = 'half'
	let tempColor = 'lightest-blue'

	if (temp < 33) {
		mercury = 'empty'
		tempColor = 'blue'
	}
	if (temp > 32 && temp < 46) {
		mercury = 'quarter'
		tempColor = 'lightest-blue'
	}
	if (temp > 45 && temp < 61) {
		mercury = 'half'
		tempColor = 'light-yellow'
	}
	if (temp > 60 && temp < 76) {
		mercury = 'three-quarters'
		tempColor = 'light-red'
	}
	if (temp > 75) {
		mercury = 'full'
		tempColor = 'dark-red'
	}

	/*
  fa-thermometer-empty            // below 32
  fa-thermometer-quarter          // 32 to 45
  fa-thermometer-half             // 46 to 70
  fa-thermometer-three-quarters   // 71 to 85
  fa-thermometer-full             // above 86
  */

	return (
		<Tile
			backgroundColor={`bg-${tempColor}`}
			h1MainText={temp}
			h1SecondaryText={units}
			h2Text="water temp"
		>
			<i className={`fa fa-thermometer-${mercury} fa-4x`} aria-hidden="true" />
		</Tile>
	)
}

export default WaterTemp
