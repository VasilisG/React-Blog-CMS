import React from 'react';
import { areDatesEqual, formatDate, formatDatetime } from '../../../utils/dateFormatter';

const PostDate = ({ createdAt, updatedAt }) => {  

  const renderDate = (postClass, prefix, date) => {
    return (
      <div className={`date-info ${postClass}`}>
        {prefix ? <span>{prefix}</span> : null}
        <span>{date}</span>
      </div>
    );
  }

  const renderPostDate = (createdAt, updatedAt) => {
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);
    const equalDates = areDatesEqual(createdDate, updatedDate);
    return equalDates ? (
      renderDate('created-date', '', formatDate(createdDate))
    ) : (
      <>
        {renderDate('created-date', '', formatDate(createdDate))}
        {renderDate('updated-date', 'Updated at: ', formatDatetime(updatedDate))}
      </>
    );
  }

  return (
    <div className="post-date">
      {renderPostDate(createdAt, updatedAt)}
    </div>
  )
}

export default PostDate;