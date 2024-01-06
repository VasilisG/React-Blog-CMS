import React from 'react';
import { BASE_MEDIA_URL } from '../../config/env';

const CategoryInfo = ({ category }) => {

  return category ? (
    <div className="category-info">
      <h1 className="category-name">
        {category.name}
      </h1>
      {category.image ? <img className="category-image" src={`${BASE_MEDIA_URL}${category.image}`} alt={category.name}/> : null}
      <p className="category-description">
        {category.description}
      </p>
    </div>
  ) : null;

}

export default CategoryInfo;