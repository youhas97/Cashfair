import React, { useContext, createContext, useReducer } from 'react';
import GroupCreationFormInput from "../components/groups/GroupCreationFormInput"

const initialState = {
  1: {component: <GroupCreationFormInput key={1} id={1} />, name: "", phoneNum: ""},
  2: {component: <GroupCreationFormInput key={2} id={2} />, name: "", phoneNum: ""},
  3: {component: <GroupCreationFormInput key={3} id={3} />, name: "", phoneNum: ""}
}

const actions = {
  SET_INPUT_DICT: "SET_INPUT_DICT",
  ADD_INPUT: "ADD_INPUT",
  REMOVE_INPUT: "REMOVE_INPUT",
}

const inputDict = createContext(initialState)
const { Provider } = inputDict

function GroupStoreProvider( { children } ) {
  const [state, dispatch] = useReducer((state, action) => {
      switch(action.type) {
        case actions.SET_INPUT_DICT:
          var newDict = {...state}
          newDict[action.value.id].name = action.value.name
          newDict[action.value.id].phoneNum = action.value.phoneNum
          return newDict
        case actions.ADD_INPUT:
          var newDict = {...state}
          var len = Object.keys(newDict).length + 1
          newDict[len] = {component: <GroupCreationFormInput key={len} id={len}/>, name: "", phoneNum: ""}
          return newDict
        case actions.REMOVE_INPUT:
          var len = Object.keys(state).length
          if (len == 1) return state
          var newDict = {...state}
          delete newDict[len]
          return newDict
        default:
          throw new Error("Undeclared action")
      }
  }, initialState);

  const value = {
    actions: actions,
    inputDict: state,
    dispatch: dispatch
  }
  return <Provider value={value}>{children}</Provider>;
};

function useGroupStore() {
  const context = useContext(inputDict)
  if (context == undefined)
    throw new Error("useGroupStore must be used within a GroupStoreProvider")

    return context
}

export { useGroupStore, GroupStoreProvider }