import React from 'react'
// import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import List from './components/List'
import LogEntryDetail from './components/LogEntryDetail'
import Credits from './components/Credits'

const App = () => {
  return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/log" render={(props) => <List {...props} />} />
              <Route path="/log/:id" render={(props) => <LogEntryDetail {...props} />} />
              <Route path="/credits" render={(props) => <Credits {...props} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
  )
}

export default App
