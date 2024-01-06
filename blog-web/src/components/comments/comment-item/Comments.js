import React, { useEffect } from 'react';
import CommentItem from './CommentItem';
import useCommentsContext from '../../../hooks/use-comments-context';
import CommentForm from '../comment-form/CommentForm';
import Loader from '../../loader/Loader';

const Comments = () => {

  const { post, comments, fetchComments, loading } = useCommentsContext();

  useEffect(() => {
    fetchComments(post);
  }, [fetchComments, post]);

  const renderComment = (comment, level) => {
    return comment.children.length ? (
      <React.Fragment key={`${comment._id}-fragment`}>
        <CommentItem key={`${comment._id}-item`} comment={comment}/>
        <ul key={`${comment._id}-list`} className={`comment-list comment-list-level-${level+1}`}>
          {comment.children.map(child => renderComment(child, level+1))}
        </ul>
      </React.Fragment>
    ) : <CommentItem key={`${comment._id}-item`} comment={comment}/>
  }

  const renderComments = () => {
    return comments.data && comments.data.length ? (
      <ul className="comment-list comment-list-level-0">
        {comments.data.map(comment => renderComment(comment, 0))}
      </ul>
    ) : null;
  }

  return !loading ? ( comments ? (
    <div className="post-comments-container">
      <h2>Comments ({comments.count})</h2>
      {renderComments()}
      <div className="add-comment-container">
        <p className="post-comment-info">Post your comment:</p>
        <CommentForm/>
      </div>
    </div>
  ) : null ) : <Loader/>;
}

export default Comments;