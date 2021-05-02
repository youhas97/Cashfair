import React, { useContext, createContext, useReducer } from 'react';

const initialState = {
  socket: undefined,
  token: undefined
}

const actions = {
  CREATE_SOCKET: "CREATE_SOCKET",
  WS_CONNECT: "WS_CONNECT",
  WS_DISCONNECT: "WS_DISCONNECT",
  SET_TOKEN: "SET_TOKEN",
}

const store = createContext(initialState)
const { Provider } = store

function StoreProvider( { children } ) {
  const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case actions.CREATE_SOCKET:
          return { ...state, socket: action.value}
        case actions.WS_CONNECT:
          return { ...state, socket: action.value}
        case actions.WS_DISCONNECT:
          return { ...state, socket: action.value}
        case actions.SET_TOKEN:
          return { ...state, token: action.value}
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
  if (context == undefined)
    throw new Error("useStore must be used within a StoreProvider")

    return context
}

export { useStore, StoreProvider }