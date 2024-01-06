import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments } from '../../store';
import Table from '../table/Table';
import Pager from '../pager/Pager';
import Limiter from '../pager/Limiter';
import FiltersContainer from './FiltersContainer';
import { COMMENT_TABLE_COLUMNS } from '../table/Constants';
import PageWrapper from '../../hoc/PageWrapper';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const CommentList = ({data, total, totalPages, pageSize, currentPage, filters, sortField, sortOrder}) => {

    const [page, setPage] = useState(currentPage);
    const [pageLimit, setPageLimit] = useState(pageSize);
    const [currentFilters, setCurrentFilters] = useState(filters);
    const [sortStatus, setSortStatus] = useState({sortField, sortOrder});

    const { isLoading } = useSelector((state) => {
        return state.comments;
    });

    const dispatch = useDispatch();

    const getComments = async () => {
       await dispatch(fetchComments({
            currentPage: page, 
            filters: currentFilters,
            limit: pageLimit, 
            ...sortStatus
        }));
    }

    useEffect(() => {
        getComments();
    }, [page, pageLimit, currentFilters, sortStatus]);

    return (
        <div className="comments-wrapper list-wrapper">
            <FiltersContainer
                callback={setCurrentFilters}
            />
            <Table 
                tableColumns={COMMENT_TABLE_COLUMNS} 
                tableData={data}
                sortStatus={sortStatus}
                callback={setSortStatus}
                entity="comments"
            />
            <hr/>
            <div className="d-flex justify-content-between">
                <Limiter
                    value={pageLimit}
                    total={total}
                    callback={setPageLimit}
                />
                <Pager 
                    pages={totalPages} 
                    curPage={page}
                    callback={setPage}
                />
            </div>
            { isLoading ? <LoadingSpinner/> : null }
        </div>
    );
}

export default PageWrapper(CommentList);

/**
 * Id [OK] [Text]
 * Title [OK] [Text]
 * Content
 * Url
 * Date created [OK] [Date]
 * Date updated 
 * Categories [Text / Dropdown / Multiselect]
 * Tags [Text / Dropdown / Multiselect]
 * Thumbnail
 * Status [OK] [Yes / No]
 * Meta title
 * Meta description
 */