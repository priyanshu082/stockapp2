import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';
import { authApi } from '../Assets/config';
import { localapi } from '../Assets/config';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [user,setUser]=useState('')

  useEffect(() => {
    if(!user){
      var storedUser = JSON.parse(localStorage.getItem("user"));
      setUser(storedUser)
    }
  }, [user]);

  
  return (
    <AuthContext.Provider value={{ isSubscribed , user , setUser, setIsSubscribed }}>
      {children}
    </AuthContext.Provider>
  );
};
