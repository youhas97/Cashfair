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
  userData: {
    phoneNum: undefined,
    nickname: undefined
  },
  token: undefined,
  successfulRegistration: false
}

const actions = {
  SET_TOKEN: "SET_TOKEN",
  SET_SUC_REG: "SET_SUC_REG",
  SET_USER_DATA: "SET_USER_DATA"
}

const store = createContext(initialState)
const { Provider } = store

function StoreProvider( { children } ) {
  const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case actions.SET_TOKEN:
          return { ...state, token: action.value}
        case actions.SET_SUC_REG:
          return { ...state, successfulRegistration: action.value}
        case actions.SET_USER_DATA:
          return {...state, userData: action.value}
        default:
          throw new Error("Undeclared action")
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