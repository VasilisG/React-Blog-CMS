import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';

const PostComments = ({ post }) => {
  return post.comments ? (
    <div className="post-item-comments">
      <span className="total-comments-icon"><FontAwesomeIcon icon={faComment}/></span>
      <span className="total-comments">{`(${post.comments.length})`}</span>
    </div>
  ) : null;
}

export default PostComments;