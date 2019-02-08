import { put, takeLatest, call, all } from 'redux-saga/effects';

import { REGISTER, GET_USER, LOGOUT, SAVE_ANSWER } from './AppConstants';
import { doLogin, doLogout, getGroups, doRegister, doSaveAnswer } from '../utils/APICalls';
import {
  userLoggedIn,
  userLoggedInError,
  userLoggedOut,
  userLoggedOutError,
  registered,
  registerError,
  answerSaved,
} from './AppActions';

/**
 * function to log in, load the user and questions.
 */
export function* registerVisitor(action) {
  try {
    const registerData = yield call(doRegister, action.credentials);
    yield put(registered(registerData));
  } catch (error) {
    yield put(registerError(error));
  }
}

/**
 * function to log in, load the user and questions.
 */
export function* saveAnswer(action) {
  try {
    const answerData = yield call(doSaveAnswer, action.question, action.answer);
    yield put(answerSaved(answerData));
  } catch (error) {
    // yield put(registerError(error));
  }
}
/**
 * function to log in, load the user and questions.
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
 * function to log out and unload the user and questions.
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
 * The application will keep listening to the latest call on GET_USER
 * to fetch the products
 */
export default function* AppListener() {
  yield all([
    yield takeLatest(REGISTER, registerVisitor),
    yield takeLatest(GET_USER, loginUser),
    yield takeLatest(SAVE_ANSWER, saveAnswer),
    yield takeLatest(LOGOUT, logoutUser),
  ]);
}
