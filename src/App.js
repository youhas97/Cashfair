import React from "react";
import './styling/App.css';

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import Login from './components/login/Login'

const MS_TO_S_CONVERTION = 1000

function App() {
  if (localStorage.sinceLastClose && (Date.now() - localStorage.sinceLastClose > 2 * MS_TO_S_CONVERTION)) {
    localStorage.removeItem("btnData")
  }

  window.onunload = () => {
    localStorage.sinceLastClose = Date.now()
  }

  const loggedIn = true;
  if (!loggedIn) {
    return (
      <div className="App">
        <Login />
      </div>
    )
  }
  else {
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
