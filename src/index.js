import React from 'react'
import ReactDOM from 'react-dom'
import './styling/index.css'


import { Provider } from 'react-redux'
import { createStore, combineReducers} from 'redux'
import testReducer from './redux/reducers/testReducer'
import navButtonReducer from './redux/reducers/navButtonReducer'

import App from './App';
import reportWebVitals from './reportWebVitals'

const rootReducer = combineReducers({test: testReducer, navButton: navButtonReducer})
const store = createStore(navButtonReducer)

ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
