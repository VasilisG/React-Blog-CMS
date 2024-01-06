import React from 'react';
import { useSelector } from 'react-redux';
import CommentList from './CommentList';
import PageWrapper from '../../hoc/PageWrapper';

const Comments = () => {

    const {data, total, totalPages, pageSize, currentPage, filters, sortField, sortOrder} = useSelector((state) => {
        return state.comments;
    });

    return (
        <div className="comments-page">
            <h1>Comments</h1>
            <hr/>
            <CommentList
                data={data}
                total={total}
                totalPages={totalPages}
                pageSize={pageSize}
                currentPage={currentPage}
                filters={filters}
                sortField={sortField}
                sortOrder={sortOrder}
            />
        </div>
    )
}

export default PageWrapper(Comments);