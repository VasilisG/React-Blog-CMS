import { TAG_ACTIONS } from "./constants"

const createTag = (tag) => {
  return {
    type: TAG_ACTIONS.CREATE_TAG,
    payload: tag
  }
}

const editTag = (tag) => {
  return {
    type: TAG_ACTIONS.EDIT_TAG,
    payload: tag
  }
}

const deleteTag = (tagId) => {
  return {
    type: TAG_ACTIONS.DELETE_TAG,
    payload: tagId
  }
}

const fetchTags = (page) => {
  return {
    type: TAG_ACTIONS.FETCH_TAGS,
    payload: page
  }
}

const filterTags = (filters) => {
  return {
    type: TAG_ACTIONS.FILTER_TAG,
    payload: filters
  }
}

const tagExports = {
  createTag,
  editTag,
  deleteTag,
  fetchTags,
  filterTags
}

export default tagExports;