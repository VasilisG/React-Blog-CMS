import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BooleanField from "../fields/form/BooleanField";
import TextField from "../fields/form/TextField";
import TextAreaField from "../fields/form/TextAreaField";
import ImageField from "../fields/form/ImageField";
import { INITIAL_CATEGORY_STATE } from './Constants';
import { capitalize } from '../../utils/capitalize';
import { switchSlashes } from '../../utils/switchSlashes';
import { createCategory, updateCategory, deleteCategory, fetchCategories } from '../../store';
import { BASE_DIR } from '../../config/env';

const CategoryForm = () => {

  const { currentCategory, mode } = useSelector((state) => {
    return state.categories;
  });

  const dispatch = useDispatch();

  const [categoryData, setCategoryData] = useState(INITIAL_CATEGORY_STATE);

  const submitButtonValue = mode === 'create' ? 'save' : 'update';
  const submitButtonLabel = capitalize(submitButtonValue);

  const deleteButtonValue = mode === 'create' ? 'cancel' : 'delete';
  const deleteButtonLabel = capitalize(deleteButtonValue);

  const addCategory = async () => {
    const parent = currentCategory !== null ? currentCategory._id : '';
    await dispatch(createCategory({
      ...categoryData,
      parent
    }));

    await dispatch(fetchCategories());
  }

  const putCategory = async () => {
    await dispatch(updateCategory({
      categoryId: currentCategory._id,
      categoryData,
    }));
  }

  const removeCategory = async () => {
    const result = await dispatch(deleteCategory({
      categoryId: currentCategory._id
    }));

    if (result.type === 'categories/delete/fulfilled') {
      await dispatch(fetchCategories());
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const eventType = event.nativeEvent.submitter.name;
    if(mode === 'create'){
      if(eventType === 'save') addCategory();
    }
    else {
      if(eventType === 'update') putCategory();
      else removeCategory();
    }
  };

  const handleChange = (key) => event => {

    switch(key){
      
      case 'image':
        setCategoryData({
          ...categoryData,
          [key]: event.target.files ? event.target.files[0] : null
        });
        break;
      
      case 'enabled':
        setCategoryData({ 
          ...categoryData, 
          [key]: event.target.checked
        });
        break;

      default:
        setCategoryData({ 
          ...categoryData, 
          [key]: event.target.value 
        });
        break;
    }
  }

  const getImageValue = () => {
    if(mode === 'create'){
      return categoryData.image;
    }
    else return categoryData.image && typeof categoryData.image != 'object' 
                ? switchSlashes(BASE_DIR + categoryData.image) 
                : '';
  }

  useEffect(() => {
    if(mode === 'create'){
      setCategoryData(INITIAL_CATEGORY_STATE);
    }
    else {
      if(currentCategory !== undefined && currentCategory !== null){
        const {
          name,
          description,
          url,
          image,
          enabled
        } = currentCategory;
        setCategoryData({name, description, url, image, enabled});
      }
    }
  }, [mode, currentCategory]);

  // useEffect(() => {
  //   console.log(categoryData);
  // }, [categoryData]);

  return (
    <div className="category-details col-md-9 px-4">
      <div className="category-details-name-wrapper">
        <h1 className="category-name">{categoryData.name}</h1>
      </div>
      <hr />
      <form 
        className="post-category-form" 
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <BooleanField 
          name="enabled"
          label="Enabled"
          id="enabled"
          value={categoryData.enabled}
          changeCallback={handleChange('enabled')}
        />
        <TextField 
          name="name"
          label="Name"
          id="name"
          required="required"
          smallText="Name of category."
          value={categoryData.name}
          changeCallback={handleChange('name')}
        />
        <TextAreaField 
          name="description"
          label="Description"
          id="description"
          smallText="Category description which will appear at the top of the page."
          value={categoryData.description}
          changeCallback={handleChange('description')}
        />
        <TextField 
          name="url"
          label="URL key"
          id="url"
          required="required"
          smallText="Category URL for the site."
          value={categoryData.url}
          changeCallback={handleChange('url')}
        />
        <ImageField 
          name="image"
          label="Image"
          id="image"
          smallText="Category image."
          imageValue={getImageValue()}
          changeCallback={handleChange('image')}
        />
        <div className="form-group d-flex justify-content-end my-4">
          <button
            type="submit"
            className="btn category-action delete-category mx-2"
            value={deleteButtonValue}
            name={deleteButtonValue}
          >
            {deleteButtonLabel}
          </button>
          <button
            type="submit"
            className="btn category-action update-category mx-2"
            value={submitButtonValue}
            name={submitButtonValue}
          >
            {submitButtonLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;