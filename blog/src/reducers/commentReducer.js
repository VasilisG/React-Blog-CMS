import { COMMENT_ACTIONS } from "../actions/constants";
import testCommentData from '../test-data/comment-data.json';
import { PAGE_SIZE } from "../components/pager/Constants";

const commentReducer = (state = {items: [], page: 1, actionOccurred: false}, action) => {
  switch(action.type){
    case COMMENT_ACTIONS.EDIT_COMMENT:
      return state;
    case COMMENT_ACTIONS.DELETE_COMMENT:
      return state;
    case COMMENT_ACTIONS.FETCH_COMMENTS:
      return {
        ...state,
        page: action.payload,
        items: testCommentData.slice((action.payload - 1) * PAGE_SIZE, (action.payload - 1) * PAGE_SIZE + PAGE_SIZE)
      }
    case COMMENT_ACTIONS.FILTER_COMMENTS:
      return state;
    default:
      return state;
  }
}

export default commentReducer;