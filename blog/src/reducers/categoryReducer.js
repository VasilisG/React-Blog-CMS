import { CATEGORY_ACTIONS } from "../actions/constants";

const categoryReducer = (state = {items: [], page: 1, actionOccurred: false}, action) => {
  switch(action.type){
    case CATEGORY_ACTIONS.ADD_CATEGORY:
      return state;
    case CATEGORY_ACTIONS.EDIT_CATEGORY:
      return state;
    case CATEGORY_ACTIONS.DELETE_CATEGORY:
      return state;
    case CATEGORY_ACTIONS.VIEW_CATEGORY:
      return state;
    default:
      return state;
  }
}

export default categoryReducer;