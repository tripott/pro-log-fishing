import React from 'react'
import { Redirect } from 'react-router-dom'

const Login = props => {
  const { isAuthenticated } = props.auth

  return (
    <article className="center ph3 ph5-ns tc br2 pv5 bg-washed-blue dark-gray mb5">
      <h1 className="fw6 f3 f2-ns lh-title mt0 mb3">
        Pro<span className="i">Log</span>
      </h1>
      <h3 className="fw2 silver f4 lh-copy mt0 mb3">
        Great fisherman log.
      </h3>

      <div>
        {isAuthenticated() && <Redirect to="/log" />}
        <button
          className="f6 br-pill bg-dark-blue no-underline washed-blue ba b--dark-gray grow pv2 ph3 dib mr3"
          onClick={e => props.auth.login()}
        >
          Sign In
        </button>
        <button
          className="f6 br-pill bg-dark-blue no-underline washed-blue ba b--dark-gray grow pv2 ph3 dib mr3"
          onClick={e => props.auth.signup()}
        >
          Sign Up
        </button>
      </div>
    </article>
  )
}

// return (
//    <div className="pa4">
//      { isAuthenticated() && <Redirect to="/" /> }
//      <button onClick={e => props.auth.login()}>Login</button>
//    </div>
//  )

export default Login
