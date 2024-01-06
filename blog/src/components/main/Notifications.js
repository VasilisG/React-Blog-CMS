import { React, useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faClose } from '@fortawesome/free-solid-svg-icons';
import API from '../../utils/api';
import { formatDate } from '../../utils/dateFormatter';

const Notifications = () => {

    const [total, setTotal] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [limit, setLimit] = useState(5);
    const [menuVisible, setMenuVisible] = useState(false);

    const notificationRef = useRef(null);
    const dropdownMenuRef = useRef(null);

    const updateDropdownVisible = (event) => {
        event.preventDefault();
        if(notificationRef && notificationRef.current.contains(event.target)){
            setMenuVisible(!menuVisible);
        }
    }

    const getUnread = () => {
        return notifications.filter(elem => !elem.isRead).length;
    }

    const getUnreadText = () => {
        const unread = getUnread();
        return unread <= 20 ? unread : '20+';
    }

    const allNotificationsLoaded = () => {
        return total === notifications.length;
    }

    const handleClose = () => {
        setMenuVisible(false);
    }

    const handleLoadMore = () => {
        setLimit(limit + 5);
    }

    const handleRefresh = () => {
        fetchNotifications();
    }

    const fetchNotifications = async () => {
        const response = await API.get(`notifications?limit=${limit}`);
        const messages = response.data;
        setTotal(messages.total);
        setNotifications(messages.data);
    }

    const handleMarkAsRead = async (notificationId) => {
        const response = await API.put(`notifications/${notificationId}`);
        const message = response.data;
        const updatedNotification = message.data;
        const updatedNotifications = notifications.slice();
        const position = updatedNotifications.findIndex(elem => elem._id === notificationId);
        updatedNotifications[position] = updatedNotification;
        setNotifications(updatedNotifications);
    }

    const handleMarkAllAsRead = async () => {
        const response = await API.put(`notifications/markAllAsRead`);
        fetchNotifications();
    }

    const renderNotifications = () => {
        return notifications.map(
            elem => <li 
                        key={elem._id} 
                        className={`notification-item ${elem.isRead ? 'notification-item-read' : ''}`}
                    >
                        <p className={`notification-message ${!elem.isRead ? 'fw-bold' : ''}`}>{elem.content}</p>
                        <div className="notification-date-info d-flex justify-content-between mt-2">
                            <span className="notification-created-at">Created at: {formatDate(elem.createdAt)}</span>
                            {
                            !elem.isRead 
                            ? <button 
                                type="button" 
                                className="notification-action-button mark-as-read-button"
                                onClick={() => handleMarkAsRead(elem._id)}
                              >
                                Mark as read
                              </button>
                            : 
                                <span className="notification-read">Read</span>
                            }
                        </div>
                        
                    </li>
        );
    }

    useEffect(() => {
        const fetchData = () => {
            fetchNotifications();
        }
        fetchData();
    }, [limit]);

    useEffect(() => {
        function hideMenu(event) {
            if(
                dropdownMenuRef.current 
                && !dropdownMenuRef.current.contains(event.target)
                && notificationRef
                && !notificationRef.current.contains(event.target)
            ) {
                setMenuVisible(false);
            } 
        }
        document.body.addEventListener('click', hideMenu);
        return () => {
            document.body.removeEventListener('click', hideMenu);
        }
    }, []);

    return (
        <div 
            className="notifications-container position-relative" 
            onClick={updateDropdownVisible}
        >
            <a 
                id="notification-cta" 
                className="notification-cta" 
                href="#"
                ref={notificationRef}
            >
                <FontAwesomeIcon icon={faBell} className="notification-icon"/>
                {
                    getUnread() 
                    ? <span 
                        id="notification-counter" 
                        className={`notification-counter`}>
                            {getUnreadText()}
                        </span> 
                    : null
                }
            </a>
            <div 
                className={`notifications-dropdown shadow ${menuVisible ? 'notifications-dropdown-active' : ''} position-absolute`}
                ref={dropdownMenuRef}
            >
                <span className="triangle"></span>
                <div className="notification-inner-dropdown">
                    <div className="notification-title-container d-flex justify-content-between">
                        <p className="notification-title">Notifications</p>
                        <button 
                            className="notification-action-button close-button" 
                            type="button"
                            onClick={handleClose}
                        >
                            <FontAwesomeIcon icon={faClose} className="notification-close-icon"/>
                        </button>
                    </div>
                    
                    <div className="actions-container d-flex justify-content-end p-2">
                        <button 
                            className="notification-action-button" 
                            type="button"
                            onClick={handleMarkAllAsRead}
                            disabled={getUnread() === 0}
                        >
                            Mark all as read
                        </button>
                        <span className="separator">|</span>
                        <button 
                            className="notification-action-button" 
                            type="button"
                            onClick={handleRefresh}
                        >
                            Refresh
                        </button>
                    </div>
                    <ul className="notification-list position-relative">
                        {renderNotifications()}
                    </ul>
                    <div className="load-more-container">
                        <button 
                            className="notification-action-button" 
                            type="button"
                            onClick={handleLoadMore}
                            disabled={allNotificationsLoaded()}
                        >
                            Load more
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Notifications;