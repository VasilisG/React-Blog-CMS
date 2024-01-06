import { COMMENT_ACTIONS } from "./constants"

const editComment = (comment) => {
  return {
    type: COMMENT_ACTIONS.EDIT_COMMENT,
    payload: comment
  }
}

const deleteComment = (commentId) => {
  return {
    type: COMMENT_ACTIONS.DELETE_COMMENT,
    payload: commentId
  }
}

const fetchComments = (page) => {
  return {
    type: COMMENT_ACTIONS.FETCH_COMMENTS,
    payload: page
  }
}

const filterComments = (filters) => {
  return {
    type: COMMENT_ACTIONS.FILTER_COMMENTS,
    payload: filters
  }
}

const commentExports = {
  editComment,
  deleteComment,
  fetchComments,
  filterComments
}

export default commentExports;