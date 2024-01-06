import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';
import commentReducer from './commentReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';
import tagReducer from './tagReducer';

export default combineReducers({
  post: postReducer,
  category: categoryReducer,
  comment: commentReducer,
  tag: tagReducer,
  user: userReducer
});