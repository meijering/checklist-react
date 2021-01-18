import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from '@reach/router';
import { createOvermind } from 'overmind';
import { Provider } from 'overmind-react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './App/App'; // eslint-disable-line import/no-named-as-default
import ResetPassword from './components/ResetPassword';
import { config } from './overmind';
// The initial state of the App
const breakpointValues = {
  // keep first breakpoint at zero instead of 322px, see spec material ui breakpoints at https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createBreakpoints.js
  xs: 0,
  sm: 544,
  md: 768,
  lg: 992,
  xl: 1200,
};

const gridAdjustments = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  breakpoints: { values: breakpointValues },
  spacing: { unit: 15 },
  palette: {
    primary: {
      main: '#008025',
    },
    secondary: {
      main: '#ffab40',
    },
    // error: will use the default color
  },
});

const overmind = createOvermind(config, { devtools: true });

const MOUNT_NODE = document.getElementById('root');
ReactDOM.render(
  <Provider value={overmind}>
    <MuiThemeProvider theme={gridAdjustments}>
      <Router>
        <App path="/" />
        <ResetPassword path="/reset/:userId/:token" />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  MOUNT_NODE,
);
// registerServiceWorker();
