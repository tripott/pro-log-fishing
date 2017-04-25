import React from 'react'
// import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import List from './components/List'
import LogEntryDetail from './components/LogEntryDetail'
import Credits from './components/Credits'
import NewLogEntryWizard from './components/NewLogEntryWizard'
import { Themes } from 'jrs-react-components'
import { Dark } from 'jrs-react-components-themes'

//console.log("imported Dark Theme ", Dark)
Themes.addTheme(Dark)
//Themes.setDefaultTheme('Light')
// Themes.addTheme({
//   themeName: 'lightest-blue',
//   themeStyles: {
//     panelBorder: 'ba b--black-30',
//     panelBackgroundColor: 'bg-lightest-blue',
//     panelTextColor: 'dark-gray'
//   }
// })



Themes.replaceThemeStyles('Dark', {
       panelBorder: 'ba b--pink'
})

Themes.setDefaultTheme('Dark')
const theme = Themes.getDefaultTheme()
console.log('pouch-offline theme', theme)

const App = () => {
  return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" render={(props) => <List {...props} />} />
              <Route exact path="/log/new" render={(props) => <NewLogEntryWizard  {...theme} {...props} />} />
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
