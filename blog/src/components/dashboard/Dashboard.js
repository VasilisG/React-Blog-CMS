import React from 'react';
import PageWrapper from '../../hoc/PageWrapper';
import MostViewedPosts from './MostViewedPosts';
import CommentsStats from './CommentsStats';
import UserStats from './UserStats';

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <hr/>
            <div className="dashboard-widgets row">
                <MostViewedPosts/>
                <div className="col-6">
                    <CommentsStats/>
                    <UserStats/>
                </div>
            </div>
        </div>
    );
}

export default PageWrapper(Dashboard);