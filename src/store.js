if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//console.log('store.js')
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { ThemeManager } from 'jrs-react-components'
import { light } from 'jrs-react-components-themes'

import {
  concat,
  merge,
  mergeDeepRight,
  cond,
  always,
  equals,
  T,

} from 'ramda'
const PouchDB = require('pouchdb')
//PouchDB.plugin(require('pouchdb-find'))
//const db = new PouchDB('fishing')

import {
  PREVIOUS_NEW_LOG_ENTRY_PANEL,
  NEXT_NEW_LOG_ENTRY_PANEL,
  RESET_NEW_LOG_ENTRY_PANEL,
  SET_LOG,
  SET_MORE_LOG,
  SET_LOG_ENTRY_ID,
  SET_LOG_ENTRY_NAME,
  SET_LOG_ENTRY_TIDE,
  SET_LOG_ENTRY_START_DATE,
  SET_LOG_ENTRY_END_DATE,
  SET_LOG_ENTRY_POSITION,
  SET_LOG_ENTRY_WATER_TEMP,
  SET_LOG_ENTRY_WIND,
  SET_LOG_ENTRY_WEATHER,
  SET_LOG_ENTRY_NOTES,
  SET_LOG_ENTRY_FISHES,
  SET_LOG_ENTRY_RATING,
  RESET_LOG_ENTRY,
  SET_LOG_ENTRY_FOR_EDIT,
  LOADING_DATA,
  SYNC_CHANGE,
  SYNC_PAUSED,
  SYNC_ACTIVE,
  SYNC_DENIED,
  SYNC_ERROR,
  SET_USER_X,
  SET_USER,
  SET_SESSION,
  SET_LOG_ENTRY_AUTH_PROFILE_ID
} from './actions/actions'

import {
  dataIsLoading,
  //setLog,
  //syncCompleted,
  //syncErroring,
//  syncChanged,
  //syncPaused,
  //syncResumed,
  //syncDenied
} from './actions/actioncreators'

// PouchDB Inspector -
// Inspect all the PouchDB databases on your website in Fauxton, inside the developer tools.
// window.PouchDB = PouchDB is required after installing PouchDB Inspector from chrome store:
// https://chrome.google.com/webstore/detail/pouchdb-inspector/hbhhpaojmpfimakffndmpmpndcmonkfa?hl=en
window.PouchDB = PouchDB

const initialLog = []

const logReducer = (log = initialLog, action) => {
  switch (action.type) {
    case SET_LOG:
      return action.payload
    case SET_MORE_LOG:
      return concat(log, action.payload)
    default:
      return log
  }
}

const dbStatusReducer = function(status = 'unknown', action) {
  switch (action.type) {
    case LOADING_DATA:
      return action.payload
    case SYNC_CHANGE:
      return action.payload
    case SYNC_PAUSED:
      return action.payload
    case SYNC_ACTIVE:
      return action.payload
    case SYNC_DENIED:
      return action.payload
    case SYNC_ERROR:
      return action.payload
    default:
      return status
  }
}

const newLogEntry = {
  _id: null,
  authProfileID: null,
  name: '',
  type: 'entry',
  tide: { height: 0, units: 'ft', stage: 'Rising' },
  position: { lat: '32.7921705', lng: '-79.9060039' },
  waterTemp: { temp: 0, units: 'F' },
  wind: { speed: 5, units: 'mph', direction: 'SSW' },
  weather: { temp: 0, units: 'F', desc: 'Partly Cloudy' },
  notes: '',
  fishes: [],
  rating: 0
}

const editSingleLogEntryReducer = (state = newLogEntry, action) => {
  switch (action.type) {
    case SET_LOG_ENTRY_ID:
      return merge(state, { _id: action.payload })
    case SET_LOG_ENTRY_NAME:
      return merge(state, { name: action.payload })
    case SET_LOG_ENTRY_TIDE:
      return merge(state, { tide: action.payload })
    case SET_LOG_ENTRY_START_DATE:
      return merge(state, { startDateTime: action.payload })
    case SET_LOG_ENTRY_END_DATE:
      return merge(state, { endDateTime: action.payload })
    case SET_LOG_ENTRY_POSITION:
      return merge(state, { position: action.payload })
    case SET_LOG_ENTRY_WATER_TEMP:
      return merge(state, { waterTemp: action.payload })
    case SET_LOG_ENTRY_WIND:
      return merge(state, { wind: action.payload })
    case SET_LOG_ENTRY_WEATHER:
      return merge(state, { weather: action.payload })
    case SET_LOG_ENTRY_NOTES:
      return merge(state, { notes: action.payload })
    case SET_LOG_ENTRY_FISHES:
      return merge(state, { fishes: action.payload })
    case SET_LOG_ENTRY_RATING:
      return merge(state, { rating: action.payload })
    case SET_LOG_ENTRY_AUTH_PROFILE_ID:
      return merge(state, { authProfileID: action.payload })
    case RESET_LOG_ENTRY:
      return newLogEntry
    case SET_LOG_ENTRY_FOR_EDIT:
      return action.payload
    default:
      return state
  }
}

const panel = (state = 'step1', action) => {
  switch (action.type) {
    case RESET_NEW_LOG_ENTRY_PANEL:
      return 'step1'
    case PREVIOUS_NEW_LOG_ENTRY_PANEL:
      return action.payload
    case NEXT_NEW_LOG_ENTRY_PANEL:
      return action.payload
    default:
      return state
  }
}

ThemeManager.addTheme(light)

const theme = ThemeManager.getDefaultTheme()

const themeStyles = (state = theme.themeStyles, action) => {
  switch (action.type) {
    default:
      return state
  }
}

function user(state = {}, action) {
  return cond([
    [
      equals(SET_USER_X + 'FIRSTNAME'),
      type => mergeDeepRight(state, { user: { firstName: action.payload } })
    ],
    [
      equals(SET_USER_X + 'LASTNAME'),
      type => mergeDeepRight(state, { user: { lastName: action.payload } })
    ],
    [
      equals(SET_USER_X + 'PRIMARYPHONE'),
      type => mergeDeepRight(state, { user: { primaryPhone: action.payload } })
    ],
    [
      equals(SET_USER_X + 'PRIMARYEMAIL'),
      type => mergeDeepRight(state, { user: { primaryEmail: action.payload } })
    ],
    [
      equals(SET_USER_X + 'ISADMIN'),
      type => mergeDeepRight(state, { user: { isAdmin: action.payload } })
    ],
    [
      equals(SET_USER_X + 'PHOTO'),
      type => mergeDeepRight(state, { user: { photo: action.payload } })
    ],
    [equals(SET_USER), type => merge(state, { user: action.payload })],
    [T, always(state)]
  ])(action.type)
}

function session(state = { access_token: '' }, action) {
  return cond([
    [equals(SET_SESSION), always(action.payload)],
    [T, always(state)]
  ])(action.type)
}

const store = createStore(
  combineReducers({
    log: logReducer,
    dbStatus: dbStatusReducer,
    logEntry: editSingleLogEntryReducer,
    panel,
    themeStyles: themeStyles,
    user,
    session
  }),
  applyMiddleware(thunk)
)

store.dispatch(dataIsLoading())

export default store
