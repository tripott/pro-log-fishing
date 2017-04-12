if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

import {createStore, combineReducers} from 'redux'
//const fetch = require('isomorphic-fetch')
const PouchDB = require('pouchdb')
import {map, merge} from 'ramda'
import {
  ADD,
  PREVIOUS,
  NEXT,
  RESET,
  SET_LOG,
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
  SYNC_ERROR
} from './actions'


// TODO: PouchDB Inspector -
// Inspect all the PouchDB databases on your website in Fauxton, inside the developer tools.
// window.PouchDB = PouchDB is required after installing PouchDB Inspector from chrome store:
// https://chrome.google.com/webstore/detail/pouchdb-inspector/hbhhpaojmpfimakffndmpmpndcmonkfa?hl=en
window.PouchDB = PouchDB

const db = new PouchDB('fishing')
const initialLog = []

const logReducer = (log = initialLog, action) => {
    switch (action.type) {
        case SET_LOG:
            return action.payload
        default:
            return log
    }
}

// const counterReducer = function(counter = 0, action) {
//     switch (action.type) {
//         case 'INCR':
//             return counter + 1
//         case 'DECR':
//             return counter - 1
//         default:
//             return counter
//     }
// }

const dbStatusReducer = function(status = "unknown", action) {
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

const newLogEntry = { _id: null,
  name: '',
  type: 'entry',
  tide: {
    height: 0,
    units: "ft",
    stage: "Rising"
  },
  position: {
    lat: "32.7921705",
    lng: "-79.9060039"
  },
  waterTemp: {
    temp: 0,
    units: "F"
  },
  wind: {
    speed: 5,
    units: "mph",
    direction: "SSW"
    },
  weather: {
    temp: 0,
    units: "F",
    desc: "Partly Cloudy"
    },
  notes: '',
  fishes: [],
  rating: 0
}

const editSingleLogEntryReducer = (
      state = newLogEntry,
      action
    ) => {
      switch (action.type) {
        case SET_LOG_ENTRY_ID:
          return merge(state, {_id: action.payload})
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
        case RESET_LOG_ENTRY:
          return newLogEntry
        case SET_LOG_ENTRY_FOR_EDIT:
          return action.payload
        default:
          return state
      }
    }

  const panel =  (state = 'step1', action) => {
      switch (action.type) {
        case RESET:
          return 'step1'
        case PREVIOUS:
          return action.payload
        case NEXT:
          return action.payload
        default:
          return state
      }
    }

const store = createStore(
    combineReducers({
        log: logReducer,
        dbStatus: dbStatusReducer,
        logEntry: editSingleLogEntryReducer,
        panel: panel
    }))


store.dispatch({
    type: "LOADING_DATA",
    payload: "Loading"
})

db.allDocs({
    include_docs: true
}).then(function(result) {
    store.dispatch({
        type: "SET_LOG",
        payload: map(row => row.doc, result.rows)
    })
}).catch(function(err) {
    console.log(err);
})

db.changes({
        live: true,
        include_docs: true
    })
    .on('change', function(change) {

        db.allDocs({
            include_docs: true
        }).then(function(result) {
            store.dispatch({
                type: "SET_LOG",
                payload: map(row => row.doc, result.rows)
            })
        }).catch(function(err) {
            console.log(err);
        })
    }).on('complete', function(info) {
        store.dispatch({
            type: "SYNC_COMPLETE",
            payload: "Complete"
        })
    }).on('error', function(err) {
        store.dispatch({
            type: "SYNC_ERROR",
            payload: "Error"
        })
        console.log(err);
    });

PouchDB.sync('fishing', process.env.REACT_APP_COUCHDB, {
    live: true,
    retry: true
}).on('change', function(info) {
    store.dispatch({
        type: "SYNC_CHANGE",
        payload: "Syncing"
    })
}).on('paused', function(err) {
    // replication paused (e.g. replication up to date, user went offline)
    store.dispatch({
        type: "SYNC_PAUSED",
        payload: "Paused"
    })
}).on('active', function() {
    // replicate resumed (e.g. new changes replicating, user went back online)
    store.dispatch({
        type: "SYNC_ACTIVE",
        payload: "Resumed"
    })
}).on('denied', function(err) {
    // a document failed to replicate (e.g. due to permissions)
    store.dispatch({
        type: "SYNC_DENIED",
        payload: "Data failed to replicate"
    })
}).on('complete', function(info) {
    store.dispatch({
        type: "SYNC_COMPLETE",
        payload: "Complete"
    })
}).on('error', function(err) {
    store.dispatch({
        type: "SYNC_ERROR",
        payload: "Error"
    })
});

export default store
