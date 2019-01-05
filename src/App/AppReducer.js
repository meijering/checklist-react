/*
 * AppReducer
 *
 * The global reducer for this app. It has actions to get the questions and current answers
 * of the logged in client.
 */

import { fromJS } from 'immutable';

import { GET_USER, GET_USER_SUCCEED, LOGOUT, LOGOUT_SUCCEED, LOGOUT_ERROR } from './AppConstants';

// The initial state of the App
const initialState = fromJS({
  user: {},
  loggedIn: false,
  hasLoaded: false,
  groups: [],
});

function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    // initiate the action to get the groups
    // case GET_GROUPS:
    //   return state.set('hasLoaded', false);

    case GET_USER:
      return state.set('loggedIn', false);

    case LOGOUT:
      return state;

    // store the results of the action when succeeded.
    case GET_USER_SUCCEED: {
      return state
        .set('user', action.userData.data)
        .set('groups', action.groupData.data)
        .set('loggedIn', true);
    }

    // store the results of the action when succeeded.
    case LOGOUT_SUCCEED: {
      return state
        .set('user', {})
        .set('groups', [])
        .set('loggedIn', false);
    }

    // // store the results of the action when succeeded.
    // case GET_GROUPS_SUCCEED: {
    //   return state
    //     .set('groups', action.groups.data)
    //     .set('hasLoaded', true);
    // }

    // For now don't do anything when the action returns with an error
    // case GET_GROUPS_ERROR:
    case LOGOUT_ERROR:
      return state;

    default:
      return state.set('groups', []);
  }
}

export default appReducer;
