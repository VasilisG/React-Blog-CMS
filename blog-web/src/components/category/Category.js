import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Pager from '../pager/Pager';
import PostList from '../posts/post-list/PostList';
import usePostsContext from '../../hooks/use-posts-context';
import { getCategoryByUrl, getCategoryPath } from '../../api/categories';
import CategoryInfo from './CategoryInfo';
import HeadTags from '../head-tags/HeadTags';
import Breadcrumbs from '../breadcrumbs/Breadcrumbs';

const Category = () => {

  const params = useParams();

  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState({});

  const [categoryPath, setCategoryPath] = useState([]);

  const { posts, fetchPosts, currentPage, totalPages, loading } = usePostsContext();

  useEffect(() => {
    const categoryParams = params['*'].split('/');
    const categoryUrl = categoryParams[categoryParams.length - 1];
    const page = searchParams.get('p') !== null ? searchParams.get('p') : 1;
    fetchPosts(categoryUrl, page);

    getCategoryByUrl(categoryUrl)
    .then(categoryData => {
      setCategory(categoryData);
    })
    .catch(error => {
      console.log(error);
    });

    getCategoryPath(categoryUrl)
    .then(categoryData => {
      setCategoryPath(categoryData);
    })
    .catch(error => {
      console.log(error);
    });

  }, [fetchPosts, params, searchParams]);

  return category ? (
    <>
      <Breadcrumbs crumbs={categoryPath} prefix="category"/>
      <CategoryInfo category={category}/>
      <PostList posts={posts} loading={loading} type="main"/>
      <Pager currentPage={currentPage} totalPages={totalPages}/>
      <HeadTags description={category.title}/>
    </>
  ) : null;
}

export default Category;