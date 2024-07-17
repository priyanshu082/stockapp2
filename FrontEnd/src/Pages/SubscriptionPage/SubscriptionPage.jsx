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



  console.log(user)
 
 
  return (
    <>
      <div className=" w-full h-auto flex flex-col items-center justify-center py-14">
        <div className="heading  w-full flex flex-col items-center justify-center px-5 sm:gap-3">
          <h1 className="text-lg sm:text-4xl  ">
            <span className="font-bold">Choose</span> Your Plan{" "}
          </h1>
          <p className="text-sm sm:text-md">
           Be The Part of Ride On Whale
          </p>
        </div>
        <div className="cardconstiner flex flex-wrap items-center  w-full h-auto mt-[20px] justify-evenly py-2 gap-6">
          <SubscriptionCard
            tittle="Basic Plan"
            price="₹99"
            month="/One Month"
            
            first="-OI Breakup(Chnage OI,commulative OI,Change OI in Amount,PCR,Support & Residence) and many more"
            second="-Long Buildup,Short Buildup,unwinding,LongBuildup"
            third="-Compare Commulative Call OI ,Put OI & Price"
            fourth="-Compare Strike OI, Call OI,Put OI & Price"
            fifth="-Screener"
            buttonValue="Get Basic Plan"
            tenure={1}
          />
          <SubscriptionCard
            tittle="Premium Plan"
            price="₹199"
            month="/Three Months"
            
            first="-OI Breakup(Chnage OI,commulative OI,Change OI in Amount,PCR,Support & Residence) and many more"
            second="-Long Buildup,Short Buildup,unwinding,LongBuildup"
            third="-Compare Commulative Call OI ,Put OI & Price"
            fourth="-Compare Strike OI, Call OI,Put OI & Price"
            fifth="-Screener"
            buttonValue="Get Premium Plan"
            tenure={3}
            
          />
          <SubscriptionCard
            tittle="VIP Plan"
            price="₹299"
            month="/Twelve Months"
            
            first="-OI Breakup(Chnage OI,commulative OI,Change OI in Amount,PCR,Support & Residence) and many more"
            second="-Long Buildup,Short Buildup,unwinding,LongBuildup"
            third="-Compare Commulative Call OI ,Put OI & Price"
            fourth="-Compare Strike OI, Call OI,Put OI & Price"
            fifth="-Screener"
            buttonValue="Get VIP Plan"
            tenure={12}
            
          />
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
