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
  errors: {
    server: null,
    login: null,
    check: null,
    register: null,
    answer: null,
  },
});

function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    // initiate the action to get the groups
    // case GET_GROUPS:
    //   return state.set('hasLoaded', false);

    case GET_USER:
      return state
        .setIn(['error', 'login'], null)
        .set('loggedIn', false);

    case CHECK_USER:
      return state
        .setIn(['error', 'check'], null);

    case SAVE_ANSWER:
      return state
        .setIn(['error', 'answer'], null);

    case LOGOUT:
      return state;

    case REGISTER_SUCCEED: {
      return state
        .set('isRegistered', action.registerData.data.status)
        .setIn(['error', 'register'], null);
    }

    // store the results of the action when succeeded.
    case GET_USER_SUCCEED: {
      localStorage.setItem('groups', JSON.stringify(action.groupData.data));
      return state
        .setIn(['error', 'login'], null)
        .set('user', action.userData.data)
        .set('groups', action.groupData.data)
        .set('loggedIn', true);
    }
    // store the results of the action when succeeded.
    case CHECK_USER_SUCCEED: {
      if (action.userData.data.message) {
        return state
          .setIn(['error', 'check'], action.userData.data.message)
          .set('hasLoaded', true)
          .set('groups', []);
      }
      return state
        .setIn(['error', 'check'], null)
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
        .setIn(['error', 'answer'], null)
        .set('groups', newGroups);
    }
    // store the results of the action when succeeded.
    case LOGOUT_SUCCEED: {
      return state
        .set('user', {})
        .set('groups', [])
        .set('loggedIn', false);
    }

    case GET_USER_ERROR:
      return state
        .setIn(['error', 'login'], 'De inloggegevens zijn onjuist!');

    case SAVE_ANSWER_ERROR:
      return state
        .setIn(['error', 'answer'], 'Antwoord niet opgeslagen');

    case CHECK_USER_ERROR:
      return state
        .setIn(['error', 'check'], 'Gebruiker ongeauthoriseerd');

    case LOGOUT_ERROR:
      return state
        .setIn(['error', 'logout'], 'Uitloggen niet goedgegaan');

    default:
      return state.set('groups', []);
  }
}

export default appReducer;
