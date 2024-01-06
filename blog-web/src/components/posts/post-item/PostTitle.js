import React from 'react';

const PostTitle = ({ type, title }) => {

  return type === 'view'
   ? <h1 className="post-title">{title}</h1>
   : <p className="post-item-title">{title}</p>
}

export default PostTitle;