import React from 'react';

const TagInfo = ({ tag }) => {

  return tag ? (
    <div className="tag-info">
      <h1 className="tag-name">
        <span className="tag-prefix">Tag</span>"{tag.name}"
      </h1>
    </div>
  ) : null;
}

export default TagInfo;