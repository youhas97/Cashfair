const initState = {
  text: ""
}

const navButtonReducer = (state = initState, action) => {
  switch(action.type) {
    case 'DROPDOWN':
      return {... state, dropdown: !state.dropdown}
    default:
      return state;
  }
}

export default navButtonReducer