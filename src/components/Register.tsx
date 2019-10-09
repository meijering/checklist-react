import React, { useState, useEffect, FormEvent, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useOvermind } from '../overmind'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ActionSheetIOS } from 'react-native'

const But = styled.span`
  cursor: pointer;
  color: green;
  text-decoration: underline;
`

interface RegisterProps {
  registered: string,
}

const Register: React.FC<RegisterProps> = ({ registered }) => {
  const { actions } = useOvermind()
  const [openRegister, setOpenRegister] = useState(false)
  const [error, setError] = useState('')
  const [registerData, setRegisterData] = useState({
    email: '',
    name: '',
  })

  useEffect(() => {
    if (registered === 'NOK') {
      setError('Dit e-mailadres kon niet worden regegistreerd')
    }
  }, [registered])

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const safeInputValue: string = e.currentTarget.value
    e.persist()
    setRegisterData({
      ...registerData,
      ...{ [e.currentTarget.name]: safeInputValue },
    })
  }

  const handleClickOpen = () => {
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
      <But onClick={handleClickOpen}>(registreren)</But>
      <Dialog
        open={openRegister}
        onClose={handleClose}
        aria-labelledby="register"
      >
        <DialogTitle id="register">Registreren</DialogTitle>
        {registered === 'OK' ? (
          <React.Fragment>
            <DialogContent>
              Je bent geregistreerd. Je ontvangt een E-mail waarn je inloggegevens staan.
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
              <DialogContentText>{error}</DialogContentText>
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
              <Button onClick={handleClose} color="primary">
                Annuleren
              </Button>
              <Button onClick={validateAndSendData} color="primary">
                Registreren
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  )
}

export default Register
