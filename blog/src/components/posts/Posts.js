import { useSelector } from 'react-redux';
import PostList from './PostList';

const Posts = () => {

    const {data, total, totalPages, pageSize, currentPage, filters, sortField, sortOrder} = useSelector((state) => {
        return state.posts;
    });

    return (
        <div className="posts-page">
            <h1>Posts</h1>
            <hr/>
            <PostList
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

export default Posts;