import React from "react";
import './styling/App.css';

import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

import Login from './components/login/Login'

import { useStore } from './context/store'
import { io } from "socket.io-client"

const MS_TO_S_CONVERTION = 1000

const socket = io("http://localhost:5000", {
  autoConnect: false
})

function App() {

  const { actions, dispatch, store } = useStore()

  useEffect(() => {
    if (!store.socket)
      dispatch({type: actions.CREATE_SOCKET, value: socket})
  }, [store.socket])

  if (!store.socket || store.socket.disconnected) {
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
