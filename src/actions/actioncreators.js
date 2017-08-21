if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
import db from '../db'
import {
  LOADING_DATA,
  SET_LOG_ENTRY_POSITION,
  NEXT_NEW_LOG_ENTRY_PANEL,
  PREVIOUS_NEW_LOG_ENTRY_PANEL,
  SET_LOG,
  SET_MORE_LOG,
  SYNC_COMPLETE,
  SYNC_CHANGE,
  SYNC_PAUSED,
  SYNC_ACTIVE,
  SYNC_DENIED,
  SYNC_ERROR,
  SET_LOG_ENTRY_WIND,
  SET_LOG_ENTRY_WEATHER,
  SET_USER
} from './actions'

import fetch from 'isomorphic-fetch'
import {
  compose,
  concat,
  replace,
  reduce,
  pluck,
  filter,
  prop,
  head,
  take,
  pathOr,
  contains,
  merge,
  propOr,
  __
} from 'ramda'

import pk from '../pk-builder'
////////////////////
//    Location
////////////////////

const getLocation = () => {
  const geolocation = navigator.geolocation
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'))
    }

    geolocation.getCurrentPosition(
      position => {
        resolve(position)
      },
      () => {
        reject(new Error('Permission denied'))
      }
    )
  })
  return location
}

export function getCurrentLocationCoords() {
  return dispatch => {
    getLocation()
      .then(position => {
        dispatch(setLogEntryPosition(position))
        return reverseGeoCodePosition(position)
      })
      .then(res => res.json())
      .then(function(reverseGeoCodeResult) {
        return compose(
          concat(__, '.json'),
          replace(' ', '_'),
          reduce((acc, val) => '/' + val + acc, ''),
          pluck('short_name'),
          filter(
            ac =>
              contains('administrative_area_level_1', ac.types) ||
              contains('locality', ac.types)
          ),
          prop('address_components'),
          head,
          take(1),
          prop('results')
        )(reverseGeoCodeResult)
      })
      .then(location => {
        return getWeatherConditions(location)
      })
      .then(res => res.json())
      .then(weatherConditions => {
        dispatch(setWeatherConditions(weatherConditions))
        dispatch(setWind(weatherConditions))
      })
      .catch(err =>
        console.log(
          'action creators: geolocation() problem getting geolocation, or reverseGeoCodePosition or  getWeatherConditions',
          err
        )
      )
  }
}

export function setLogEntryPosition(position) {
  return {
    type: SET_LOG_ENTRY_POSITION,
    payload: { lat: position.coords.latitude, lng: position.coords.longitude }
  }
}
/////// END LOCATION

/////////////////
//   Weather
/////////////////

