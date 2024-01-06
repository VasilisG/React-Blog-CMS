import React, { useEffect } from 'react';
import usePostsContext from '../../hooks/use-posts-context';
import PostList from './post-list/PostList';
import Pager from '../pager/Pager';

const MainPosts = () => {

  const { posts, fetchPosts, currentPage, totalPages, loading } = usePostsContext();

  useEffect(() => {
    fetchPosts('', currentPage);
  }, [fetchPosts]);

  return (
    <>
      <PostList posts={posts} loading={loading} type="main"/>
      <Pager currentPage={currentPage} totalPages={totalPages}/>
    </>
  );

}

export default MainPosts;