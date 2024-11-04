import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [profileData, setProfileData] = useState([]);

    return (
        <AppContext.Provider value={{ profileData, setProfileData }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);