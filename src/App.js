import React, { useContext } from "react";

import logo from './logo.svg';
import './styling/App.css';

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import Login from './components/login/Login'

import { useStore } from './context/store'

const MS_TO_S_CONVERTION = 1000

function App() {
  if (localStorage.sinceLastClose && (Date.now() - localStorage.sinceLastClose > 2 * MS_TO_S_CONVERTION)) {
    localStorage.removeItem("btnData")
  }

  window.onunload = () => {
    localStorage.sinceLastClose = Date.now()
  }

  const loggedIn = false;
  if (!loggedIn) {
    return (
      <div className="App">
        <Login />
      </div>
    )
  }
  else {
    // TODO: Verify token. If false, unset token
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    )
  }
}

export default App;
