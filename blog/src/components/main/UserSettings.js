import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { BASE_DIR } from '../../config/env';
import placeholder from '../../assets/profile_placeholder.png';
import { logout } from '../../store/thunks/auth';
import { fetchProfile } from '../../store';

const UserSettings = () => {

    const [menuVisible, setMenuVisible] = useState(false);

    const { image } = useSelector((state) => {
        return state.profile;
    })

    const dispatch = useDispatch();

    const fetchProfileData = async () => {
        await dispatch(fetchProfile());
    }

    useEffect(() => {
        function hideMenu(event) {
            let id = event.target.id;
            if(id !== 'user-settings-link' && id !== 'user-settings-image'){
                setMenuVisible(false);
            }
        }
        document.body.addEventListener('click', hideMenu);
        return () => {
            document.body.removeEventListener('click', hideMenu);
        }
    }, []);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const updateDropdownVisible = (event) => {
        event.preventDefault();
        let id = event.target.id;
        if(id === 'user-settings-link' || id === 'user-settings-image'){
            setMenuVisible(!menuVisible);
        }
    }

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logout());
    }

    return (
        <div className="user-settings-container position-relative">
            <a id="user-settings-link" className="user-settings-link shadow" href="#" onClick={updateDropdownVisible}>
                <img id="user-settings-image" className="user-settings-image" width="32" height="32" src={BASE_DIR + (image ?? placeholder)} alt="User profile"/>
            </a>
            <div className={`user-settings-dropdown ${menuVisible ? 'user-settings-dropdown-active' : ''} position-absolute`}>
                <span className="triangle"></span>
                <ul className="user-settings-list shadow position-relative">
                    <li className="user-settings-item">
                        <NavLink to='/profile'>Profile</NavLink>
                    </li>
                    <li className="user-settings-item">
                        <a href="#" onClick={handleLogout}>Log out</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default UserSettings;