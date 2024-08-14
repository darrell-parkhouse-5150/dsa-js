import { createContext, useState } from 'react';

const NotificationContext = createContext();
const NotificationProvider  = ({children}) => {
    const [notifications, setNotifications] = useState([]);
    const addNotification = (notification) => {
        setNotifications((prevNotifications) => [...prevNotifications, notifications]);
    };

    const removeNotification = id => {
        setNotifications((prevNotifications) => {
            prevNotifications.filter(notification => notification.id !== id)
        });
    };

    return (
        <NotificationContext.Provider value={{ notifications, addNotifications, removeNotification}}>
            { children }
        </NotificationContext.Provider>
    );
};

export { NotificationProvider, NotificationContext }