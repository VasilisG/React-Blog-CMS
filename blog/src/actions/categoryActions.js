import { CATEGORY_ACTIONS } from "./constants"

const addCategory = (category) => {
  return {
    type: CATEGORY_ACTIONS.ADD_CATEGORY,
    payload: category
  }
}

const editCategory = (category) => {
  return {
    type: CATEGORY_ACTIONS.EDIT_CATEGORY,
    payload: category
  }
}

const deleteCategory = (categoryId) => {
  return {
    type: CATEGORY_ACTIONS.DELETE_CATEGORY,
    payload: categoryId
  }
}

const viewCategory = (categoryId) => {
  return {
    type: CATEGORY_ACTIONS.VIEW_CATEGORY,
    payload: categoryId
  }
}

const categoryExports = {
  addCategory,
  editCategory,
  deleteCategory,
  viewCategory
};

export default categoryExports;