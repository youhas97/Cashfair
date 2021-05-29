import React, { useContext, createContext, useReducer } from 'react';
import GroupCreationFormInput from "../components/groups/GroupCreationFormInput"

const initialState = {
  name: "",
  members: {
    0: {component: <GroupCreationFormInput key={0} id={0} />, name: "", phoneNum: ""},
    1: {component: <GroupCreationFormInput key={1} id={1} />, name: "", phoneNum: ""},
    2: {component: <GroupCreationFormInput key={2} id={2} />, name: "", phoneNum: ""},
    3: {component: <GroupCreationFormInput key={3} id={3} />, name: "", phoneNum: ""}
  }
}

const actions = {
  SET_INPUT_DICT: "SET_INPUT_DICT",
  ADD_INPUT: "ADD_INPUT",
  REMOVE_INPUT: "REMOVE_INPUT",
  SET_GROUP_NAME: "SET_GROUP_NAME"
}

const groupData = createContext(initialState)
const { Provider } = groupData

function GroupStoreProvider( { children } ) {
  const [state, dispatch] = useReducer((state, action) => {
      var members = {...state.members}
      var len = undefined
      switch(action.type) {
        case actions.SET_INPUT_DICT:
          members[action.value.id].name = action.value.name
          members[action.value.id].phoneNum = action.value.phoneNum
          return {...state, members: members}
        case actions.ADD_INPUT:
          len = Object.keys(members).length
          members[len] = {component: <GroupCreationFormInput key={len} id={len}/>, name: "", phoneNum: ""}
          return {...state, members: members}
        case actions.REMOVE_INPUT:
          len = Object.keys(state.members).length
          if (len <= 2) return state
          delete members[len-1]
          return {...state, members: members}
        case actions.SET_GROUP_NAME:
          return {...state, name: action.value}
        default:
          throw new Error("Undeclared action")
      }
  }, initialState);

  const value = {
    actions: actions,
    groupData: state,
    dispatch: dispatch
  }
  return <Provider value={value}>{children}</Provider>;
};

function useGroupStore() {
  const context = useContext(groupData)
  if (context === undefined)
    throw new Error("useGroupStore must be used within a GroupStoreProvider")

    return context
}

export { useGroupStore, GroupStoreProvider }