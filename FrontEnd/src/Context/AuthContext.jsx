import React, { createContext, useState,useEffect } from 'react';
import axios from 'axios';
import { authApi } from '../Assets/config';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user,setUser]=useState("")

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token);
    const storedUser = localStorage.getItem('user');

     if (storedUser) {
     const parsed=JSON.parse(storedUser)
      setUser(parsed); // Parse stored JSON string
    }

    // const fetchData=async()=>{
    //   try {
    //     const response =await axios.get(`${authApi}/user/me`,{
    //       headers:{
    //         Authorization:"Bearer "+localStorage.getItem("token")
    //       }
    //     })
    //     setUser(response.data.user)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    
//  if(token) fetchData();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn , user , setUser, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
