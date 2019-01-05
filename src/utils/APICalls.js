import axios from 'axios';

axios.defaults.withCredentials = true;
// const base = 'https://dgg-checklist.herokuapp.com';
const base = 'http://localhost:3000';
/**
 * login to the application
 *
 * @returns {Object} current bundle and current assigned add-ons
 */
export function doLogin(credentials) {
  return axios({
    method: 'POST',
    url: `${base}/auth/login`,
    data: credentials,
  });
}

/**
 * login to the application
 *
 * @returns {Object} current bundle and current assigned add-ons
 */
export function doLogout() {
  return axios({
    url: `${base}/auth/logout`,
  });
}

/**
 * get the customer data of the current products the client owns
 *
 * @returns {Object} current bundle and current assigned add-ons
 */
export function getGroups() {
  return axios({
    url: `${base}/api/v0/groups`,
  });
}

