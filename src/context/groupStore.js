import React, { useContext, createContext, useReducer } from 'react';

const initialState = {
  groups: [],
  selectedGroup: {},
  selectedMembers: [],
  amount: undefined
}

const actions = {
  SET_GROUPS: "SET_GROUPS",
  SET_SELECTED_GROUP: "SET_SELECTED_GROUP",
  SET_SELECTED_MEMBERS: "SET_SELECTED_MEMBERS",
  SET_AMOUNT: "SET_AMOUNT"
}

const groups = createContext(initialState)
const { Provider } = groups

function GroupStoreProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case actions.SET_GROUPS:
          return {...state, groups: action.value}
        case actions.SET_SELECTED_GROUP:
          return {...state, selectedGroup: action.value}
        case actions.SET_SELECTED_MEMBERS:
          return {...state, selectedMembers: action.value}
        case actions.SET_AMOUNT:
          return {...state, amount: action.value}
        default:
          throw new Error("Undeclared action")
      }
  }, initialState);

  const value = {
    actions: actions,
    groups: state.groups,
    selectedGroup: state.selectedGroup,
    selectedMembers: state.selectedMembers,
    amount: state.amount,
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