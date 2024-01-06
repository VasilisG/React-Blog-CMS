import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pager = ({pages, curPage, callback, change}) => {

    const [currentPage, setCurrentPage] = useState(curPage);

    const setNewCurrentPage = (page) => {
        setCurrentPage(page);
        callback(page);
    }

    const goToNextPage = () => {
        if(currentPage < pages){
            setNewCurrentPage(currentPage+1);
        }
    }

    const goToPrevPage = () => {
        if(currentPage > 1){
            setNewCurrentPage(currentPage-1);
        }
    }

    const goToFirstPage = () => {
        setNewCurrentPage(1);
    }

    const goToLastPage = () => {
        setNewCurrentPage(pages);
    }

    const isInRange = (value) => {
        return value > 1 && value < pages;
    }

    const handleChange = (event) => {
        let val = parseInt(event.target.value);
        if(!isNaN(val) && isInRange(val)){
            setNewCurrentPage(val);
        }
    }

    return (
        <div className="pager-container">
            <div className="pager">
                <form className="pager-form d-flex justify-content-end align-items-center">
                    <span className="pager-nav pager-go-first mx-2" onClick={goToFirstPage}>
                        <FontAwesomeIcon icon={faChevronLeft} className="pager-go-icon pager-go-first-icon" color="#194282"/>
                        <FontAwesomeIcon icon={faChevronLeft} className="pager-go-icon pager-go-first-icon" color="#194282"/>
                    </span>
                    <span className="pager-nav pager-go-prev mx-2" onClick={goToPrevPage}>
                        <FontAwesomeIcon icon={faChevronLeft} className="pager-go-icon pager-go-first-icon" color="#194282"/>
                    </span>
                    <div className="pager-current-page-container mx-2">
                        <input className="pager-inpage mx-2" type="text" value={currentPage} onChange={handleChange} name="current_post_page"/>
                        of
                        <span className="pager-pages mx-2">{pages}</span>
                    </div>
                    <span className="pager-nav page-go-next mx-2" onClick={goToNextPage}>
                        <FontAwesomeIcon icon={faChevronRight} className="pager-go-icon pager-go-last-icon" color="#194282"/>
                    </span>
                    <span className="pager-nav page-go-last mx-2" onClick={goToLastPage}>
                        <FontAwesomeIcon icon={faChevronRight} className="pager-go-icon pager-go-last-icon" color="#194282"/>
                        <FontAwesomeIcon icon={faChevronRight} className="pager-go-icon pager-go-last-icon" color="#194282"/>
                    </span>
                </form>
            </div>
        </div>
    );
}

export default Pager;