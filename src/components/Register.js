import React, { Component } from 'react';
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

class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: '',
  }
  constructor(props) {
    super(props);
    this.state = {
      openRegister: false,
      credentials: {
        email: '',
        name: '',
      },
    };
  }
  onChange = (e) => {
    const credentials = Object.assign(
      {},
      this.state.credentials,
      { [e.target.name]: e.target.value },
    );
    this.setState({ credentials });
  }

  handleClickOpen = () => {
    this.setState({ openRegister: true });
  };

  handleClose = () => {
    this.setState({ openRegister: false });
  };

  validateAndSendData = (e) => {
    e.preventDefault();
    if (this.state.credentials.email && this.state.credentials.name) {
      this.props.register(this.state.credentials);
    }
    this.setState({ openRegister: false });
  }

  render() {
    const {
      error,
    } = this.props;
    const { credentials, openRegister } = this.state;
    return (
      <React.Fragment>
        <But onClick={this.handleClickOpen}>(registreren)</But>
        <Dialog
          open={openRegister}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Registreren</DialogTitle>
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
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              type="text"
              name="name"
              label="Naam"
              value={credentials.name}
              onChange={this.onChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuleren
            </Button>
            <Button onClick={this.validateAndSendData} color="primary">
              Registreren
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default Register;
