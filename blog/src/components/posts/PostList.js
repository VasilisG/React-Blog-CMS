import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store';
import Table from '../table/Table';
import Pager from '../pager/Pager';
import Limiter from '../pager/Limiter';
import FiltersContainer from './FiltersContainer';
import { POST_TABLE_COLUMNS } from '../table/Constants';
import PageWrapper from '../../hoc/PageWrapper';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const PostList = ({data, total, totalPages, pageSize, currentPage, filters, sortField, sortOrder}) => {

    const [page, setPage] = useState(currentPage);
    const [pageLimit, setPageLimit] = useState(pageSize);
    const [currentFilters, setCurrentFilters] = useState(filters);
    const [sortStatus, setSortStatus] = useState({sortField, sortOrder});

    const { isLoading } = useSelector((state) => {
        return state.posts;
    });

    const dispatch = useDispatch();

    const getPosts = async () => {
       await dispatch(fetchPosts({
            currentPage: page, 
            filters: currentFilters,
            limit: pageLimit, 
            ...sortStatus
        }));
    }

    useEffect(() => {
        getPosts();
    }, [page, pageLimit, currentFilters, sortStatus]);

    return (
        <div className="posts-wrapper list-wrapper">
            <FiltersContainer
                callback={setCurrentFilters}
            />
            <Table 
                tableColumns={POST_TABLE_COLUMNS} 
                tableData={data}
                sortStatus={sortStatus}
                callback={setSortStatus}
                entity="posts"
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

export default PageWrapper(PostList);

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