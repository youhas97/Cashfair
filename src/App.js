import React, {useEffect} from "react";
import './styling/App.css';

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import Login from './components/login/Login'

import { useStore } from './context/store'

function App() {
  const { socket } = useStore()

  useEffect(() => {
    return () => {
      socket.removeAllListeners()
      socket.disconnect()
    }
  }, [socket])

  if (!socket || socket.disconnected) {
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
