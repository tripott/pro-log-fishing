//import auth0 from 'auth0-js'
import history from './history'
import { SET_SESSION } from './actions/actions'
import { createOrSetCurrentUser } from './actions/actioncreators'
import {getDBLogEntries, listen, sync} from './syncronize'
import store from './store'
import auth0 from 'auth0-js'
import { pathOr, propOr } from 'ramda'
//import { getOrCreateUser } from './db'

export default () => {
  const authentication = new auth0.WebAuth({
    domain: 'tripott.auth0.com',
    clientID: 'K63eTSltETmoZ4YWHQVqhb3C0POSGwgc',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://tripott.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'profile openid'
  })

  if (isAuthenticated()) {
    //console.log(
    //  'isAuthenticated is true, about to dispatch session from local storage'
    //)
    // dispatch our session
    //     store.dispatch(getOrCreateUser({
    //       access_token: localStorage.getItem('access_token'),
    //       id_token: localStorage.getItem('id_token'),
    //       expires_at: localStorage.getItem('expiresAt'),
    //       profile: JSON.parse(localStorage.getItem('profile') || {})
    //     }))

    const sessionPayload = {
      access_token: localStorage.getItem('access_token'),
      id_token: localStorage.getItem('id_token'),
      expires_at: localStorage.getItem('expiresAt'),
      profile: JSON.parse(localStorage.getItem('profile') || {})
    }

    store.dispatch({
      type: SET_SESSION,
      payload: sessionPayload
    })

    const profileSub = pathOr(null, ['profile','sub'], sessionPayload )
    const token = propOr(null, 'id_token', sessionPayload )

    if (profileSub) {
      sync(profileSub, token)
      getDBLogEntries(profileSub)
      listen(profileSub)

    }

  }

  return {
    login,
    handleAuthentication,
    setSession,
    logout,
    isAuthenticated
  }

  function login() {
    authentication.authorize()
  }

  function handleAuthentication() {
    authentication.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult)
        console.log('set access')
        //history.push('/profiles');
      } else if (err) {
        history.replace('/')
        console.log(err)
      }
    })
  }

  function setSession(authResult) {
    // Set the time that the access token will expire at
    //Makeauth0s a call to the /userinfo endpoint and returns the user profile.
    console.log('Begin setSession')

    authentication.client.userInfo(authResult.accessToken, (err, profile) => {
      if (err) return console.log(err)

      console.log('authResult ', authResult)
      console.log('profile ', profile)

      let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      )

      localStorage.setItem('access_token', authResult.accessToken)
      localStorage.setItem('id_token', authResult.idToken)
      localStorage.setItem('expires_at', expiresAt)
      localStorage.setItem('profile', JSON.stringify(profile))

      // tell redux
      store.dispatch({
        type: SET_SESSION,
        payload: {
          profile: profile,
          access_token: authResult.accessToken,
          id_token: authResult.idToken,
          expires_at: expiresAt
        }
      })

      store.dispatch(createOrSetCurrentUser(profile, history))
    })
  }

  function logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    store.dispatch({
      type: SET_SESSION,
      payload: { access_token: '' }
    })

    // navigate to the login route
    history.replace('/')
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
//    console.log('isAuthenticated()?', new Date().getTime() < expiresAt)
    return new Date().getTime() < expiresAt
  }
}
