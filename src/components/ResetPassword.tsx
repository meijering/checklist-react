// eslint:disable: jsx-boolean-value
import React, { useState, FormEvent, MouseEvent } from 'react';
import { RouteComponentProps } from '@reach/router';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useOvermind } from '../overmind';
import imageElement from '../assets/logo-max.png';
import { breaks } from '../utils/media';

const AppContainer = styled.div`
    position: relative;
    padding-bottom: 4em;
    min-height: calc(100vh - 4em);
`;

const Content = styled.div`
  padding: 30px 100px;
  & p, & ul {
    font-size: 20px;
    margin-top: 0;
  }
  & p.smaller {
    font-size: 14px;
    margin-top: 20px;
  }
  & img {
    float: left;
  }
  & a {
    color: green;
    padding-left: 0.3em;
    padding-right: 0.3em;
  }
  ${breaks.phone} {
    padding: 12px;
    & h1 {
      font-size: 1.5em;
    }
    & p, & ul {
      font-size: 16px;
    }
    & ul {
      padding-left: 32px;
    }
  }
`;

const Row = styled.div`
  display: flex;
  margin-top: 50px;
`;

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

interface IFPProps {
  gebruikerId?: string;
  token?: string;
}

const ResetPassword: React.FC<RouteComponentProps<IFPProps>> = ({ gebruikerId, token }: IFPProps) => {
  const { state, actions }: any = useOvermind();

  const [passwords, setPasswords] = useState({
    password: '',
    passwordConfirmed: '',
  });

  const onChange = (e: FormEvent<HTMLInputElement>): void => {
    const safeInputValue: string = e.currentTarget.value;
    setPasswords({
      ...passwords,
      ...{ [e.currentTarget.name]: safeInputValue },
    });
  };

  const validateAndSendData = (e: MouseEvent): void => {
    e.preventDefault();
    if (gebruikerId && token && passwords.password
      && passwords.password === passwords.passwordConfirmed) {
      actions.changePassword({
        gebruikerId,
        password: passwords.password,
        token,
      });
    }
  };

  return (
    <AppContainer>
      <Content>
        <Row>
          <img src={imageElement} alt="logo" />
          <h1>
            Toegangscode wijzigen
          </h1>
        </Row>
        <LoginCard>
          {state.passwordSent && state.message.code !== 'E00' ? (
            <CardContent>
              {state.message.message}
            </CardContent>
          ) : (
            <React.Fragment>
              <CardContent>
                <Error>
                  {state.message?.message}
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
                    onChange,
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
                    onChange,
                  }}
                  fullWidth
                />
              </CardContent>
              <CardActions>
                <Button
                  disabled={!(passwords.password
                    && passwords.password === passwords.passwordConfirmed)}
                  onClick={validateAndSendData}
                  color="primary"
                >
                  Verzenden
                </Button>
              </CardActions>
            </React.Fragment>
          )}
        </LoginCard>
      </Content>
    </AppContainer>
  );
};

export default ResetPassword;
