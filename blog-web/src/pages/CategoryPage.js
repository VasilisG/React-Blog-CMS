import React from 'react';
import { PostsProvider } from '../context/posts';
import Category from '../components/category/Category';

const CategoryPage = () => {

  return (
    <PostsProvider type='category'>
      <Category/>
    </PostsProvider>
  );
}

export default CategoryPage;