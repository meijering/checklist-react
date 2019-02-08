import { REGISTER, REGISTER_SUCCEED, REGISTER_ERROR, GET_USER, GET_USER_SUCCEED, GET_USER_ERROR, LOGOUT, LOGOUT_ERROR, LOGOUT_SUCCEED, SAVE_ANSWER, SAVE_ANSWER_SUCCEED } from './AppConstants';

export function loginUser(credentials) {
  return {
    type: GET_USER,
    credentials,
  };
}

export function register(credentials) {
  return {
    type: REGISTER,
    credentials,
  };
}

export function registered(registerData) {
  return {
    type: REGISTER_SUCCEED,
    registerData,
  };
}

export function registerError(error) {
  return {
    type: REGISTER_ERROR,
    error,
  };
}

export function userLoggedIn(userData, groupData) {
  return {
    type: GET_USER_SUCCEED,
    userData,
    groupData,
  };
}

export function userLoggedInError(error) {
  return {
    type: GET_USER_ERROR,
    error,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}

export function userLoggedOut() {
  return {
    type: LOGOUT_SUCCEED,
  };
}

export function userLoggedOutError(error) {
  return {
    type: LOGOUT_ERROR,
    error,
  };
}

export function saveAnswer(question, answer) {
  return {
    type: SAVE_ANSWER,
    question,
    answer,
  };
}
export function answerSaved(answer) {
  return {
    type: SAVE_ANSWER_SUCCEED,
    answer,
  };
}
