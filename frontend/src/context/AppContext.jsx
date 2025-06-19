import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [userStats, setUserStats] = useState({
    username: 'Gopa Bahumik',
    email: 'Bahumik@example.com',
    wpm: 72,
    accuracy: 94,
    totalCharactersTyped: 12000,
    raceAttended: 56,
    joinedDate: '25/07/2025'  // Yahan par aapne `joinedDate` ko rakh liya
  });

  return (
    <AppContext.Provider value={{ userStats, setUserStats }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
