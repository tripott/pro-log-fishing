import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import List from './components/List'
import LogEntryDetail from './components/LogEntryDetail'
import Credits from './components/Credits'
import NewLogEntryWizard from './components/NewLogEntryWizard'
import Auth from './auth'
import Login from './components/Login'
import Callback from './components/Callback'

const auth = Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}
//
// <Route
//   exact
//   path="/log/new"
//   render={props => <NewLogEntryWizard {...props} />}
// />

// <Route
//   path="/log/:id"
//   render={props => <LogEntryDetail {...props} />}
// />

// <Route
//   exact
//   path="/log"
//   render={props => <List auth={auth} {...props} />}
// />

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Login auth={auth} {...props} />}
            />
            <PrivateRoute path="/log/new" component={NewLogEntryWizard} />
            <PrivateRoute path="/log/:id" component={LogEntryDetail} />
            <PrivateRoute path="/log" component={List} />

            <Route path="/credits" render={props => <Credits {...props} />} />
            <Route
              path="/callback"
              render={props => {
                handleAuthentication(props)
                return <Callback {...props} />
              }}
            />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

const PrivateRoute = ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated()
        ? <Component auth={auth} {...props} />
        : <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />}
  />

export default App
