if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()

  //console.log("REACT_APP_COUCHDB", process.env.REACT_APP_COUCHDB)
}


import {
    createStore,
    combineReducers
} from 'redux'
//const fetch = require('isomorphic-fetch')
const PouchDB = require('pouchdb')
import {map} from 'ramda'

// TODO: PouchDB Inspector -
// Inspect all the PouchDB databases on your website in Fauxton, inside the developer tools.
// window.PouchDB = PouchDB is required after installing PouchDB Inspector from chrome store:
// https://chrome.google.com/webstore/detail/pouchdb-inspector/hbhhpaojmpfimakffndmpmpndcmonkfa?hl=en
window.PouchDB = PouchDB

const db = new PouchDB('fishing')
const initialLog = []

const logReducer = (log = initialLog, action) => {
    switch (action.type) {
        case 'SET_LOG':
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
        case 'LOADING_DATA':
            return action.payload
        case 'SYNC_CHANGE':
            return action.payload
        case 'SYNC_PAUSED':
            return action.payload
        case 'SYNC_ACTIVE':
            return action.payload
        case 'SYNC_DENIED':
            return action.payload
        case 'SYNC_ERROR':
            return action.payload
        default:
            return status
    }
}

const store = createStore(
    combineReducers({
        log: logReducer,
        dbStatus: dbStatusReducer
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
