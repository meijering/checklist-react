import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Groups from './Groups';

class Login extends Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    loggedIn: PropTypes.bool.isRequired,
    loginUser: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    error: PropTypes.string,
  };

  static defaultProps = {
    error: '',
  }
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
    const credentials = Object.assign(
      {},
      this.state.credentials,
      { [e.target.name]: e.target.value },
    );
    this.setState({ credentials });
  }

  validateAndSendData = (e) => {
    e.preventDefault();
    if (this.state.credentials.username && this.state.credentials.password) {
      this.props.loginUser(this.state.credentials);
    }
  }

  render() {
    const {
      loggedIn,
      logoutUser,
      error,
      user,
    } = this.props;
    const { credentials } = this.state;
    if (loggedIn) {
      return (
        <form>
          <h2 id="name">{user.naam}</h2>
          <Button variant="contained" color="primary" onClick={logoutUser}> uitloggen </Button>
        </form>
      );
    }
    return (
      <form>
        <b>{error}</b>
        <TextField helperText="Voer je email adres in" type="text" name="username" label="e-mail" value={credentials.username} onChange={this.onChange} />
        <TextField type="password" name="password" label="wachtwoord" value={credentials.password} onChange={this.onChange} />
        <Button variant="contained" color="primary" onClick={this.validateAndSendData}> inloggen </Button>
      </form>
    );
  }
}

export default Login;
