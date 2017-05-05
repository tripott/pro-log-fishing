import React from 'react'
import { connect } from 'react-redux'
import { map, take, prop, sortWith, descend, compose } from 'ramda'
import ListItem from './LogEntryListItem'
import { Link } from 'react-router-dom'

const List = props => {
	const sortByDateTime = sortWith([descend(prop('startDateTime'))])

	var count = 0
	var bgColor = 'bg-black-10'
	const li = map(logEntry => {
		count = count + 1
		count % 2 === 0 ? (bgColor = 'bg-black-10') : (bgColor = 'bg-black-30')

		return (
			<ListItem
				key={logEntry.startDateTime}
				logEntry={logEntry}
				backgroundColor={bgColor}
				width="w-100"
				{...props}
			/>
		)
	})

	const listItems = compose(li, sortByDateTime)(props.log)

	//const listItems = map(logEntry =>  <ListItem key={logEntry.startDateTime} logEntry={logEntry} {...props} />, props.log)
	const status = props.dbStatus

	let statusTextColor = 'black-70'

	switch (status) {
		case 'Loading':
			statusTextColor = 'blue'
			break
		case 'Syncing':
			statusTextColor = 'blue'
			break
		case 'Paused':
			statusTextColor = 'black-70'
			break
		case 'Resumed':
			statusTextColor = 'blue'
			break
		case 'Data failed to replicate':
			statusTextColor = 'red'
			break
		case 'Complete':
			statusTextColor = 'green'
			break
		case 'Error':
			statusTextColor = 'red'
			break
		default:
			statusTextColor = 'black-70'
	}

	return (
		<div>
			<div className="pa4 tc">
				<h1 className="f2 fw1">Fishing Log</h1>
				<div>
					<Link
						className="link dt w-100 bb b--black-10 pb4 mt2 dim blue"
						to="/log/new"
					>
						<a
							href=""
							className="f6 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba border-box mr3"
						>
							<span className="pl2 pr2">Add</span>
						</a>
					</Link>
				</div>
				<main>
					<div className="cf">
						{listItems}
					</div>
				</main>

			</div>

			<footer className="black-70">
				<div className="db">
					<p className={`pa2 f7 bg-${statusTextColor} white`}>
						Sync status: {status}
					</p>
				</div>
			</footer>
		</div>
	)
}

const mapStateToProps = function(state) {
	return {
		log: state.log,
		dbStatus: state.dbStatus
	}
}

const connector = connect(mapStateToProps)
export default connector(List)
