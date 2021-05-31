import React, { useContext, createContext, useReducer } from 'react';

const initialState = {
}

const actions = {
  SET_GROUPS: "SET_GROUPS",
}

const groups = createContext(initialState)
const { Provider } = groups

function GroupStoreProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case actions.SET_GROUPS:
          return action.value
        default:
          throw new Error("Undeclared action")
      }
  }, initialState);

  const value = {
    actions: actions,
    groups: state,
    dispatch: dispatch
  }
  return <Provider value={value}>{children}</Provider>;
};

function useGroupStore() {
  const context = useContext(groups)
  if (context === undefined)
    throw new Error("useGroupStore must be used within a GroupStoreProvider")

    return context
}

export { useGroupStore, GroupStoreProvider }