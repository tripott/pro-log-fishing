import React from 'react'
import { propOr } from 'ramda'
import { Tile } from 'jrs-react-components'

const Wind = props => {
	const speed = propOr('--', 'speed', props)
	const units = propOr('--', 'units', props)
	const direction = propOr('--', 'direction', props)

	let backgroundColor = 'lightest-blue'

	if (speed < 6) {
		backgroundColor = 'lightest-blue'
	}
	if (speed > 5 && speed < 11) {
		backgroundColor = 'light-blue'
	}
	if (speed > 10 && speed < 21) {
		backgroundColor = 'light-yellow'
	}
	if (speed > 20 && speed < 76) {
		backgroundColor = 'light-red'
	}

	return (
		<Tile
			backgroundColor={`bg-${backgroundColor}`}
			h1MainText={speed}
			h1SecondaryText={units}
			h2Text={`wind (${direction})`}
		>
			<img src="/wind-turbine.svg" alt="windy" height="60px" width="60px" />
		</Tile>
	)
}

export default Wind
