/**
 * The start of the application.
 * Homepage page has log in, when logged in we collect all the data:
 * groups, questions, answers, etc. After that we can show the first page
 */
import * as React from 'react'
import { useEffect } from 'react'
import styled from 'styled-components'
import Card from '@material-ui/core/Card'
import CircleLoader from 'react-spinners/CircleLoader'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useOvermind } from '../overmind'
import imageElement from '../assets/logo-max.png';
import Login from '../components/Login'
import AppBar from '../components/AppBar'
import { media } from '../utils/media'

const Groups = React.lazy(() => import('../components/Groups'))

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

const App: React.FC = () => {
  const { state, actions } = useOvermind()

  useEffect(() => {
    actions.checkLogin()
  }, [])

  useEffect(() => {
    if (state.error) {
      toast(state.error.login)
    }
  }, [state.error])

  return (
    <div className="App">
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
              Welkom bij de duurzame checklist
              <br />
              van de Groene Giraf!
            </h1>
          </Row>
          <Row>
            <p><strong>Wil je:</strong></p>
            <ul>
              <li>Bewustert omgaan met grondstoffen?</li>
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
          </p>{state.hasLoaded}
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
      <ToastContainer />
    </div>
  )
}

export default App
