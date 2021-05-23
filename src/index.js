import React from 'react'
import ReactDOM from 'react-dom'
import './styling/index.css'

import { BrowserRouter as Router } from 'react-router-dom'
import { StoreProvider } from './context/store'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'

import App from './App';
import reportWebVitals from './reportWebVitals'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#32BB64",
      contrastText: "#f5f5f5"
    },
    secondary: {
      main: "#308551",
      contrastText: "#f5f5f5"
    },
  },
})

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </StoreProvider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
