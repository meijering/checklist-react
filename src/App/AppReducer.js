/*
 * AppReducer
 *
 * The global reducer for this app. It has actions to get the questions and current answers
 * of the logged in client.
 */

import { fromJS } from 'immutable';

import {
  GET_USER, GET_USER_SUCCEED, GET_USER_ERROR, LOGOUT, LOGOUT_SUCCEED, LOGOUT_ERROR, SAVE_ANSWER,
  SAVE_ANSWER_SUCCEED, SAVE_ANSWER_ERROR, CHECK_USER, CHECK_USER_SUCCEED, CHECK_USER_ERROR,
  REGISTER_SUCCEED,
} from './AppConstants';

// The initial state of the App
const initialState = fromJS({
  user: {},
  loggedIn: false,
  hasLoaded: false,
  groups: [],
  isRegistered: '',
  error: null,
});

function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    // initiate the action to get the groups
    // case GET_GROUPS:
    //   return state.set('hasLoaded', false);

    case GET_USER:
    case CHECK_USER:
      return state
        .set('loggedIn', false);

    case SAVE_ANSWER:
    case LOGOUT:
      return state;

    case REGISTER_SUCCEED: {
      return state
        .set('isRegistered', action.registerData.data.status);
    }

    // store the results of the action when succeeded.
    case GET_USER_SUCCEED: {
      localStorage.setItem('groups', JSON.stringify(action.groupData.data));
      return state
        .set('user', action.userData.data)
        .set('groups', action.groupData.data)
        .set('loggedIn', true);
    }
    // store the results of the action when succeeded.
    case CHECK_USER_SUCCEED: {
      if (action.userData.data.message) {
        return state
          .set('hasLoaded', true)
          .set('groups', [])
          .set('loggedIn', false);
      }
      return state
        .set('user', action.userData.data)
        .set('groups', JSON.parse(localStorage.getItem('groups')))
        .set('hasLoaded', true)
        .set('loggedIn', true);
    }
    case SAVE_ANSWER_SUCCEED: {
      const oldGroups = state.get('groups');
      const newGroups = action.answer.data.map((group) => {
        const oldGroup = oldGroups.find(og => og.groep_id === group.groep_id);
        return (
          {
            ...oldGroup,
            questions: group.questions.map((question) => {
              const oldQuestion = oldGroup.questions.find(oq => oq.vraag_id === question.vraag_id);
              return (
                {
                  ...oldQuestion,
                  answers: question.answers,
                }
              );
            }),
          }
        );
      });
      localStorage.setItem('groups', JSON.stringify(newGroups));
      return state
        .set('groups', newGroups);
    }
    // store the results of the action when succeeded.
    case LOGOUT_SUCCEED: {
      return state
        .set('user', {})
        .set('groups', [])
        .set('loggedIn', false);
    }
    case GET_USER_ERROR: {
      return state
        .set('error', 'De inloggegevens zijn onjuist!');
    }
    // For now don't do anything when the action returns with an error
    // case GET_GROUPS_ERROR:
    case SAVE_ANSWER_ERROR:
    case CHECK_USER_ERROR:
    case LOGOUT_ERROR: {
      return state
        .set('error', 'Er is geen verbinding met de server!');
    }
    default:
      return state.set('groups', []);
  }
}

export default appReducer;
