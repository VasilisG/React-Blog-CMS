import React from 'react';
import Notifications from './Notifications';
import UserSettings from './UserSettings';

const HeaderActions = () => {
    return (
        <div className="header-actions col-3 d-flex justify-content-end align-items-center">
            <Notifications/>
            <UserSettings/>
        </div>
    )
}

export default HeaderActions;