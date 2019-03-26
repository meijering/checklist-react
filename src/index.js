import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import configureStore from './configureStore';
import App from './App/App'; // eslint-disable-line import/no-named-as-default
import StoreContext from './utils/storeContext';


// The initial state of the App
const initialState = {};

const store = configureStore(initialState);
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
const MOUNT_NODE = document.getElementById('root');
ReactDOM.render(
  <MuiThemeProvider theme={gridAdjustments}>
    <Provider store={store}>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </Provider>
  </MuiThemeProvider>,
  MOUNT_NODE,
);
// registerServiceWorker();
