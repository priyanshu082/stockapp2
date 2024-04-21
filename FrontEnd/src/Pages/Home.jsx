import { useContext, useEffect, useState } from "react";
import HeroSection from "../Components/Sections/HeroSection";
import SectionYoutube from "../Components/Sections/SectionYoutube";
import PlatformSection from '../Components/Sections/PlatformSection/PlatformSection';
import KnowledgeSection from "../Components/Sections/KnowledgeSection";
import FeedbackSection from "../Components/Sections/FeedbackSection";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { AuthContext } from "../Context/AuthContext";
// import jwt_decode from 'jsonwebtoken';
// import { getDataFromToken } from "../Assets/CookiesDecoder";



function Home() {
  const token = localStorage.getItem('token');
const [data,setData]=useState()
  // const { user} = useContext(AuthContext);
  // console.log(user)
//  useEffect(()=>{
//   const decodedToken = jwt_decode(token);
//   setData(decodedToken)
//  },[])

 console.log(data)
  return (
  <> 
  <div className="w-full h-auto bg-white">
      <Navbar/>
     <HeroSection/>
     <SectionYoutube/>
     <PlatformSection/>
     <KnowledgeSection/>
     <FeedbackSection/>
  <Footer/>
     </div>
  </>
  );
}

export default Home;
