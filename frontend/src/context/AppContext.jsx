import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
const [userStats, setUserStats] = useState({
    username: 'Gopa Bahumik',
    email: 'Bahumik@example.com',
    wpm: 72,
    accuracy: 94,
    totalCharactersTyped: 12000,
    raceAttended: 56
});

return (
    <AppContext.Provider value={{ userStats, setUserStats }}>
        {children}
    </AppContext.Provider>
);
};

export const useAppContext = () => useContext(AppContext);