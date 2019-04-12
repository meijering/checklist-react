/**
 * Make selectors for the user and the loggedIn flag
 */
import { createSelector } from 'reselect';

const appSelector = state => state.get('theApp');

const userHasLoggedIn = () => createSelector(appSelector, theAppState => (theAppState ? theAppState.get('loggedIn') : false));
const hasLoaded = () => createSelector(appSelector, theAppState => (theAppState ? theAppState.get('hasLoaded') : false));

const getUser = () => createSelector(appSelector, theAppState => (theAppState ? theAppState.get('user') : {}));

const getGroups = () => createSelector(appSelector, theAppState => (theAppState ? theAppState.get('groups') : []));
const hasRegistered = () => createSelector(appSelector, theAppState => (theAppState ? theAppState.get('isRegistered') : ''));
const errors = () => createSelector(appSelector, theAppState => (theAppState
  ? theAppState.get('error').toJSON()
  : {
    server: null,
    login: null,
    check: null,
    register: null,
    answer: null,
  }
));

export {
  errors, appSelector, userHasLoggedIn, getUser, getGroups, hasLoaded, hasRegistered,
};
