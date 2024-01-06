import { createContext, useState, useCallback } from 'react';
import { searchPosts } from '../api/posts';

const SearchContext = createContext();

function SearchProvider({ children }) {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchPostsByTitle = useCallback((title) => {
    setLoading(true);
    searchPosts(title)
    .then(result => {
      setPosts(result.data);
    })
    .catch(error => {
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  const providerValues = {
    searchPostsByTitle,
    posts,
    loading,
    error
  };

  return (
    <SearchContext.Provider value={providerValues}>
      {children}
    </SearchContext.Provider>
  );

}

export { SearchProvider };
export default SearchContext;