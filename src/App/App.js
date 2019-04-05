/**
 * The start of the application.
 * Homepage page has log in, when logged in we collect all the data:
 * groups, questions, answers, etc. After that we can show the first page
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from '../utils/injectReducer';
import injectSaga from '../utils/injectSaga';

import {
  userHasLoggedIn, getUser, getGroups, hasLoaded, hasRegistered,
} from './AppSelectors';
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

const AppImpl = (props) => {
  const {
    loggedIn,
    user,
    groups,
    loginUser,
    checkUser,
    logoutUser,
    saveAnswer,
    register,
    isRegistered,
  } = props;
  useEffect(() => {
    checkUser();
  }, []);

  return hasLoaded ? (
    <div className="App">
      <AppBar user={user} loggedIn={loggedIn} logoutUser={logoutUser} />

      {loggedIn
        ? <Groups groups={groups} saveAnswer={saveAnswer} />
        : (
        <Content>
          <img src={imageElement} alt="logo" />
          <h1>Welkom bij de checklist duurzame kinderopvang van de Groene Giraf!</h1>
          <p>Wil je:</p>
          <ul>
            <li>Bewuster omgaan met grondstoffen?</li>
            <li>Een natuurlijke, gifvrije omgeving creëren?</li>
            <li>Goed doen voor mens en maatschappij?</li>
            <li>Een kleinere voetafdruk en meer impact</li>
          </ul>
          <p>
            Log in en ontdek snel waar jouw kansen liggen om bij te dragen aan een mooiere,
            schone en voor iedereen welvarende toekomst! Na invullen van de checklist zie je
            waar jullie goed in zijn en waar je nog groene stappen kunt maken.
          </p>

          <p>
            Heb je nog geen inloggegevens? Klik dan op registeren. Vul de gevraagde gegevens
            in en ontvang binnen een  paar tellen je inloggegevens per mail.
            <br />
            Deze checklist geeft inzicht in de prestaties van jouw kinderopvang op het gebied
            van duurzaamheid.
            <br />
            Voor een specifiek (locatie) advies, inspiratie tijdens een studiedag of voor een
            workshop kun je de Groene Giraf ook inschakelen. Neem voor de mogelijkheden of een
            vrijblijvende offerte contact op met Ilse Vlaming, initiatiefnemer van de Groene Giraf
            via
            <a href="tel:06 41 848 766">06 41 848 766</a>
            of
            <a href="mailto:info@degroenegiraf.nl">info@degroenegiraf.nl</a>
          </p>
          <Login
            loginUser={loginUser}
            logoutUser={logoutUser}
            register={register}
            registered={isRegistered}
            user={user}
            loggedIn={loggedIn}
          />
        </Content>
        )}
    </div>
  ) : null;
};

AppImpl.propTypes = {
  loginUser: PropTypes.func.isRequired,
  checkUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  isRegistered: PropTypes.string.isRequired,
  user: PropTypes.shape().isRequired,
  groups: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: getUser(),
  groups: getGroups(),
  loggedIn: userHasLoggedIn(),
  hasLoaded: hasLoaded(),
  isRegistered: hasRegistered(),
});

export const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'theApp', reducer });
const withSaga = injectSaga({ key: 'theApp', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppImpl);
