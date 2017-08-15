import React from 'react'
import { Link } from 'react-router-dom'

// <div className="ml2">
//   <i className="fa fa-map-marker fa-2x" />
// </div>

const MainHeader = props => {
  return (
    <header className="flex flex-row justify-between items-center bg-light-blue h3">

      <div className="ml2">
        <i
          className="fa fa-sign-out fa-2x"
          onClick={e => props.auth.logout()}
        />
      </div>

      <div>Welcome, {props.session.profile.name} to {props.title}</div>
      <div className="mr2">
        <Link className="black" to={props.target}>

          <div className="ml2">
            <img src={props.session.profile.picture ? props.session.profile.picture : 'https://placehold.it/100x100?text=No Photo' } className="br-100 h2 w2 dib ba b--black-05 pa2" title="Missing profile photo"/>
          </div>

        </Link>
      </div>
    </header>
  )
}


export default MainHeader
