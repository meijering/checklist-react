/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';
import globalReducer from './App/AppReducer';

/**
 * Creates the main reducer with the dynamically injected ones
 *
 * Preferably only add reducers here that are required in the entire app.
 * For container-specific reducers, use utils/injectReducer
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    global: globalReducer,
    ...injectedReducers,
  });
}
