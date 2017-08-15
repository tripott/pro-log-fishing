import PouchDB from 'pouchdb'
import store from './store'
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB('fishing')

import {
//  dataIsLoading,
  setLog,
  syncCompleted,
  syncErroring,
  syncChanged,
  syncPaused,
  syncResumed,
  syncDenied
} from './actions/actioncreators'

export const getDBLogEntries = profileSub => {
//  console.log('getAllLogEntriesFromPouch store.getState()', store.getState())

  const query = {
    selector: {
      type: 'entry',
      authProfileID: profileSub
    },
    sort: [
      { type: 'desc' },
      { authProfileID: 'desc' },
      { startDateTime: 'desc' }
    ]
  }

  db
    .find(query)
    .then(res => store.dispatch(setLog(res.docs)))
    .catch(function(err) {
      console.log(err)
    })
}

export const listen = profileSub => {
  db
    .changes({ live: true })
    .on('change', function(change) {
      getDBLogEntries(profileSub)
    })
    .on('complete', function(info) {
      store.dispatch(syncChanged())
    })
    .on('error', function(err) {
      store.dispatch(syncErroring())
      console.log(err)
    })
}

export const sync = profileSub => {
  PouchDB.sync('fishing', process.env.REACT_APP_COUCHDB, {
    live: true,
    retry: true,
    filter: 'filteredReplication/myfilter',
    query_params: {profileSub: profileSub}
  })
    .on('change', function(info) {
      store.dispatch(syncChanged())
    })
    .on('paused', function(err) {
      // replication paused (e.g. replication up to date, user went offline)
      store.dispatch(syncPaused())
    })
    .on('active', function() {
      // replicate resumed (e.g. new changes replicating, user went back online)
      store.dispatch(syncResumed())
    })
    .on('denied', function(err) {
      // a document failed to replicate (e.g. due to permissions)
      store.dispatch(syncDenied())
    })
    .on('complete', function(info) {
      store.dispatch(syncCompleted())
    })
    .on('error', function(err) {
      store.dispatch(syncErroring())
    })
}
