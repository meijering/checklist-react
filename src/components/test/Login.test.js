import React from 'react';
// import sinon from 'sinon';
// import ReactTestUtils from 'react-dom/test-utils';

import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Login from '../Login';

configure({ adapter: new Adapter() });

// const evt = { preventDefault: () => { } };

const inputData = {
  valid: {
    username: 'John Doe',
    password: 'valid',
  },
  invalid: {
    username: 'Jane Doe',
    password: 'invalid',
  },
  inComplete: {
    username: 'John Doghnut',
    password: '',
  },
  validOut: {
    username: 'John Doe',
    password: '',
  },
  invalidOut: {
    username: 'Jane Doe',
    password: '',
  },
};
const outputData = {
  valid: {
    loggedIn: true,
    user: { gebruikerId: '80', naam: 'De Tester' },
    error: '',
    credentials: inputData.validOut,
  },
  inComplete: {
    loggedIn: false,
    user: {},
    error: 'Er is iets fout gegaan. Probeer later nog eens',
    credentials: inputData.inComplete,
  },
  invalid: {
    loggedIn: false,
    user: {},
    error: 'Combinatie username password is fout',
    credentials: inputData.invalidOut,
  },
};

describe('<Login />', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation((url, input) => {
      const body = JSON.parse(input.body);

      const returnValue = () => {
        if (body.username) {
          if (body.password === inputData.valid.password) {
            return outputData.valid.user;
          }
          return { error: outputData.invalid.error };
        }
        return {};
      };

      const p = new Promise((res) => {
        res({
          ok: true,
          returnValue,
          json: () => new Promise((resolve) => resolve(returnValue())),
        });
      });
      return p;
    });
  });

  test('should have a login form with username input field, password input field and submit button', () => {
    const loginForm = mount(<Login />);
    expect(loginForm.find('input').length).toBe(2);
    expect(loginForm.find('input[type="text"]').length).toBe(1);
    expect(loginForm.find('input[type="password"]').length).toBe(1);
    expect(loginForm.find('Button').length).toBe(1);
  });

  test('should show the name and a log out button when already logged in', () => {
    const logoutForm = mount(<Login />);
    logoutForm.setState(outputData.valid);
    // console.log(loginForm.find('#name').getElements()[0]);
    expect(logoutForm.find('#name').getElements()[0].props.children).toBe(outputData.valid.user.naam);
    expect(logoutForm.find('input').length).toBe(0);
    expect(logoutForm.find('Button').length).toBe(1);
  });

  test('should send the right data when clicked on the buton', () => {
    const loginForm = mount(<Login />);
    // const loginFormInstance = loginForm.instance();
    // const validateAndSendData = sinon.spy(loginFormInstance, 'validateAndSendData');
    // const getDataFromApi = sinon.spy(loginFormInstance, 'getDataFromApi');

    // let usernameInput = loginForm.find('input[type="text"]');
    // let passwordInput = loginForm.find('input[type="password"]');
    // usernameInput.getDOMNode().value = inputData.valid.username;
    // ReactTestUtils.Simulate.change(usernameInput.getDOMNode());
    // passwordInput.getDOMNode().value = inputData.valid.password;
    // ReactTestUtils.Simulate.change(passwordInput.getDOMNode());
    expect(loginForm.state().credentials).toEqual(inputData.valid);

    loginForm.find('button').simulate('click');
    // expect(validateAndSendData.calledOnce).toBe(true);
    // expect(getDataFromApi.calledOnce).toBe(true);
  });

  test('should not send the data when incorrect and clicked on the buton', () => {
    const loginForm = mount(<Login />);
    // const loginFormInstance = loginForm.instance();
    // const getDataFromApi = sinon.spy(loginFormInstance, 'getDataFromApi');

    // let usernameInput = loginForm.find('input[type="text"]')
    // let passwordInput = loginForm.find('input[type="password"]')
    // usernameInput.getDOMNode().value = inputData.inComplete.username;
    // ReactTestUtils.Simulate.change(usernameInput.getDOMNode());
    expect(loginForm.state().credentials).toEqual(inputData.inComplete);

    loginForm.find('button').simulate('click');
    // expect(getDataFromApi.calledOnce).toBe(false);
    expect(loginForm.instance().error).toEqual(outputData.inComplete.error);
    expect(loginForm.state().loggedIn).toBe(false);
  });

  test('should update state when returned from fetch with valid username and password', async () => {
    const loginForm = mount(<Login />);

    // let usernameInput = loginForm.find('input[type="text"]')
    // let passwordInput = loginForm.find('input[type="password"]')
    // usernameInput.getDOMNode().value = inputData.valid.username;
    // ReactTestUtils.Simulate.change(usernameInput.getDOMNode());
    // passwordInput.getDOMNode().value = inputData.valid.password;
    // ReactTestUtils.Simulate.change(passwordInput.getDOMNode());
    expect(loginForm.state().credentials).toEqual(inputData.valid);

    // const loggedIn = await loginForm.instance().validateAndSendData(evt);
    expect(loginForm.state().user).toEqual(outputData.valid.user);
    expect(loginForm.state().credentials).toEqual(outputData.valid.credentials);
    expect(loginForm.instance().error).toBe('');
    expect(loginForm.state().loggedIn).toBe(true);
  });

  test('should not set user and should show a message when returned from fetch with invalid username and password', async () => {
    const loginForm = mount(<Login />);

    // let usernameInput = loginForm.find('input[type="text"]')
    // let passwordInput = loginForm.find('input[type="password"]')
    // usernameInput.getDOMNode().value = inputData.invalid.username;
    // ReactTestUtils.Simulate.change(usernameInput.getDOMNode());
    // passwordInput.getDOMNode().value = inputData.invalid.password;
    // ReactTestUtils.Simulate.change(passwordInput.getDOMNode());
    expect(loginForm.state().credentials).toEqual(inputData.invalid);

    // const loggedIn = await loginForm.instance().validateAndSendData(evt);
    expect(loginForm.state().user).toEqual(outputData.invalid.user);
    expect(loginForm.instance().error).toEqual(outputData.invalid.error);
    expect(loginForm.state().loggedIn).toBe(false);
  });

  test('should call the logout method when the log out button is clicked', () => {
    const logoutForm = mount(<Login />);
    logoutForm.setState(outputData.valid);
    // const logoutFormInstance = logoutForm.instance();
    // const logoutUser = sinon.spy(logoutFormInstance, 'logoutUser');
    logoutForm.find('button').simulate('click');
    // expect(logoutUser.calledOnce).toBe(true);
  });

  test('should reset userdata and log out when the log out button is clicked', async () => {
    const logoutForm = mount(<Login />);
    logoutForm.setState(outputData.valid);
    // const loggedOut = await logoutForm.instance().logoutUser(evt);
    expect(logoutForm.state().loggedIn).toBe(false);
    expect(logoutForm.state().user).toEqual({});
    expect(logoutForm.instance().error).toBe('');
  });
});
