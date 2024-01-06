import React from "react";
import PostForm from "./PostForm";

const PostPage = ({ id }) => {
  return (
    <div className="post-page">
      <h1>Post Page</h1>
      <hr />
      <div className="post-container container">
        <PostForm />
      </div>
    </div>
  );
};

export default PostPage;
