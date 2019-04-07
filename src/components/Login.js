import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Register from './Register';

const LoginCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
`;

const Login = ({
  loginUser, register, registered, error,
}) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      ...{ [e.target.name]: e.target.value },
    });
  };

  const validateAndSendData = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      loginUser(credentials);
    }
  };
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
          onChange={onChange}
          fullWidth
        />
        <TextField
          type="password"
          name="password"
          label="wachtwoord"
          value={credentials.password}
          onChange={onChange}
          fullWidth
        />
      </CardContent>
      <CardActions>
        <Button variant="outlined" onClick={validateAndSendData} color="primary">
          Inloggen
        </Button>
        <Register
          register={register}
          registered={registered}
        />
      </CardActions>
    </LoginCard>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  registered: PropTypes.string.isRequired,
  error: PropTypes.string,
};

Login.defaultProps = {
  error: '',
};

export default Login;
