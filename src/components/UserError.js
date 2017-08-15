import React from 'react'
import { connect } from 'react-redux'
import Banner from './Banner'

const UserError = props => {
  const icon = props.user.problemFindingUserInDB ||
    props.user.problemCreatingUserInDB ||
    props.user.problemReadingUserFromDB
    ? 'fa fa-exclamation-circle'
    : 'fa fa-info-circle'
  let message = ''

  if (props.user.problemFindingUserInDB) {
    message =
      'We had a problem finding your user profile. Log out and try again.'
  } else if (props.user.problemCreatingUserInDB) {
    message =
      'We had a problem creating your user profile. Log out and try again.'
  } else if (props.user.problemReadingUserFromDB) {
    message =
      'We had a problem retrieving your user profile. Log out and try again.'
  } else {
    message = 'We had a problem with your user profile. Log out and try again.'
  }

  return (
    <article className="center ph3 ph5-ns tc br2 pv5 bg-washed-blue dark-gray mb5">

      <Banner icon={icon} backgroundColor="red" message={message} />

      <div>
        <button
          className="f6 br-pill bg-dark-blue no-underline washed-blue ba b--dark-gray grow pv2 ph3 dib mr3"
          onClick={e => props.auth.logout()}
        >
          Log Out
        </button>
      </div>
    </article>
  )
}

const mapStateToProps = function(state) {
  return {
    user: state.user
  }
}

const connector = connect(mapStateToProps)
export default connector(UserError)
