import { React, useEffect } from 'react';
import PageWrapper from '../../hoc/PageWrapper';
import CategoryTree from './CategoryTree';
import CategoryDetails from './CategoryDetails';
import { useDispatch } from 'react-redux';
import { fetchCategories, triggerCreateMode, triggerCreateModeRoot } from '../../store';

const Categories = () => {

    const dispatch = useDispatch();

    useEffect(() => {
       getCategoryTree();
    }, []);

    const getCategoryTree = async () => {
        await dispatch(fetchCategories());
    }

    const handleRootClick = async () => {
        await dispatch(triggerCreateModeRoot());
    }

    const handleClick = async () => {
        await dispatch(triggerCreateMode());
    }

    return (
        <div className="categories-page">
            <h1>Categories</h1>
            <hr/>
            <div className="create-link-container px-4 py-4 my-4 d-flex justify-content-end">
                <button 
                    className="create-link create-category-link" 
                    type="button"
                    onClick={handleRootClick}
                >
                    Add Root Category
                </button>
                <button 
                    className="create-link create-category-link" 
                    type="button"
                    onClick={handleClick}
                >
                    Add Category
                </button>
            </div>
            <div className="categories-container d-flex">
                <CategoryTree/>
                <CategoryDetails/>
            </div>
        </div>
    );
}

export default PageWrapper(Categories);