import { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({children}) => {
    const [user, addUser ] = useState(null);
    const [theme, setTheem ] = useState('light');

    return (
        <AppContext.Provider value={{ user, setUser, theme, setTheme }}>
            { children }
        </AppContext.Provider>
    );
};

export {
    AppProvider,
    AppContext
}