import React from 'react'
import  Navbar from "../Components/Navbar/Navbar";
import Footer from '../Components/Footer/Footer'
import Home from "./Home";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout