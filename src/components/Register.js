import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const But = styled.span`
  cursor: pointer;
  color: green;
  text-decoration: underline;
`;

const Register = ({ register, registered }) => {
  const [openRegister, setOpenRegister] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    name: '',
  });

  useEffect(() => {
    if (registered === 'NOK') {
      setError('Dit e-mailadres kon niet worden regegistreerd');
    }
  }, [registered]);

  const onChange = (e) => {
    e.persist();
    setCredentials({
      ...credentials,
      ...{ [e.target.name]: e.target.value },
    });
  };

  const handleClickOpen = () => {
    setOpenRegister(true);
  };

  const handleClose = () => {
    setOpenRegister(false);
  };

  const validateAndSendData = (e) => {
    e.preventDefault();
    e.persist();
    if (credentials.email && credentials.name) {
      register(credentials);
    }
  };

  return (
    <React.Fragment>
      <But onClick={handleClickOpen}>(registreren)</But>
      <Dialog
        open={openRegister}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Registreren</DialogTitle>
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
                    value={credentials.email}
                    onChange={onChange}
                    fullWidth
                  />
                  <TextField
                    type="text"
                    name="name"
                    label="Naam"
                    value={credentials.name}
                    onChange={onChange}
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
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  registered: PropTypes.string.isRequired,
};

export default Register;
