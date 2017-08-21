import PouchDB from 'pouchdb'
import store from './store'
PouchDB.plugin(require('pouchdb-find'))
const db = new PouchDB('fishing')

import {
  setLog,
  setMoreLog,
  syncCompleted,
  syncErroring,
  syncChanged,
  syncPaused,
  syncResumed,
  syncDenied
} from './actions/actioncreators'

export const getMoreDBLogEntries = (profileSub, lastItem, limit)  => {

  lastItem = lastItem ? lastItem : null
  limit = limit ? limit : 5

  let query = lastItem ?  {
    selector: {
      type: 'entry',
      authProfileID: profileSub,
      startDateTime: {$lt: lastItem}
    },
    sort: [
      { type: 'desc' },
      { authProfileID: 'desc' },
      { startDateTime: 'desc' }
    ],
    limit
  } : {
    selector: {
      type: 'entry',
      authProfileID: profileSub,
      startDateTime: {$gte: null}
    },
    sort: [
      { type: 'desc' },
      { authProfileID: 'desc' },
      { startDateTime: 'desc' }
    ],
    limit
  }

  db
    .find(query)
    .then(res => store.dispatch(setMoreLog(res.docs)))
    .catch(function(err) {
      console.log(err)
    })
}

export const getDBLogEntries = (profileSub, limit)  => {

  limit = limit ? limit : 5


  let query = {
    selector: {
      type: 'entry',
      authProfileID: profileSub,
      startDateTime: {$gte: null}
    },
    sort: [
      { type: 'desc' },
      { authProfileID: 'desc' },
      { startDateTime: 'desc' }
    ],
    limit
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


 // user security and one user per db.
 // See https://subvisual.co/blog/posts/130-how-to-build-offline-web-applications-with-couchdb-and-pouchdb/
 // const remoteDatabase = new PouchDB(process.env.REACT_APP_COUCHDB, {
 //    skipSetup: true,
 //    ajax: {
 //      headers: {
 //        'X-Auth-CouchDB-UserName': `${currentUser.id}`,
 //        'X-Auth-CouchDB-Roles': 'users',
 //        'X-Auth-CouchDB-Token': currentUser.couchdb_token,
 //        'Content-Type': 'application/json; charset=utf-8'
 //      }
 //    }
 //  })

export const sync = (profileSub, token) => {
  // const remoteDatabase = new PouchDB(process.env.REACT_APP_COUCHDB, {
  //    skipSetup: true,
  //    ajax: {
  //      headers: {
  //        'Content-Type': 'application/json; charset=utf-8',
  //        'Authorization': 'Bearer ' + token
  //      }
  //    }
  //  })

   const remoteDatabase = new PouchDB(process.env.REACT_APP_COUCHDB, {
      ajax: {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer ' + token
        }
      }
    })

  PouchDB.sync('fishing', remoteDatabase, {
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
