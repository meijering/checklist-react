/* eslint-disable no-unused-vars, react/jsx-curly-brace-presence */
// tslint:disable: jsx-boolean-value
import React, {
  useState,
  FormEvent,
  MouseEvent,
  Fragment,
} from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import { useOvermind } from '../overmind';

const But = styled.span`
  cursor: pointer;
  color: green;
  text-decoration: underline;
`;

const ForgotPassword: React.FC = () => {
  const { state, actions }: any = useOvermind();
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [error] = useState('');
  const [forgotData, setForgotData] = useState('');

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const safeInputValue: string = e.currentTarget.value;
    e.persist();
    setForgotData(safeInputValue);
  };

  const handleClickOpen = () => {
    setOpenForgotPassword(true);
  };

  const handleClose = () => {
    actions.releaseSendPwd();
    setOpenForgotPassword(false);
  };

  const validateAndSendData = (e: MouseEvent): void => {
    e.preventDefault();
    if (forgotData) {
      actions.doSendPwd(forgotData);
    }
  };

  return (
    <Fragment>
      <But
        onClick={handleClickOpen}
      >
        (wachtwoord vergeten)
      </But>
      <Dialog
        fullWidth
        maxWidth={'md'}
        open={openForgotPassword}
        onClose={handleClose}
        aria-labelledby="register"
      >
        <DialogTitle id="register">Wachtwoord vergeten</DialogTitle>
        {state.passwordSent ? (
          <React.Fragment>
            <DialogContent>
              {state.message.message}
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
                value={forgotData}
                inputProps={{
                  onChange,
                }}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={validateAndSendData} color="primary">
                Versturen
              </Button>
              <Button onClick={handleClose} color="secondary">
                Annuleren
              </Button>
            </DialogActions>
          </React.Fragment>
        )}
      </Dialog>
    </Fragment>
  );
};

export default ForgotPassword;
