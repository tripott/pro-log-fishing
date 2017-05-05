import React from 'react'
import moment from 'moment-timezone'
import { Link } from 'react-router-dom'
import { Tile } from 'jrs-react-components'

const LogEntryListItem = props => {
	let { _id, name, notes, startDateTime } = props.logEntry

	startDateTime = moment
		.tz(startDateTime, 'America/New_York')
		.utc(startDateTime)
		.format('lll')
		.toString()

	return (
		<article>
			<Link className="link dt w-100 dim blue" to={`/log/${_id}`}>
				<Tile
					backgroundColor={props.backgroundColor}
					width={props.width}
					h1MainText={name}
					h1SecondaryText={startDateTime}
					h2Text={notes}
				/>
			</Link>
		</article>
	)
}

export default LogEntryListItem
