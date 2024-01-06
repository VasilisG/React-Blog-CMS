import React from 'react';
import { Link } from 'react-router-dom';
import HeadTags from '../components/head-tags/HeadTags';

const PageNotFound = () => {
  return (
    <>
      <div className="page-not-found">
        <p>Page not found. Click <Link to="/">here</Link> to go back to main page.</p>
      </div>
      <HeadTags description="Page not found."/>
    </>

  )
}

export default PageNotFound;