import React from 'react'
import { propOr, toLower } from 'ramda'
import { Tile } from 'jrs-react-components'

const Weather = props => {
	const temp = propOr('--', 'temp', props)
	const units = propOr('--', 'units', props)
	const desc = toLower(propOr('--', 'desc', props))
	const url = propOr('/sunny.svg', 'url', props)
	let tempColor = 'lightest-blue'

	if (temp < 33) tempColor = 'blue'
	if (temp > 32 && temp < 41) tempColor = 'light-blue'
	if (temp > 40 && temp < 51) tempColor = 'gray'
	if (temp > 50 && temp < 61) tempColor = 'light-yellow'
	if (temp > 60 && temp < 71) tempColor = 'light-orange'
	if (temp > 70 && temp < 81) tempColor = 'orange'
	if (temp > 80 && temp < 91) tempColor = 'light-red'
	if (temp > 90 && temp < 101) tempColor = 'dark-red'
	if (temp > 100 && temp < 101) tempColor = 'pink'

	return (
		<Tile
			backgroundColor={`bg-${tempColor}`}
			h1MainText={temp}
			h1SecondaryText={units}
			h2Text={desc}
		>
			<img src={url} alt={desc} height="60px" width="60px" />
		</Tile>
	)
}

export default Weather
