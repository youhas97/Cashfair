const initState = {
  text: ""
}

const testReducer = (state = initState, action) => {
  switch(action.type) {
    case 'Settings':
      return {... state, text: 'Get fucked'}
    default:
      return state;
  }
}

export default testReducer