function reverseGeoCodePosition(position) {
  // position object parameter example:
  // position: {
  // 	lat: '32.7921705',
  // 	lng: '-79.9060039'
  // }

  const latlng = `${position.coords.latitude},${position.coords.longitude}`

  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&sensor=true`,
    {
      method: 'get'
    }
  )
}

function getWeatherConditions(location) {
  // location parameter example:
  // "/SC/Mt_Pleasant.json"

  return fetch(
    `https://api.wunderground.com/api/${process.env
      .REACT_APP_WU}/conditions/q${location}`,
    {
      method: 'get'
    }
  )
}

export function setWeatherConditions(weatherConditions) {
  // SET_LOG_ENTRY_WEATHER
  // weather: {
  // 	temp: 0,
  // 	units: 'F',
  // 	desc: 'Partly Cloudy'
  // }

  const temp_f = pathOr(
    'N/A',
    ['current_observation', 'temp_f'],
    weatherConditions
  )
  const desc = pathOr(
    'N/A',
    ['current_observation', 'weather'],
    weatherConditions
  )
  const icon_url = pathOr(
    'N/A',
    ['current_observation', 'icon_url'],
    weatherConditions
  )

  return {
    type: SET_LOG_ENTRY_WEATHER,
    payload: { temp: temp_f, units: 'F', desc: desc, wu_icon: icon_url }
  }
}

export function setWind(weatherConditions) {

  const windDir = pathOr(
    'N/A',
    ['current_observation', 'wind_dir'],
    weatherConditions
  )
  const windSpeed = pathOr(
    'N/A',
    ['current_observation', 'wind_mph'],
    weatherConditions
  )
  const windDesc = pathOr(
    'N/A',
    ['current_observation', 'wind_string'],
    weatherConditions
  )

  return {
    type: SET_LOG_ENTRY_WIND,
    payload: {
      speed: windSpeed,
      units: 'mph',
      direction: windDir,
      desc: windDesc
    }
  }
}

/////// END WEATHER

export function dataIsLoading() {
  return {
    type: LOADING_DATA,
    payload: 'Loading'
  }
}

export function setLog(logDocs) {
  //console.log('docs', JSON.stringify(logDocs, null, 2))
  return {
    type: SET_LOG,
    payload: logDocs
  }
}

export function setMoreLog(logDocs) {
  //console.log('docs', JSON.stringify(logDocs, null, 2))
  return {
    type: SET_MORE_LOG,
    payload: logDocs
  }
}

export function syncCompleted() {
  return {
    type: SYNC_COMPLETE,
    payload: 'Complete'
  }
}

export function syncErroring() {
  return {
    type: SYNC_ERROR,
    payload: 'Error'
  }
}

export function syncChanged() {
  return {
    type: SYNC_CHANGE,
    payload: 'Syncing'
  }
}

export function syncPaused() {
  return {
    type: SYNC_PAUSED,
    payload: 'Paused'
  }
}

export function syncResumed() {
  return {
    type: SYNC_ACTIVE,
    payload: 'Resumed'
  }
}

export function syncDenied() {
  return {
    type: SYNC_DENIED,
    payload: 'Data failed to replicate'
  }
}

export function newLogEntryWizardPanelNexting(panel) {
  return { type: NEXT_NEW_LOG_ENTRY_PANEL, payload: panel }
}

export function newLogEntryWizardPanelPreviousing(panel) {
  return { type: PREVIOUS_NEW_LOG_ENTRY_PANEL, payload: panel }
}

export const createOrSetCurrentUser = (profile, history) => (
  dispatch,
  getState
) => {
  const profileSub = propOr(null, 'sub', profile)
  const profileLastName = propOr(null, 'family_name', profile)
  const profileFirstName = propOr(null, 'given_name', profile)
  const profilePicture = propOr(null, 'picture', profile)

  const userProfile = {
    type: 'user',
    authProfileID: profileSub,
    userExists: false,
    userCreatedInDB: false,
    problemFindingUserInDB: false,
    problemCreatingUserInDB: false,
    problemReadingUserFromDB: false,
    userExistsAlertedUI: false,
    userProfileCompletedUI: false,
    user: {
      firstName: profileFirstName,
      lastName: profileLastName,
      primaryPhone: '',
      isAdmin: false,
      primaryEmail: '',
      photo: profilePicture,
      authProfileID: profileSub
    }
  }

  const query = {
    selector: { authProfileID: profileSub, type: 'user' },
    limit: 1
  }
//  console.log('query', query)
  db.findDocs(query, (err, users) => {
    if (err) {
      //console.log('createOrSetCurrentUser error finding user ', err)
      let payload = merge(userProfile, { problemFindingUserInDB: true })
      dispatch({ type: SET_USER, payload })
      //history.push('/usererror')
      history.push('/usererror')
    }
    // user not in db, this is a new user, so add to db
    if (users.length === 0) {
      const id = pk('user_', profile.name + ' ' + profileSub)
      const doc = merge(userProfile, { _id: id })
      //console.log('doc', doc)
      db.create(doc, (err, result) => {
        if (err) {
          //console.log('createOrSetCurrentUser error creating user ', err)
          let payload = merge(userProfile, { problemCreatingUserInDB: true })
          dispatch({ type: SET_USER, payload })
          //history.push('/usererror')
          history.push('/usererror')
        }

        db.read(result.id, (err, result) => {
          if (err) {
            let payload = merge(userProfile, {
              problemReadingUserFromDB: true
            })
            dispatch({ type: SET_USER, payload })
            //history.push('/usererror')
            history.push('/usererror')
          }
          let payload = merge(userProfile, {
            userCreatedInDB: true,
            user: result
          })
          dispatch({ type: SET_USER, payload })
          //TODO: nav user to user edit screen.
          //TODO: as user if they want to go to user edit or log
          history.push('/log')

        })
      })
    } else if (users.length > 0) {
      let payload = merge(userProfile, {
        userExists: true,
        user: head(users)
      })
      dispatch({ type: SET_USER, payload })
      history.push('/log')
    } else {
      dispatch({ type: SET_USER, payload: userProfile })
      history.push('/log')
    }
  })
}
