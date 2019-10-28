import React, { useState, useEffect, FormEvent, MouseEvent } from 'react'
import styled from 'styled-components'
import { useOvermind } from '../overmind'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import ForgotPassword from './ForgotPassword'

const LoginCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
`;

const Error = styled.div`
  height: 1em;
  font-weight: bold;
  text-align: center;
  color: red;
`;

const Login: React.FC = () => {
  const { state, actions } = useOvermind()
  const registered = ''

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [isDisabled, setIsDisabled] = useState(!(credentials.username && credentials.password))
  useEffect(() => {
    setIsDisabled(!(credentials.username && credentials.password))
  }, [credentials])

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const safeInputValue: string = e.currentTarget.value
    setCredentials({
      ...credentials,
      ...{ [e.currentTarget.name]: safeInputValue },
    })
  }

  const validateAndSendData = (e: MouseEvent): void => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      actions.doLogin(credentials)
    }
  }

  return (
    <LoginCard>
      <CardContent>
        <Error>
          {state.error.login}
        </Error>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          name="username"
          label="e-mailadres"
          type="email"
          value={credentials.username}
          inputProps={{
            onChange: onChange,
          }}
          fullWidth
        />
        <TextField
          type="password"
          id="password"
          name="password"
          label="wachtwoord"
          value={credentials.password}
          inputProps={{
            onChange: onChange,
          }}
          fullWidth
        />
      </CardContent>
      <CardActions>
        <Button
          disabled={isDisabled}
          onClick={validateAndSendData}
          color="primary"
        >
          Inloggen
        </Button>
        <ForgotPassword />
      </CardActions>
    </LoginCard>
  )
}

export default Login
