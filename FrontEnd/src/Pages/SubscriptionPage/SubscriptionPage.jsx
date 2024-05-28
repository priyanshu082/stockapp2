import React ,{useContext,useState,useEffect} from "react";
import SubscriptionCard from "./SubscriptionCard";
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios';
import { authApi } from "../../Assets/config";
import { localapi } from "../../Assets/config";

const SubscriptionPage = () => {

  const {isSubscribed , user , setUser, setIsSubscribed}=useContext(AuthContext)
  // console.log(user)

  useEffect(()=>{
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
    
  },[user])

//   useEffect(() => {
//     const token = localStorage.getItem('token');
    
//     const fetchData=async()=>{
//       try {
//         const response =await axios.get(`${authApi}/user/me`,{
//           headers:{
//             Authorization:"Bearer "+localStorage.getItem("token")
//           }
//         })
       
//         setUser(response.data.user)
//       } catch (error) {
//         console.log(error)
//       }
//     }
    
//  if(token) fetchData();
//   }, []);

  console.log(user)
 
 
  return (
    <>
      <div className=" w-full h-auto flex flex-col items-center justify-center py-14">
        <div className="heading  w-full flex flex-col items-center justify-center px-5 sm:gap-3">
          <h1 className="text-lg sm:text-4xl  ">
            <span className="font-bold">Choose</span> Your Plan{" "}
          </h1>
          <p className="text-sm sm:text-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="cardconstiner flex flex-wrap items-center  w-full h-auto mt-[20px] justify-evenly py-2 gap-6">
          <SubscriptionCard
            tittle="Basic Plan"
            price="$99"
            month="/One Month"x
            cardDescription="Lorem ipsum dolor sit amet."
            first="Lorem ipsum dolor sit amet."
            second="Lorem ipsum dolor sit amet."
            third="Lorem ipsum dolor sit amet."
            fourth="Lorem ipsum dolor sit amet."
            buttonValue="Get Basic Plan"
            tenure={1}
          />
          <SubscriptionCard
            tittle="Premium Plan"
            price="$199"
            month="/Three Months"
            cardDescription="Lorem ipsum dolor sit amet."
            first="Lorem ipsum dolor sit amet."
            second="Lorem ipsum dolor sit amet."
            third="Lorem ipsum dolor sit amet."
            fourth="Lorem ipsum dolor sit amet."
            buttonValue="Get Premium Plan"
            tenure={3}
            
          />
          <SubscriptionCard
            tittle="VIP Plan"
            price="$299"
            month="/Twelve Months"
            cardDescription="Lorem ipsum dolor sit amet."
            first="Lorem ipsum dolor sit amet."
            second="Lorem ipsum dolor sit amet."
            third="Lorem ipsum dolor sit amet."
            fourth="Lorem ipsum dolor sit amet."
            buttonValue="Get VIP Plan"
            tenure={12}
            
          />
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
