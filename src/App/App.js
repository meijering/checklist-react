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

import * as selectors from './AppSelectors';
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
  & p, & ul {
    font-size: 20px;
    margin-top: 0;
  }
  & p.smaller {
    font-size: 14px;
    margin-top: 20px;
  }
  & img {
    float: left;
  }
  & a {
    color: green;
  }
  ${media.phone`
    padding: 12px;
    & h1 {
      font-size: 1.5em;
    }
    & p, & ul {
      font-size: 16px;
    }
    & ul {
      padding-left: 32px;
    }
  `}
`;

const Row = styled.div`
  display: flex;
  margin-top: 50px;
`;

const Error = styled.div`
  border: solid 1px red;
  padding: 10px;
  font-weight: bold;
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
    hasLoaded,
    error,
  } = props;
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="App">
      <AppBar user={user} loggedIn={loggedIn} logoutUser={logoutUser} />
      {loggedIn
        ? <Groups groups={groups} saveAnswer={saveAnswer} />
        : (
        <Content>
          <Row>
            <img src={imageElement} alt="logo" />
            <h1>
              Welkom bij de duurzame checklist
              <br />
              van de Groene Giraf!
            </h1>
          </Row>
          <Row>
            <p><strong>Wil je:</strong></p>
            <ul>
              <li>Bewuster omgaan met grondstoffen?</li>
              <li>Een natuurlijke, gifvrije omgeving creëren?</li>
              <li>Een kleinere ecologische voetafdruk zetten?</li>
              <li>Je gedrag verduurzamen?</li>
            </ul>
          </Row>
          <p>
            Log in en ontdek snel waar jouw kansen liggen om bij te dragen aan een mooiere,
            schone en voor iedereen welvarende toekomst!
          </p>
          <p>
            Heb je nog geen inloggegevens? Klik dan op registeren. Vul de gevraagde gegevens
            in en ontvang binnen een  paar tellen je inloggegevens per mail.
          </p>
          {hasLoaded ? (
            <Login
              loginUser={loginUser}
              logoutUser={logoutUser}
              register={register}
              registered={isRegistered}
              user={user}
              loggedIn={loggedIn}
              error={error}
            />
          ) : (
            <Error>
              Er is geen verbinding met de server. Probeer het later nog eens!
            </Error>
          )}
          <p className="smaller">
            Voor een specifiek (locatie) advies, inspiratie tijdens een studiedag of voor een
            workshop kun je de Groene Giraf ook inschakelen. Neem voor de mogelijkheden of een
            vrijblijvende offerte contact op met Ilse Vlaming, initiatiefnemer van de Groene Giraf
            via
            <a href="tel:06 41 848 766">06 41 848 766</a>
            of
            <a href="mailto:info@degroenegiraf.nl">info@degroenegiraf.nl</a>

          </p>
        </Content>
        )}
    </div>
  );
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
  hasLoaded: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

AppImpl.defaultProps = {
  error: null,
};

const mapStateToProps = createStructuredSelector({
  user: selectors.getUser(),
  groups: selectors.getGroups(),
  loggedIn: selectors.userHasLoggedIn(),
  hasLoaded: selectors.hasLoaded(),
  isRegistered: selectors.hasRegistered(),
  error: selectors.errorMsg(),
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
