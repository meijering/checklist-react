/**
 * Make selectors for the user and the loggedIn flag
 */
import { createSelector } from 'reselect';

const appSelector = state => state.get('theApp');

const userHasLoggedIn = () => createSelector(appSelector, theAppState => (theAppState ? theAppState.get('loggedIn') : false));

const getUser = () => createSelector(appSelector, theAppState => (theAppState ? theAppState.get('user') : {}));

const getGroups = () => createSelector(appSelector, theAppState => (theAppState ? theAppState.get('groups') : []));

export {
  appSelector, userHasLoggedIn, getUser, getGroups,
};
