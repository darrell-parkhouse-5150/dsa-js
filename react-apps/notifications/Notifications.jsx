import React,{ useContext } from 'react';

import { NotificationContext } from './NotificationContext';
const Notification = () => {
    const [notifications, addNotifications] = useContext(NotificationContext);

    const handleAddNotification = () => {
        addNotifications({id: new Date.getTime(), message: 'new notification'});
    };

    const handleRemoveNotification = (id) => {
         
    }
}

export default Notification