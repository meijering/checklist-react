/**
 * The start of the application.
 * Homepage page has log in, when logged in we collect all the data:
 * groups, questions, answers, etc. After that we can show the first page
 */
import * as React from 'react'
import { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CircleLoader from 'react-spinners/CircleLoader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useOvermind } from '../overmind'
import imageElement from '../assets/logo-max.png'
import Login from '../components/Login'
import AppBar from '../components/AppBar'
import Register from '../components/Register'
import Privacy from '../components/Privacy'
import { media } from '../utils/media'

const Groups = React.lazy(() => import('../components/Groups'))

const AppContainer = styled.div`
    position: relative;
    padding-bottom: 4em;
    min-height: calc(100vh - 4em);
`

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
`

const Row = styled.div`
  display: flex;
  margin-top: 50px;
`

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
`
const App: React.FC<RouteComponentProps> = () => {
  const { state, actions } = useOvermind()

  useEffect(() => {
    actions.checkLogin()
  }, [])

  useEffect(() => {
    if (Object.keys(state.error).length > 0) {
      console.log(state.error)
      toast(state.error.login)
    }
  }, [state.error])

  return (
    <AppContainer>
      <AppBar />
      {state.isLoggedIn ? (
        <React.Suspense fallback={<div />}>
          <Groups />
        </React.Suspense>
      ) : (
        <Content>
          <Row>
          <img src={imageElement} alt="logo" />
            <h1>
              Welkom
            </h1>
          </Row>
          <Row>
            <Register />
          </Row>
          {state.hasLoaded ? (
            <Login />
          ) : (
            <Error>
              <p>{
                (state.error && 'server' in state.error && state.error.server)
                || 'er wordt verbinding gemaakt met de server...'
              }</p>
              {!('server' in state.error) && <CircleLoader color="#008025" />}
            </Error>
          )}
        
        </Content>
      )}
      <Privacy />
      <ToastContainer />
    </AppContainer>
  )
}

export default App
