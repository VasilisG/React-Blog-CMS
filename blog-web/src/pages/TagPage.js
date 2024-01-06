import React from 'react';
import { PostsProvider } from '../context/posts';
import Tag from '../components/tag/Tag';

const TagPage = () => {

  return (
    <PostsProvider type='tag'>
      <Tag/>
    </PostsProvider>
  );
}

export default TagPage;