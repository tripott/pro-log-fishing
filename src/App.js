import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import List from './components/List'
import LogEntryDetail from './components/LogEntryDetail'
import Credits from './components/Credits'
import NewLogEntryWizard from './components/NewLogEntryWizard'

const App = () => {
  return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" render={(props) => <List {...props} />} />
              <Route exact path="/log/new" render={(props) => <NewLogEntryWizard {...props} />} />
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
