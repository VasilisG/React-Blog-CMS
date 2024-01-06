import React, { useState } from 'react';
import { formatDatetime } from '../../../utils/dateFormatter';
import CommentForm from '../comment-form/CommentForm';

const CommentItem = ({ comment }) => {

  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(!showForm);
  }

  return (
    <li className="comment-list" key={comment._id}>
      <div className="comment-container">
        <span className="comment-date">{formatDatetime(comment.date_created)}</span>
        <p className="comment-info">{comment.content}</p>
      </div>
      <button 
        className={`comment-action-button ${showForm ? 'cancel-action' : ''}`} 
        type="button" 
        onClick={() => handleClick()}
      >
          {showForm ? 'Cancel' : 'Reply'}
      </button>
      {showForm ? <CommentForm comment={comment} submitCallback={setShowForm}/> : null}
    </li>
  );
}

export default CommentItem;