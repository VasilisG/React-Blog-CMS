import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeHigh, faNewspaper, faObjectGroup, faComment, faUser, faTag } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {

    const [postSubmenuVisible, setPostSubmenuVisible] = useState(false);
    const [categorySubmenuVisible, setCategorySubmenuVisible] = useState(false);

    const toggleSubmenu = (event) => {
        event.preventDefault();

        if(event.target.id === "posts-link"){
            setPostSubmenuVisible(!postSubmenuVisible);
            setCategorySubmenuVisible(false);
        }
        if(event.target.id === "categories-link"){
            setPostSubmenuVisible(false);
            setCategorySubmenuVisible(!categorySubmenuVisible);
        }
    }

    return (
        <div className="sidebar">
            <p className="blog-admin-title px-4 text-white text-center"><strong>React Blog</strong></p>
            <hr className="blog-admin-title-hr"/>
            <ul className="nav-items list-unstyled">
                <li className="nav-item sidebar-item">
                    <NavLink className="nav-link sidebar-link px-4" to='/dashboard'>
                        <FontAwesomeIcon icon={faGaugeHigh} className="sidebar-icon"/>
                        <span>Dashboard</span>
                    </NavLink>
                </li>
                <li className="nav-item sidebar-item">
                    <NavLink className="nav-link sidebar-link px-4" to='/posts'>
                        <FontAwesomeIcon icon={faNewspaper} className="sidebar-icon"/>
                        <span>Posts</span>
                    </NavLink>
                </li>
                <li className="nav-item sidebar-item">
                    <NavLink className="nav-link sidebar-link px-4" to='/categories'>
                        <FontAwesomeIcon icon={faObjectGroup} className="sidebar-icon"/>
                        <span>Categories</span>
                    </NavLink>
                </li>
                <li className="nav-item sidebar-item">
                    <NavLink className="nav-link sidebar-link px-4" to='/comments'>
                        <FontAwesomeIcon icon={faComment} className="sidebar-icon"/>
                        <span>Comments</span>
                    </NavLink>
                </li>
                <li className="nav-item sidebar-item">
                    <NavLink className="nav-link sidebar-link px-4" to='/tags'>
                        <FontAwesomeIcon icon={faTag} className="sidebar-icon"/>
                        <span>Tags</span>
                    </NavLink>
                </li>
                <li className="nav-item sidebar-item">
                    <NavLink className="nav-link sidebar-link px-4" to='/profile'>
                        <FontAwesomeIcon icon={faUser} className="sidebar-icon"/>
                        <span>Profile</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;