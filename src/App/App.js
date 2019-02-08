/**
 * The start of the application.
 * Homepage page has log in, when logged in we collect all the data:
 * groups, questions, answers, etc. After that we can show the first page
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../utils/injectReducer';
import injectSaga from '../utils/injectSaga';

import { userHasLoggedIn, getUser, getGroups } from './AppSelectors';
import * as ActionCreators from './AppActions';
import reducer from './AppReducer';
import saga from './AppSaga';
import Login from '../components/Login';
import Groups from '../components/Groups';
import AppBar from '../components/AppBar';
import imageElement from '../assets/logo-max.png';
import { media } from '../utils/media';

const Content = styled.div`
  padding: 30px 100px;
  ${media.phone`
    padding: 12px;
  `}
  & p {
    font-size: 20px;
  }
  & img {
    float: left;
  }
  & a {
    color: green;
  }
`;

class AppImpl extends React.PureComponent {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    loggedIn: PropTypes.bool.isRequired,
    user: PropTypes.shape().isRequired,
    groups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    saveAnswer: PropTypes.func.isRequired,
  }

  render() {
    const {
      loggedIn,
      user,
      groups,
      loginUser,
      logoutUser,
      saveAnswer,
      register,
    } = this.props;

    return (
      <div className="App">
        <AppBar user={user} loggedIn={loggedIn} logoutUser={logoutUser} />

        {loggedIn ?
          <Groups groups={groups} saveAnswer={saveAnswer} /> :
          <Content>
            <img src={imageElement} alt="logo" />
            <h3>Checklist Duurzame kinderopvang</h3>
            <h2>de Groene Giraf</h2>
            <h1>Welkom</h1>
            <p>
              Deze checklist geeft u inzicht in de prestaties van uw kinderopvang op het gebied
              van duurzaamheid.
            </p>
            <p>
              De Groene Giraf werkt voor een mooiere, schone en voor iedereen welvarende toekomst.
              Dat doet hij met deze checklist. Bent u geïnteresseerd in de mogelijkheden voor uw
              specifieke situatie of locatie? Heeft u vragen, opmerkingen of zelf een duurzame tip?
              Neem dan contact op met Ilse Vlaming, initiatiefnemer van de Groene Giraf:
              <a href="tel:06 41 848 766">06 41 848 766</a> of <a href="mailto:info@degroenegiraf.nl">info@degroenegiraf.nl</a>
            </p>
            <Login
              loginUser={loginUser}
              logoutUser={logoutUser}
              register={register}
              user={user}
              loggedIn={loggedIn}
            />
          </Content>}
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
