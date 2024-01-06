import React from 'react';
import PostItem from '../post-item/PostItem';
import Loader from '../../loader/Loader';
import NoPosts from './NoPosts';

const PostList = ({ posts, loading, type }) => {
  return !loading ? ( posts && posts.length ? (
    <section className="blog-section section">
      <ul className="post-list">
        {posts.map(post => <PostItem post={post} key={post._id} tagsInImage={type === 'main'}/>)}
      </ul>
    </section>
  ) : <NoPosts/> ) : <Loader/>;
}

export default PostList;