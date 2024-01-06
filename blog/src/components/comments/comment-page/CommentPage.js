import React from "react";
import CommentForm from "./CommentForm";

const CommentPage = () => {
  return (
    <div className="comment-page">
      <h1>Comment Page</h1>
      <hr />
      <div className="comment-container container">
        <CommentForm />
      </div>
    </div>
  );
};

export default CommentPage;
