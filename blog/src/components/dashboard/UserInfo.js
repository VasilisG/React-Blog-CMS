import React from 'react';

const UserInfo = ({title, value}) => {
    return (
        <div className="comments-row row">
            <span className="comments-label col">{title}</span>
            <span className="comments-value col text-center fw-bold">{value}</span>
        </div>
    )
}

export default UserInfo;