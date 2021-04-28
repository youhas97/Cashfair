import React from "react";
import './styling/App.css';

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import Login from './components/login/Login'

function App() {
  // TODO: Do we really want to save location for the user? Facebook says no. Refresh will remember with Router.
  /*if (localStorage.sinceLastClose && (Date.now() - localStorage.sinceLastClose > 2 * MS_TO_S_CONVERTION)) {
    localStorage.removeItem("btnData")
  }

  window.onunload = () => {
    localStorage.sinceLastClose = Date.now()
  }*/

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
