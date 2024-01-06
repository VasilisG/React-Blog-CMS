import React from 'react';
import { useSelector } from 'react-redux';
import PageWrapper from '../../hoc/PageWrapper';
import TagList from './TagList';

const Tags = () => {

    const {data, total, totalPages, pageSize, currentPage, filters, sortField, sortOrder} = useSelector((state) => {
        return state.tags;
    });

    return (
        <div className="tags-page">
            <h1>Tags</h1>
            <hr/>
            <TagList
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

export default PageWrapper(Tags);