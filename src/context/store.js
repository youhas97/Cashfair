import React, { useContext, createContext, useReducer } from 'react';
import { io } from 'socket.io-client'

const initialState = {
  socket: io("http://localhost:5000", {
    autoConnect: false
  }),
  token: undefined,
  successfulRegistration: false
}

const actions = {
  UPDATE_SOCKET: "UPDATE_SOCKET",
  UPDATE_TOKEN: "UPDATE_TOKEN",
  UPDATE_SUC_REG: "UPDATE_SUC_REG"
}

const store = createContext(initialState)
const { Provider } = store

function StoreProvider( { children } ) {
  const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case actions.UPDATE_SOCKET:
          return { ...state, socket: action.value}
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
    dispatch: dispatch
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