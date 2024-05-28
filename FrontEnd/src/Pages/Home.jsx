import { useContext, useEffect, useState } from "react";
import HeroSection from "../Components/Sections/HeroSection";
import SectionYoutube from "../Components/Sections/SectionYoutube";
import PlatformSection from '../Components/Sections/PlatformSection/PlatformSection';
import KnowledgeSection from "../Components/Sections/KnowledgeSection";
import FeedbackSection from "../Components/Sections/FeedbackSection";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { AuthContext } from "../Context/AuthContext";
import { localapi } from "../Assets/config";
import axios from "axios";

// import { getDataFromToken } from "../Assets/CookiesDecoder";


function Home() {


  const {setIsSubscribed,user,setUser} = useContext(AuthContext);
  // console.log(user)

  useEffect(()=>{
    if(user){
      axios.post(`${localapi}/issubscribed`, {email: user?.email}).then((result) => {
        console.log(result.data.data);
         if (typeof result.data.data !== 'string') {
           // If it's not a string, stringify it before storing in localStorage
           localStorage.setItem("isSubscribed", JSON.stringify(result.data.data));
       } else {
           // If it's already a string, directly store it in localStorage
           localStorage.setItem("isSubscribed", result.data.data);
       }
       setIsSubscribed(result.data.data)
     
      })
      .catch((err) => {
        console.log(err)
        // setUserExist(err.response.status)
      })
    }
      
    
  },[user])


   


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
