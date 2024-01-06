import { createContext, useState, useCallback } from 'react';
import { getComments, postComment } from '../api/comments';
import { postNotification } from '../api/notifications';

const CommentsContext = createContext();

function CommentProvider({ children, post }) {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addNotification = useCallback((message) => {
    postNotification(message)
    .catch((error) => {
      setError(error);
    });
  }, []);

  const fetchComments = useCallback((post) => {
    setLoading(true);
    getComments(post._id)
      .then((commentData) => {
        setComments(commentData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const addComment = useCallback((content, parent) => {
    postComment({
      content,
      parent,
      postId: post._id
    })
    .then(() => {
      addNotification(`Someone posted a comment in article "${post.title}".`);
      fetchComments(post);
    });
  }, [fetchComments, addNotification, post]);

  const providerValues = {
    post,
    comments,
    loading,
    error,
    fetchComments,
    addComment
  }

  return (
    <CommentsContext.Provider value={providerValues}>
      {children}
    </CommentsContext.Provider>
  );

}

export { CommentProvider };
export default CommentsContext;