import React, {useEffect, useState} from "react";
import './styling/App.css';

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import Login from './components/login/Login'

import { useStore } from './context/store'

function App() {
  const { store, socket } = useStore()

  /**
   * Careful about cleaning socket on store token.
   * Socket will be cleaned up on every change for token.
   * Now we check if token is undefined before deciding to cleanup,
   * which works on the initial socket connect.
   */
  useEffect(() => {
    if(store.token) {
      return () => {
        socket.removeAllListeners()
        socket.disconnect()
      }
    }
  }, [store.token])

  useEffect(() => {
    return () => {
      socket.removeAllListeners()
      socket.disconnect()
    }
  }, [socket])

  if (!store.token) {
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
