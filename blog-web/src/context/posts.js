import { createContext, useState, useCallback } from 'react';
import { getPosts } from '../api/posts';

const PostsContext = createContext();

function PostsProvider({ children, type }) {

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback((url, page) => {
    setLoading(true);
    getPosts(type, url, page)
    .then(result => {
      setPosts(result.data);
      setCurrentPage(result.pagination.page);
      setTotalPages(result.pagination.totalPages);
    })
    .catch(error => {
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [type]);

  const providerValues = {
    posts,
    type,
    fetchPosts,
    currentPage,
    totalPages,
    loading,
    error
  };

  return (
    <PostsContext.Provider value={providerValues}>
      {children}
    </PostsContext.Provider>
  );

}

export { PostsProvider };
export default PostsContext;