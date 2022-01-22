/**
 * The start of the application.
 * Homepage page has log in, when logged in we collect all the data:
 * groups, questions, answers, etc. After that we can show the first page
 */
import React, { FC, useEffect } from 'react';
import { Router, RouteComponentProps, useLocation } from '@reach/router';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

import CircleLoader from 'react-spinners/CircleLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useOvermind } from '../overmind';
import imageElement from '../assets/logo-max.png';

import ResetPassword from '../components/ResetPassword';
import RegisterDone from '../components/done';
import Login from '../components/Login';
import MyAppBar from '../components/AppBar';
import Register from '../components/Register';
import { breaks } from '../utils/media';
import AllGroups from '../components/AllGroups';
import Groups from '../components/Groups';
import Users from '../admin/Users';
import AdminGroups from '../admin/Groups';
import AdminQuestions from '../admin/Questions';
import Admin from '../admin';
import Public from '../components';

const isProd = process.env.NODE_ENV === 'production';

const AppContainer = styled.div`
    position: relative;
    padding-top: 5em;
    padding-bottom: 4em;
    min-height: calc(100vh - 9em);
`;

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
    padding-left: 0.3em;
    padding-right: 0.3em;
  }
  ${breaks.phone} {
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
  }
`;

const Row = styled.div`
  margin-top: 50px;
  ${breaks.phone} {
    & img {
      display: none;
    }
  }
`;

const Error = styled(Card)`
  max-width: 600px;
  height: 189px;
  margin: 0 auto;
  padding: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
  &>* {
    flex: 1 0 auto;
  }
`;

const HideOnScroll =  React.forwardRef(function HideOnScroll(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  const trigger = useScrollTrigger();
  const { children } = props;
  return (
    <Slide appear={false} direction="down" in={!trigger} ref={ref}>
      {children}
    </Slide>
  );
});

const AppBody: FC = () => {
  const { state }: any = useOvermind();

  return state.hasLoaded ? (
    <Login />
  ) : (
    <Error>
      <p>
        {
          (state.error && 'server' in state.error && state.error.server) || 'er wordt verbinding gemaakt met de server...'
        }
      </p>
      {!('server' in state.error) && <CircleLoader color="#008025" />}
    </Error>
  );
};

const WelcomeContent: FC<RouteComponentProps> = () => {
  return (
    <Content>
      <Row>
        <img src={imageElement} alt="logo" />
        <h1>
        Welkom
        </h1>
      </Row>
      <Row>
        {!isProd && <Register />}
      </Row>
      <AppBody />
    </Content>);
};

const App: FC<RouteComponentProps> = () => {
  const { state, actions }: any = useOvermind();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    actions.checkLogin();
  }, []);

  useEffect(() => {
    if (state.message?.type) {
      toast[state.message.type](state.message.message);
    }
  }, [JSON.stringify(state.message)]);

  return (
    <AppContainer>
      <MyAppBar />
      {state.hasLoaded && (
        <Container>
          {state.isLoggedIn ? (
            <Router>
              <Public path="/">
                <Groups path="/" default />
                <AllGroups path="dit-gaat-goed" checked />
                <AllGroups path="dit-kan-beter" />
              </Public>
              <Admin path="/admin">
                <Users path="gebruikers" />
                <AdminGroups path="groepen" />
                <AdminQuestions path="vragen" />
              </Admin>
            </Router>
          ) : (
            <Router>
              <RegisterDone path="geregistreerd" />
              <ResetPassword path="reset/:gebruikerId/:token" />
              <WelcomeContent default />
            </Router>
          )}
          <ToastContainer />
        </Container>
      )}
    </AppContainer>
  );
};

export default App;
