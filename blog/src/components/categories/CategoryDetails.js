import React from "react";
// import { useSelector } from "react-redux";
import CategoryForm  from './CategoryForm';

const CategoryDetails = () => {

  // const { currentCategory, mode } = useSelector((state) => {
  //   return state.categories;
  // });

  // return !(currentCategory === null && mode === 'create') ? <CategoryForm/> : (
  //   <div className="category-details no-category-selected col-md-9 px-4">
  //     <p>
  //       No category selected. <strong>Click</strong> on a category to view it's details or 
  //       click the &nbsp;<strong className="add-category-prompt">Add Category</strong>&nbsp;
  //       button to add a new category.
  //     </p>
  //     <p>The category will be added as a child of the <strong>last category</strong> selected.</p>
  //     <p>If no category is selected, the newly created category will be a top category.</p>
  //   </div>
  // );

  return <CategoryForm/>
};

export default CategoryDetails;
