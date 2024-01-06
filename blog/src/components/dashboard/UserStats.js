import React from 'react';
import { useSelector } from 'react-redux';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import SectionHeader from './SectionHeader';
import UserInfo from './UserInfo';
import { formatDatetime } from '../../utils/dateFormatter';

const UserStats = () => {

    const { email, lastLogin } = useSelector((state) => {
        return state.auth;
    });

    return (
        <div className="col-6 dashboard-col">
            <div className="card user-stats-container shadow">
                <SectionHeader title="User stats" icon={faUser}/>
                <div className="card-body user-stats">
                    <UserInfo title="Email" value={email || '-'}/>
                    <UserInfo title="Last logged in" value={lastLogin ? formatDatetime(lastLogin) : '-'}/>
                </div>
            </div>
        </div>
    )
}

export default UserStats;