import React, { useContext, createContext, useReducer } from 'react';

const initialState = {
  socket: undefined,
  token: undefined,
  print_out: "Get fucked",
  count: 0
}

const actions = {
  WS_CONNECT: "WS_CONNECT",
  WS_DISCONNECT: "WS_DISCONNECT",
  SET_TOKEN: "SET_TOKEN",
  PRINT: "PRINT",
  INCREMENT: "INCREMENT"
}

const store = createContext(initialState)
const { Provider } = store

function StoreProvider( { children } ) {
  const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case actions.WS_CONNECT:
          return { ...state, socket: action.value}
        case actions.WS_DISCONNECT:
          return { ...state, socket: action.value}
        case actions.SET_TOKEN:
          return { ...state, token: action.value}
        case actions.PRINT:
          return {...state, print_out: action.value}
        case actions.INCREMENT:
          return {...state, count: state.count+1}
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