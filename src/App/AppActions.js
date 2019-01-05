import { GET_USER, GET_USER_SUCCEED, GET_USER_ERROR, LOGOUT, LOGOUT_ERROR, LOGOUT_SUCCEED } from './AppConstants';

export function loginUser(credentials) {
  return {
    type: GET_USER,
    credentials,
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
