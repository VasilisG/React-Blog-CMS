import { TAG_ACTIONS } from "../actions/constants";
import testTagData from '../test-data/tag-data.json';
import { PAGE_SIZE } from "../components/pager/Constants";

const tagReducer = (state = {items: [], page: 1, actionOccurred: false}, action) => {
  switch(action.type){
    case TAG_ACTIONS.EDIT_TAG:
      return state;
    case TAG_ACTIONS.DELETE_TAG:
      return state;
    case TAG_ACTIONS.FETCH_TAGS:
      return {
        ...state,
        page: action.payload,
        items: testTagData.slice((action.payload - 1) * PAGE_SIZE, (action.payload - 1) * PAGE_SIZE + PAGE_SIZE)
      }
    case TAG_ACTIONS.FILTER_TAGS:
      return state;
    default:
      return state;
  }
}

export default tagReducer;