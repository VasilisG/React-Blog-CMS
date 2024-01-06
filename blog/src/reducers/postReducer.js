import { POST_ACTIONS } from "../actions/constants";
import testPostData from '../test-data/post-data.json';
import { PAGE_SIZE } from "../components/pager/Constants";

const postReducer = (state = {items: [], page: 1, actionOccurred: false}, action) => {
  switch(action.type){
    case POST_ACTIONS.ADD_POST:
      return state;
    case POST_ACTIONS.EDIT_POST:
      return state;
    case POST_ACTIONS.DELETE_POST:
      return state;
    case POST_ACTIONS.FETCH_POSTS:
      return {
        ...state,
        page: action.payload,
        items: testPostData.slice((action.payload - 1) * PAGE_SIZE, (action.payload - 1) * PAGE_SIZE + PAGE_SIZE)
      }
    case POST_ACTIONS.FILTER_POSTS:
      return state;
    default:
      return state;
  }
}

export default postReducer;