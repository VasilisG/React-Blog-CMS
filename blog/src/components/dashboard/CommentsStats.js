import React, { useState, useCallback, useEffect } from 'react';
import CommentInfo from './CommentInfo';
import SectionHeader from './SectionHeader';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/api';

const CommentsStats = () => {

    const [commentStats, setCommentStats] = useState({
        total_comments: 0,
        average_comments: 0,
        latest_comments: 0
    });

    const fetchCommentStats = useCallback(async () => {
        const response = await API.get(`stats/comments`);
        const results = response.data;
        setCommentStats(results.data);
    }, []);

    useEffect(() => {
        fetchCommentStats();
    }, [fetchCommentStats]);

    return (
        <div className="dashboard-col">
            <div className="card comment-stats-container shadow">
                <SectionHeader title="Comment Stats" icon={faComments}/>
                <div className="card-body comment-stats">
                    <CommentInfo commentClass="total-comments" title="Total comments" total={commentStats.total_comments}/>
                    <CommentInfo commentClass="avg-comments" title="Comments per post" total={commentStats.average_comments}/>
                    <CommentInfo commentClass="new-comments" title="New comments (last 24 hours)" total={commentStats.latest_comments}/>
                </div>
            </div>
        </div>
    )
}

export default CommentsStats;