import React from "react";
import './styling/App.css';

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import Login from './components/login/Login'

function App() {

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
