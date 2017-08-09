import React from 'react'
import { Link } from 'react-router-dom'

const MainHeader = props => {
  return (
    <header className="flex flex-row justify-between items-center bg-light-blue h3">

      <div className="ml2">
        <i
          className="fa fa-sign-out fa-2x"
          onClick={e => props.auth.logout()}
        />
      </div>

      <div>{props.title}</div>
      <div className="mr2">
        <Link className="black" to={props.target}>
          <div className="ml2">
            <i className="fa fa-map-marker fa-2x" />
          </div>
        </Link>
      </div>
    </header>
  )
}

export default MainHeader
