import React, { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser]=useState("")

  useEffect(() => {
    const token = localStorage.getItem('token');
   setUser(localStorage.getItem("user"))
    setIsLoggedIn(token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn , user , setUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
