import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    calendarData: [],
  });

  /*const login = (userData) => {
    setUser(userData);
  };*/

  const login = (userData) => {
    setUser({
      ...userData,
      calendarData: Array.isArray(userData.calendarData) ? userData.calendarData : [],
    });
  };
  

  /*const logout = () => {
    setUser({
      username: '',
      calendarData: [],
    });
  };*/

  const addDiaryEntry = (date, emoticon, diary) => {
    const newEntry = { date, emoticon, diary };
    setUser((prevUser) => ({
      ...prevUser,
      calendarData: [...prevUser.calendarData, newEntry],
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, addDiaryEntry }}>
      {children}
    </UserContext.Provider>
  );
};

/*export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};*/

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;