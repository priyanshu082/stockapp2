import React, { createContext, useState,useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [symbol, setSymbol] = useState("BANKNIFTY");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [user,setUser]=useState('')

  useEffect(() => {
    if(!user){
      const storedUser = JSON.parse(localStorage.getItem("user"));
      console.log(storedUser.email)
      setUser(storedUser)
    }
  }, [user]);

  useEffect(() => {
    if(!isSubscribed){
      if(localStorage.getItem("isSubscribed")){
        setIsSubscribed(true)
      }
    }
  }, [user]);

  
  return (
    <AuthContext.Provider value={{ isSubscribed , user , setUser, setIsSubscribed ,symbol ,setSymbol}}>
      {children}
    </AuthContext.Provider>
  );
};
