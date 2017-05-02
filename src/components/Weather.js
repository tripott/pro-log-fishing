import React from 'react'
import { propOr, toLower } from 'ramda'
import { Tile } from 'jrs-react-components'

const Weather = props => {
	const temp = propOr('--', 'temp', props)
	const units = propOr('--', 'units', props)
	const desc = toLower(propOr('--', 'desc', props))

	let tempColor = 'lightest-blue'

	if (temp < 33) tempColor = 'blue'
	if (temp > 32 && temp < 46) tempColor = 'lightest-blue'
	if (temp > 45 && temp < 61) tempColor = 'light-yellow'
	if (temp > 60 && temp < 76) tempColor = 'light-red'
	if (temp > 75) tempColor = 'dark-red'

	let weatherImage = 'sunny.svg'

	if (desc === 'partly cloudy') weatherImage = 'partly-cloudy.svg'
	if (desc === 'rain') weatherImage = 'rain.svg'
	if (desc === 'sunny') weatherImage = 'sunny.svg'

	return (
		<Tile
			backgroundColor={`bg-${tempColor}`}
			h1MainText={temp}
			h1SecondaryText={units}
			h2Text={desc}
		>
			<img src={`/${weatherImage}`} alt={desc} height="60px" width="60px" />
		</Tile>
	)
}

export default Weather
