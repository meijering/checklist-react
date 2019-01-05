// reducer action names
export const GET_USER = 'App/GET_USER';
export const GET_USER_SUCCEED = 'App/GET_USER_SUCCEED';
export const LOGOUT = 'App/LOGOUT';
export const LOGOUT_SUCCEED = 'App/LOGOUT_SUCCEED';
export const LOGOUT_ERROR = 'App/LOGOUT_ERROR';
export const GET_USER_ERROR = 'App/GET_USER_ERROR';
export const GET_GROUPS = 'App/GET_GROUPS';
export const GET_GROUPS_SUCCEED = 'App/GET_GROUPS_SUCCEED';
export const GET_GROUPS_ERROR = 'App/GET_GROUPS_ERROR';

// Route names
export const routes = {
  GROUPS: {
    path: '/groepen',
    header: {
      title: 'De groene giraf checklist',
    },
  },
  default: {
    path: '/',
    header: {
      title: 'De groene giraf checklist',
    },
  },
};
export const globals = {
  COPY: {},
};
