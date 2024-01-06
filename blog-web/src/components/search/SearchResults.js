import React, { useEffect, useRef, useState } from 'react';
import useSearchContext from '../../hooks/use-search-context';
import { Link } from 'react-router-dom';

const SearchResults = () => {

  const [visible, setVisible] = useState(true);

  const searchResultsRef = useRef(null);

  const { posts } = useSearchContext();

  useEffect(() => {
    function hideResults(event) {
      if(
        searchResultsRef.current 
          && !searchResultsRef.current.contains(event.target)
      ) {
          setVisible(false);
      } 
    }
    document.body.addEventListener('click', hideResults);
    return () => { 
      document.body.removeEventListener('click', hideResults) 
    };
  }, []);

  useEffect(() => {
    if(posts.length){
      setVisible(true);
    }
  }, [posts]);

  return posts.length ? (
    <div ref={searchResultsRef} className={`search-results ${visible ? 'results-visible' : ''}`}>
        <ul className="result-list">
          {
            posts.map((post, index) => {
              return (
                <li key={index} className="result-item">
                  <Link to={`post/${post.url}`}>
                    {post.title}
                  </Link>
                </li>
              )
            })
          }
        </ul>
    </div>
  ) : null;
}

export default SearchResults;