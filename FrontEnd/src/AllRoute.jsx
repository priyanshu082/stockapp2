// AllRoute.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration Page/Registration";
import Login from "./Pages/Login Page/Login";
import Datapage from "./Pages/DataPage/Datapage";
import SubscriptionPage from "./Pages/SubscriptionPage/SubscriptionPage";
import CommutativeSum from "./Pages/Commutative Change in OI/CommutativeSum";
import StrikeGraph from "./Pages/Strikegraph/StrikeGraph";
import TermAndCondition from "./Pages/termAndCondition/termAndCondition";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Privacypolicy from "./Pages/Privacypolicy/Privacypolicy";
import RefundandCancel from "./Pages/RefundandCancel/RefundandCancel";
import Buy_Seller from "./Pages/Buyer_VS_Seller/Buy_Seller"
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";


function AllRoute() {

  const {isLoggedIn}=useContext(AuthContext)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/termAndCondition" element={<TermAndCondition />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/Privacypolicy" element={<Privacypolicy/>}/>
      <Route path="/RefundandCancel" element={<RefundandCancel/>}/>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SubscriptionPage" element={<SubscriptionPage />} />

      {/* here the login and signup pages start where auth is required */}
      
      <Route path="/Data" element={isLoggedIn ? <Datapage /> : <Login/>} />
      <Route path="/CommutativeSum" element={isLoggedIn ? <CommutativeSum /> : <Login/>} />
      <Route path="/StrikeGraph" element={isLoggedIn ? <StrikeGraph /> : <Login/>} />
      <Route path="/Buyer_VS_Seller" element={isLoggedIn ? <Buy_Seller /> : <Login/>} />
  
   
    </Routes>
  );
}

export default AllRoute;
