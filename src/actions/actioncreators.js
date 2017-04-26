import {
  LOADING_DATA,
  SET_LOG_ENTRY_POSITION,
  NEXT_NEW_LOG_ENTRY_PANEL,
  PREVIOUS_NEW_LOG_ENTRY_PANEL,
  RESET_NEW_LOG_ENTRY_PANEL,
  SET_LOG,
  SYNC_COMPLETE,
  SYNC_CHANGE,
  SYNC_PAUSED,
  SYNC_ACTIVE,
  SYNC_DENIED,
  SYNC_ERROR
//  RESET_LOG_ENTRY
} from './actions'

const getLocation = () => {
  const geolocation = navigator.geolocation
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'))
    }

    geolocation.getCurrentPosition((position) => {
      resolve(position)
    }, () => {
      reject (new Error('Permission denied'))
    })
  })
  return location
}

export function getCurrentLocationCoords() {
  return (dispatch) => {
    getLocation()
      .then((position) => {
        dispatch(setLogEntryPosition(position))
      })
      .catch((err) => console.log("Problem getting geolocation ", err))
  }
}

export function setLogEntryPosition(position) {
    return {
        type: SET_LOG_ENTRY_POSITION,
        payload: {lat: position.coords.latitude, lng: position.coords.longitude}
    }
}

export function dataIsLoading() {
  return {
    type: LOADING_DATA,
    payload: "Loading"
  }
}

export function setLog(logDocs) {
  return {
    type: SET_LOG,
    payload: logDocs
  }
}

export function syncCompleted() {
  return {
    type: SYNC_COMPLETE,
    payload: "Complete"
  }
}

export function syncErroring() {
  return {
      type: SYNC_ERROR,
      payload: "Error"
  }
}

export function syncChanged() {
  return {
    type: SYNC_CHANGE,
    payload: "Syncing"
  }
}

export function syncPaused() {
  return {
      type: SYNC_PAUSED,
      payload: "Paused"
  }
}

export function syncResumed() {
  return {
    type: SYNC_ACTIVE,
    payload: "Resumed"
  }
}

export function syncDenied() {
  return {
        type: SYNC_DENIED,
        payload: "Data failed to replicate"
    }
}

export function newLogEntryWizardPanelResetting() {
  return { type: RESET_NEW_LOG_ENTRY_PANEL }
}

export function newLogEntryWizardPanelNexting(panel) {
  return { type: NEXT_NEW_LOG_ENTRY_PANEL, payload: panel }
}

export function newLogEntryWizardPanelPreviousing(panel) {
  return { type: PREVIOUS_NEW_LOG_ENTRY_PANEL, payload: panel }
}
