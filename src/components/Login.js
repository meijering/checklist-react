import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Register from '../components/Register';

const LoginCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
`;
class Login extends Component {
  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        password: '',
      },
    };
  }

  onChange = (e) => {
    const credentials = Object.assign({}, this.state.credentials, {
      [e.target.name]: e.target.value,
    });
    this.setState({ credentials });
  };

  validateAndSendData = (e) => {
    e.preventDefault();
    if (this.state.credentials.username && this.state.credentials.password) {
      this.props.loginUser(this.state.credentials);
    }
  };

  render() {
    const {
      register,
      error,
    } = this.props;
    const { credentials } = this.state;
    return (
        <LoginCard
          aria-labelledby="form-dialog-title"
        >
          <CardContent>
            {error}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="username"
              label="e-mailadres"
              type="email"
              value={credentials.username}
              onChange={this.onChange}
              fullWidth
            />
            <TextField
              type="password"
              name="password"
              label="wachtwoord"
              value={credentials.password}
              onChange={this.onChange}
              fullWidth
            />
          </CardContent>
          <CardActions>
            <Button variant="outlined" onClick={this.validateAndSendData} color="primary">
              Inloggen
            </Button>
            <Button variant="outlined" onClick={this.handleClose}>
              Annuleren
            </Button>
            <Register
              register={register}
            />
          </CardActions>
        </LoginCard>
    );
  }
}

export default Login;
