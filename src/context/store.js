import React, { useContext, createContext, useReducer } from 'react';
import { io } from 'socket.io-client'

const socket = io("http://localhost:5000", {
  autoConnect: false,
  reconnectionAttempts: 5,
  reconnectionDelay: 300,
  reconnectionDelayMax: 600,
  withCredentials: true,
  extraHeaders: {

  }
})

const initialState = {
  token: undefined,
  successfulRegistration: false
}

const actions = {
  UPDATE_TOKEN: "UPDATE_TOKEN",
  UPDATE_SUC_REG: "UPDATE_SUC_REG"
}

const store = createContext(initialState)
const { Provider } = store

function StoreProvider( { children } ) {
  const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case actions.UPDATE_TOKEN:
          return { ...state, token: action.value}
        case actions.UPDATE_SUC_REG:
          return { ...state, successfulRegistration: action.value}
        default:
          throw new Error()
      }
  }, initialState);

  const value = {
    actions: actions,
    store: state,
    dispatch: dispatch,
    // socket is separate from the store state, used like a singleton
    socket: socket,
    url: "http://localhost:5000"
  }
  return <Provider value={value}>{children}</Provider>;
};

function useStore() {
  const context = useContext(store)
  if (context === undefined)
    throw new Error("useStore must be used within a StoreProvider")

    return context
}

export { useStore, StoreProvider }