import React from 'react'
import { propOr, toLower } from 'ramda'
import { Tile } from 'jrs-react-components'

const Tide = props => {
	const height = propOr('--', 'height', props)
	const units = propOr('--', 'units', props)
	const stage = toLower(propOr('--', 'stage', props))

	const arrow = stage === 'falling' ? 'down' : 'up'

	return (
		<Tile
			backgroundColor={`bg-light-blue`}
			h1MainText={height}
			h1SecondaryText={units}
			h2Text={`${stage} tide`}
		>
			<i className={`fa fa-arrow-circle-o-${arrow} fa-4x`} aria-hidden="true" />
		</Tile>
	)
}

export default Tide
