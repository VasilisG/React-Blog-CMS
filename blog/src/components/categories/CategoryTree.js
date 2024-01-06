import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryItem from './CategoryItem';
import { getCategory } from '../../store';

const CategoryTree = () => {

    const dispatch = useDispatch();

    const { data } = useSelector((state) => {
        return state.categories;
    });

    const getCategoryById = async (id) => {
        await dispatch(getCategory({id}));
    }

    return (
        <div className="category-tree col-md-3">
            <ul className="category-items">
                {data.map(category => {
                    return <CategoryItem 
                                key={category._id} 
                                id={category._id} 
                                name={category.name} 
                                children={category.children}
                                callback={getCategoryById}
                            ></CategoryItem>
                })}
            </ul>
        </div>
    );
}

export default CategoryTree;