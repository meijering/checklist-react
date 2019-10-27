import React, { useState, FormEvent, MouseEvent } from 'react'
import { RouteComponentProps } from '@reach/router'
import styled from 'styled-components'
import { useOvermind } from '../overmind'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Register from './Register'

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

interface FPProps {
  userId: string,
  token: string,
}

const ResetPassword: React.FC<RouteComponentProps<FPProps>> = ({ userId, token }) => {
  const { state, actions } = useOvermind()
  const registered = ''

  const [passwords, setPasswords] = useState({
    password: '',
    passwordConfirmed: '',
  })

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const safeInputValue: string = e.currentTarget.value
    setPasswords({
      ...passwords,
      ...{ [e.currentTarget.name]: safeInputValue },
    })
  }

  const validateAndSendData = (e: MouseEvent): void => {
    e.preventDefault();
    if (userId && token && passwords.password && passwords.password === passwords.passwordConfirmed) {
      actions.changePassword({
        userId,
        password: passwords.password,
        token,
      })
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
          id="password"
          name="password"
          label="Nieuw wachtwoord"
          type="password"
          value={passwords.password}
          inputProps={{
            onChange: onChange,
          }}
          fullWidth
        />
        <TextField
          type="password"
          id="passwordConfirmed"
          name="passwordConfirmed"
          label="bevestig wachtwoord"
          value={passwords.passwordConfirmed}
          inputProps={{
            onChange: onChange,
          }}
          fullWidth
        />
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          onClick={validateAndSendData}
          color="primary"
        >
          Verzenden
        </Button>
      </CardActions>
    </LoginCard>
  )
}

export default ResetPassword
