import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const PostViews = ({ post }) => {

  return post.views !== undefined ? (
    <div className="post-item-views">
      <span className="views-icon"><FontAwesomeIcon icon={faEye}/></span>
      <span className="views">{post.views}</span>
    </div>
  ) : null;

}

export default PostViews;