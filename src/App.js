import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import List from './components/List'




const App = () => {
  return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" render={(props) => <List {...props} />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
  )
}

// const mapStateToProps = function (state) {
//   return {
//     log: state.log,
//     isDataLoaded: state.isDataLoaded
//   }
// }

//const connector = connect(mapStateToProps)
export default App
