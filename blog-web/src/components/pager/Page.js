import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import usePostsContext from '../../hooks/use-posts-context';

const Page = ({ pageNumber, isActive }) => {

  const { fetchPosts } = usePostsContext();

  const params = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (event) => {

    let url = '';

    if(params['*'] !== undefined) {
      const categoryParams = params['*'].split('/');
      url = categoryParams[categoryParams.length - 1];
    }

    if(params['url'] !== undefined) {
      url = params['url'];
    }

    fetchPosts(url, pageNumber);

    if(url !== '') {
      setSearchParams((params) => {
        if(pageNumber > 1){
          params.set('p', pageNumber)
        }
        else params.delete('p');
        return params;
      });
    }
  }

  return (
    <span 
      className={`page-item ${isActive ? 'active-page-item' : ''}`} 
      onClick={handleClick}>
        {pageNumber}
    </span>
  );
}

export default Page;