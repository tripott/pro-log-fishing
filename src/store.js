import {
    createStore,
    combineReducers
} from 'redux'
//const fetch = require('isomorphic-fetch')
const PouchDB = require('pouchdb')
import {
    map
} from 'ramda'

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

const counterReducer = function(counter = 0, action) {
    switch (action.type) {
        case 'INCR':
            return counter + 1
        case 'DECR':
            return counter - 1
        default:
            return counter
    }
}

const loadingReducer = function(isDataLoaded = true, action) {
    switch (action.type) {
        case 'LOADING':
            return false
        case 'LOADED':
            return true
        default:
            return isDataLoaded
    }
}

const store = createStore(
    combineReducers({
        log: logReducer,
        counter: counterReducer,
        isDataLoaded: loadingReducer
    }))

store.dispatch({
    type: "LOADING",
    payload: null
})


db.allDocs({
    include_docs: true
}).then(function(result) {
    store.dispatch({
        type: "SET_LOG",
        payload: map(row => row.doc, result.rows)
    })
}).then(function() {
    store.dispatch({
        type: "LOADED",
        payload: null
    })
}).catch(function(err) {
    console.log(err);
})

db.changes({since: 'now', live: true, include_docs: true})
.on('change', function(change) {
    db.allDocs({
        include_docs: true
    }).then(function(result) {
        store.dispatch({
            type: "SET_LOG",
            payload: map(row => row.doc, result.rows)
        })
    }).then(function() {
        store.dispatch({
            type: "LOADED",
            payload: null
        })
    }).catch(function(err) {
        console.log(err);
    })
}).on('complete', function(info) {
// changes() was canceled
}).on('error', function(err) {
console.log(err);
});

export default store
