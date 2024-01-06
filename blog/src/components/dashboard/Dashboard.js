import React from 'react';
import PageWrapper from '../../hoc/PageWrapper';
import MostViewedPosts from './MostViewedPosts';
import DailyVisits from './charts/DailyVisits';
import CommentsStats from './CommentsStats';
import UserStats from './UserStats';

const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <hr/>
            <div className="dashboard-widgets row">
                <MostViewedPosts/>
                <DailyVisits/>
                <CommentsStats/>
                <UserStats/>
            </div>
        </div>
    );
}

export default PageWrapper(Dashboard);