import React, { useState, useEffect, FormEvent, MouseEvent } from 'react'
import styled from 'styled-components'
import { useOvermind } from '../overmind'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const But = styled.span`
  cursor: pointer;
  color: green;
  &::before {
    content: ' ';
  }
  &::after {
    content: ' ';
  }
  & span {
    text-decoration: underline;
  }
`

const Register: React.FC = () => {
  const { state, actions } = useOvermind()
  const [openRegister, setOpenRegister] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [registerData, setRegisterData] = useState({
    email: '',
    name: '',
  })

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const safeInputValue: string = e.currentTarget.value
    e.persist()
    setRegisterData({
      ...registerData,
      ...{ [e.currentTarget.name]: safeInputValue },
    })
  }

  const handleClickOpen = () => {
    actions.releaseRegister();
    setOpenRegister(true)
  }

  const handleClose = () => {
    setOpenRegister(false)
  }

  const validateAndSendData = (e: MouseEvent): void => {
    e.preventDefault()
    if (registerData.email && registerData.name) {
      actions.doRegister(registerData)
    }
  }

  return (
    <React.Fragment>
      <p>Heb je nog geen inloggegevens? 
        <But onClick={handleClickOpen}>
          <span>Registreer</span>
        </But>
        je eerst, dan sturen we je inloggevens toe.
      </p>
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={openRegister}
        onClose={handleClose}
        aria-labelledby="register"
      >
        <DialogTitle id="register">Registreren</DialogTitle>
        {state.isRegistered ? (
          <React.Fragment>
            <DialogContent>
              {state.message}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Sluiten
              </Button>
            </DialogActions>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="email"
                label="E-mailadres"
                type="email"
                value={registerData.email}
                inputProps={{
                  onChange: onChange,
                }}
                fullWidth
              />
              <TextField
                type="text"
                name="name"
                label="Naam"
                value={registerData.name}
                inputProps={{
                  onChange: onChange,
                }}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button
                disabled={!(registerData.email && registerData.name)}
                onClick={validateAndSendData}
                color="primary"
              >
                Registreren
              </Button>
              <Button onClick={handleClose} color="secondary">
                Annuleren
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  )
}

export default Register
