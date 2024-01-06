import React, { useCallback, useState, useEffect } from 'react';
import SectionHeader from './SectionHeader';
import API from '../../utils/api';
import { faFireFlameCurved } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

const MostViewedPosts = () => {

    const [mostViewedPosts, setMostViewedPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMostViewedPosts = useCallback(async () => {
        setIsLoading(true);
        const response = await API.get(`stats/mostviewed`);
        const results = response.data;
        setMostViewedPosts(results.data);
        setIsLoading(false);
    }, []);

    const renderPostItems = () => {
        return mostViewedPosts.map(elem => {
            return (
                <li className="list-group-item most-viewed-item" key={elem._id}>
                    <Link to={`/posts/edit/${elem._id}`}>
                        <div className="list-item-container d-flex text-center">
                            <span className="list-item-id col-6">{elem._id}</span>
                            <span className="list-item-title col-6">{elem.title}</span>
                        </div>
                    </Link>
                </li>
            )
        });
    }

    const renderPostList = () => {
        return (
            <ul className="most-viewed-posts-list list-group list-group-flush">
                <li className="list-group-item" key='0'>
                    <div className="list-item-container d-flex text-center">
                        <span className="list-item-id fw-bold col-6"># ID</span>
                        <span className="list-item-title fw-bold col-6">Title</span>
                    </div>
                </li>
                {renderPostItems()}
            </ul>
        );
    }

    useEffect(() => {
        fetchMostViewedPosts();
    }, [fetchMostViewedPosts]);

    return (
        <div className="col-6 dashboard-col">
            <div className="card most-viewed-posts-container shadow">
                <SectionHeader title="Most viewed posts" icon={faFireFlameCurved}/>
                <div className="most-viewed-posts card-body">
                    <div className="most-viewed-posts-list-container">
                        {isLoading ? <LoadingSpinner/> : renderPostList()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MostViewedPosts;