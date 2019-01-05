import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_USER } from './AppConstants';
import { doLogin, doLogout, getGroups } from '../utils/APICalls';
import {
  userLoggedIn,
  userLoggedInError,
  userLoggedOut,
  userLoggedOutError,
} from './AppActions';

/**
 * function to log in and load the user.
 */
export function* loginUser(action) {
  try {
    const userData = yield call(doLogin, action.credentials);
    const groupData = yield call(getGroups);
    yield put(userLoggedIn(userData, groupData));
  } catch (error) {
    yield put(userLoggedInError(error));
  }
}


/**
 * function to log in and load the user.
 */
export function* logoutUser() {
  try {
    yield call(doLogout);
    yield put(userLoggedOut());
  } catch (error) {
    yield put(userLoggedOutError(error));
  }
}

/**
 * The application will keep listening to the latest call on GET_CURRENT_PRODUCTS
 * to fetch the products
 */
export default function* AppListener() {
  yield takeLatest(GET_USER, loginUser);
}
