import React from 'react';
import { PostsProvider } from '../context/posts';
import MainPosts from '../components/posts/MainPosts';
import HeadTags from '../components/head-tags/HeadTags';

const MainPage = () => {

  return (
    <>
      <PostsProvider type=''>
        <MainPosts/>
      </PostsProvider>
      <HeadTags description="Main Blog"/>
    </>
  );
}

export default MainPage;