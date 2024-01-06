import React from 'react';
import parse from 'html-react-parser';

const PostContent = ({ content }) => {
  return (
    <div className="post-content">
      {parse(content)}
    </div>
  );
}

export default PostContent;