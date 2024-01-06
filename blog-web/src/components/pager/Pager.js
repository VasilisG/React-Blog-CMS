import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Page from './Page';
import usePostsContext from '../../hooks/use-posts-context';

const Pager = ({ currentPage, totalPages }) => {

  const { fetchPosts } = usePostsContext();

  const params = useParams();

  const getUrl = () => {
    let url = '';

    if(params['*'] !== undefined) {
      const categoryParams = params['*'].split('/');
      url = categoryParams[categoryParams.length - 1];
    }

    if(params['url'] !== undefined) {
      url = params['url'];
    }

    return url;
  }

  const handleGoToPrev = () => {
    fetchPosts(getUrl(), currentPage - 1);
  }

  const handleGoToNext = () => {
    fetchPosts(getUrl(), currentPage + 1);
  }

  const handleGoToStart = () => {
    fetchPosts(getUrl(), 1);
  }

  const handleGoToEnd = () => {
    fetchPosts(getUrl(), totalPages);
  }

  const renderGoToStart = () => {
    return currentPage > 2 ? (
      <span className="page-item page-nav-item page-start-item" onClick={handleGoToStart}><FontAwesomeIcon icon={faAnglesLeft} /></span>
    ) : null;
  }

  const renderGoToEnd = () => {
    return currentPage <= totalPages - 2 ? (
      <span className="page-item page-nav-item page-end-item" onClick={handleGoToEnd}><FontAwesomeIcon icon={faAnglesRight} /></span>
    ) : null;
  }

  const renderGoToPrev = () => {
    return currentPage > 2 && totalPages > 2 ? (
      <span className="page-item page-nav-item page-prev-item" onClick={handleGoToPrev}><FontAwesomeIcon icon={faChevronLeft} /></span>
    ) : null;
  }

  const renderGoToNext = () => {
    return currentPage < totalPages - 1 ? (
      <span className="page-item page-nav-item page-next-item" onClick={handleGoToNext}><FontAwesomeIcon icon={faChevronRight} /></span>
    ) : null;
  }

  const renderPreviousPages = () => {
    if(currentPage > 3) {
      return (
        <>
          <Page pageNumber={1}/>
          {currentPage > 4 ? <span>...</span> : null}
          <Page pageNumber={currentPage - 2}/>
          <Page pageNumber={currentPage - 1}/>
        </>
      )
    }
    else if(currentPage === 3) {
      return (
        <>
          <Page pageNumber={1}/>
          <Page pageNumber={2}/>
        </>
      );
    }
    else return totalPages !== 1 && currentPage !== 1 ? (
      <>
        <Page pageNumber={1}/>
      </>
    ) : null;
  }

  const renderNextPages = () => {
    if(currentPage <= totalPages - 3) {
      return (
        <>
          <Page pageNumber={currentPage + 1}/>
          <Page pageNumber={currentPage + 2}/>
          {currentPage < totalPages - 3 ? <span>...</span> : null}
          <Page pageNumber={totalPages}/>
        </>
      );
    }
    else if(currentPage === totalPages - 2) {
      return (
        <>
          <Page pageNumber={currentPage + 1}/>
          <Page pageNumber={currentPage + 2}/>
        </>
      );
    }
    else return currentPage !== totalPages ? (
      <>
        <Page pageNumber={totalPages}/>
      </>
    ) : null;
  }

  const renderPages = () => {
    return (
      <>
        {renderPreviousPages()}
        <Page pageNumber={currentPage} isActive={true}/>
        {renderNextPages()}
      </>
    )
  }

  return totalPages > 1 ? (
    <div className="pagination-container">
      {renderGoToStart()}
      {renderGoToPrev()}
      {renderPages()}
      {renderGoToNext()}
      {renderGoToEnd()}
    </div>
  ) : null;

};

export default Pager;