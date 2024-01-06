import { USER_ACTIONS } from "../actions/constants";

const userReducer = (state = {loggedIn: false, actionOccured: false}, action) => {
  switch(action.type){
    case USER_ACTIONS.LOGIN:
      return state;
    case USER_ACTIONS.LOGOUT:
      return state;
    default:
      return state;
  }
}

export default userReducer;