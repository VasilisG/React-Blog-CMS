import React from 'react';
import { Link } from 'react-router-dom';

const PostTags = ({ post, type }) => {

  const renderTags = () => {
    return type === 'view' ? (
      <div className="post-tags-container">
        <span className="post-tags-info">Tags</span>
        <div className="post-tags">
          {post.tags.map(tag => <Link key={`${post._id}${tag._id}`} to={`/tag/${tag.url}`} className="post-tag">{tag.name}</Link>)}
        </div>
      </div>
    ) : (
      <div className="post-tags">
        {post.tags.map(tag => <Link key={`${post._id}${tag._id}`} to={`/tag/${tag.url}`} className="post-tag">{tag.name}</Link>)}
      </div>
    );
  }
  return post.tags.length ? <>{renderTags()}</> : null;
}

export default PostTags;