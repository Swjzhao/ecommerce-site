import './index.css';

import {CssBaseline} from '@material-ui/core';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
const defaultTheme = createMuiTheme({});
const theme = createMuiTheme({
  '@global': {
    root: {
      width: '100vw',
      height: '100vh',
      margin: 0,
      padding: 0,
    },
    a: {
      textDecoration: 'none',
    },
  },
  'typography': {
    'margin': '0 !important',
    'margin-block-end': 0,
    'p': {
      fontSize: '2em',
    },
  },
  'palette': {
    error: {
      main: '#FF0000',
    },
  },
  'overrides': {
    MuiButton: {
      root: {
        'textTransform': 'none',
        'textDecoration': 'none',
      },
    },
    MuiLink: {

      'textDecoration': 'none',
      'textTransform': 'none',
      '&:focus, &:hover, &:visited, &:link, &:active': {
        textDecoration: 'none',
        textTransform: 'none',
      },
    },
    MuiTypography: {
      h6: {
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: '16px',
        },
      },
      p: {
        [defaultTheme.breakpoints.down('xs')]: {
          fontSize: '12px',
        },
      },
    },
  },

});


ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
