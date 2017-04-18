const getLocation = () => {
  console.log("begin getLocation()")
  const geolocation = navigator.geolocation
  const location = new Promise((resolve, reject) => {
    if (!geolocation) {
      console.log("getLocation is not supported")
      reject(new Error('Not Supported'))
    }

    geolocation.getCurrentPosition((position) => {
      console.log("geolocation.getCurrentPosition ", position)
      resolve(position)
    }, () => {
      console.log("geolocation.getCurrentPosition Permission denied")
      reject (new Error('Permission denied'))
    })
  })

  return location
}


export function getCurrentLocationCoords() {

    return (dispatch) => {
        //dispatch(coordsIsLoading(true));
        getLocation()
            .then((position) => {
              dispatch(setLogEntryPosition(position))
            })
            .catch((err) => console.log("getCurrentLocationCoords error", err))
    }
}

// "position": {
//   "lat": "32.819252",
//   "lng": "-79.903800"
// }

export function setLogEntryPosition(position) {


//  position.coords.latitude + ", Longitude: " + position.coords.longitude);

    console.log("setLogEntryPosition ", position)
    console.log("setLogEntryPosition massaged ", {lat: position.coords.latitude, lng: position.coords.longitude})
    return {
        type: 'SET_LOG_ENTRY_POSITION',
        payload: {lat: position.coords.latitude, lng: position.coords.longitude}
    };
}


export function dataIsLoading() {
  return {
    type: "LOADING_DATA",
    payload: "Loading"
  }
}

export function setLog(logDocs) {
  return {
    type: "SET_LOG",
    payload: logDocs
  }
}

export function syncCompleted() {
  return {
    type: "SYNC_COMPLETE",
    payload: "Complete"
  }
}

export function syncErroring() {
  return {
      type: "SYNC_ERROR",
      payload: "Error"
  }
}

export function syncChanged() {
  return {
    type: "SYNC_CHANGE",
    payload: "Syncing"
  }
}

export function syncPaused() {
  return {
      type: "SYNC_PAUSED",
      payload: "Paused"
  }
}

export function syncResumed() {
  return {
    type: "SYNC_ACTIVE",
    payload: "Resumed"
  }
}

export function syncDenied() {
  return {
        type: "SYNC_DENIED",
        payload: "Data failed to replicate"
    }
}
