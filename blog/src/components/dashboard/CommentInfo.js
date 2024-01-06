import React from 'react';

const CommentInfo = ({commentClass, title, total}) => {
    return (
        <div className={`${commentClass} comments-row row`}>
            <span className="comments-label col">{title}</span>
            <span className="comments-value col text-center fw-bold">{total}</span>
        </div>
    )
}

export default CommentInfo;