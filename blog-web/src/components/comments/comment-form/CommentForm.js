import React, { useState } from 'react';
import useCommentsContext from '../../../hooks/use-comments-context';

const CommentForm = ({ comment, submitCallback }) => {

  const { addComment } = useCommentsContext();

  const [content, setContent] = useState('');

  const handleChange = (event) => {
    setContent(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(submitCallback) submitCallback(false);
    addComment(content, comment ? comment._id : null);
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea name="comment" required className="comment-area" onChange={handleChange}></textarea>
      <button className="submit-button" type="submit">Post comment</button>
    </form>
  )
}

export default CommentForm;