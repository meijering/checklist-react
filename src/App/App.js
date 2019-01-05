/**
 * The start of the application.
 */
import React from 'react';

// import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../utils/injectReducer';
import injectSaga from '../utils/injectSaga';

import { userHasLoggedIn, getUser, getGroups } from './AppSelectors';
import * as ActionCreators from './AppActions';
import reducer from './AppReducer';
import saga from './AppSaga';
// import { routes, globals } from './AppConstants';

// import './App.css';
import Login from '../components/Login';
import Groups from '../components/Groups';
// import { getGroups } from '../utils/APICalls';

// Homepage page has log in, when logged in we collect all the data:
// groups, questions, answers, etc. After that we can show the first page
class AppImpl extends React.PureComponent {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.shape().isRequired,
    groups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  render() {
    const {
      loggedIn,
      user,
      groups,
      loginUser,
      logoutUser,
    } = this.props;
    console.log('===', user, groups);
    return (
      <div className="App">
        <header className="App-header">
          <img src="assets/logo-max.png" alt="logo" />
          <h1 className="App-title">Welkom bij de checklist</h1>
          <Login
            loginUser={loginUser}
            logoutUser={logoutUser}
            user={user}
            loggedIn={loggedIn}
          />
        </header>
        {loggedIn && <Groups groups={groups} />}
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  user: getUser(),
  groups: getGroups(),
  loggedIn: userHasLoggedIn(),
});

export const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'theApp', reducer });
const withSaga = injectSaga({ key: 'theApp', saga });

export default compose(
  // withRouter,
  withReducer,
  withSaga,
  withConnect,
)(AppImpl);
