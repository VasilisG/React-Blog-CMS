import React from "react";
import TagForm from "./TagForm";

const TagPage = () => {
  return (
    <div className="tag-page">
      <h1>Tag Page</h1>
      <hr />
      <div className="tag-container container">
        <TagForm />
      </div>
    </div>
  );
};

export default TagPage;
