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
 import Screener from "./Pages/Screener/Screener";
 import Admin from "./Pages/admin/Admin";
 import PrivateRoute from "./Pages/Private";
 import AdminPrivateRoute from "./Pages/AdminPrivateRoute";
 import AdminLogin from "./Pages/admin/AdminLogin";
 import OI from "./Pages/oi/oi";
 import ForgotPassword from "./Pages/Login Page/ForgotPassword";

 function AllRoute() {
   return (
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/termAndCondition" element={<TermAndCondition />} />
       <Route path="/AboutUs" element={<AboutUs />} />
       <Route path="/Privacypolicy" element={<Privacypolicy/>}/>
       <Route path="/RefundandCancel" element={<RefundandCancel/>}/>
       <Route path="/register" element={<Registration />} />
       <Route path="/login" element={<Login />} />
       <Route path="/admin-login" element={<AdminLogin />} />
       <Route path="/SubscriptionPage" element={<SubscriptionPage />} />
       <Route path="/forgot-password" element={<ForgotPassword />} />

       {/* Admin route with AdminPrivateRoute */}
       <Route path="/admin" element={
         <AdminPrivateRoute>
           <Admin />
         </AdminPrivateRoute>
       } />

       {/* Other private routes */}
       <Route path="/Data" element={
         <PrivateRoute>
           <Datapage />
         </PrivateRoute>
       } />
       <Route path="/oi" element={
         <PrivateRoute>
           <OI />
         </PrivateRoute>
       } />
       <Route path="/CommutativeSum" element={
         <PrivateRoute>
           <CommutativeSum />
         </PrivateRoute>
       } />
       <Route path="/StrikeGraph" element={
         <PrivateRoute>
           <StrikeGraph />
         </PrivateRoute>
       } />
       <Route path="/Buyer_VS_Seller" element={
         <PrivateRoute>
           <Buy_Seller />
         </PrivateRoute>
       } />
       <Route path="/screener" element={
         <PrivateRoute>
           <Screener />
         </PrivateRoute>
       } />
     </Routes>
   );
 }

 export default AllRoute;


// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Home from "./Pages/Home";
// import Registration from "./Pages/Registration Page/Registration";
// import Login from "./Pages/Login Page/Login";
// import Datapage from "./Pages/DataPage/Datapage";
// import SubscriptionPage from "./Pages/SubscriptionPage/SubscriptionPage";
// import CommutativeSum from "./Pages/Commutative Change in OI/CommutativeSum";
// import StrikeGraph from "./Pages/Strikegraph/StrikeGraph";
// import TermAndCondition from "./Pages/termAndCondition/termAndCondition";
// import AboutUs from "./Pages/AboutUs/AboutUs";
// import Privacypolicy from "./Pages/Privacypolicy/Privacypolicy";
// import RefundandCancel from "./Pages/RefundandCancel/RefundandCancel";
// import Buy_Seller from "./Pages/Buyer_VS_Seller/Buy_Seller";
// import Screener from "./Pages/Screener/Screener";
// import Admin from "./Pages/admin/Admin";
// import AdminPrivateRoute from "./Pages/AdminPrivateRoute";
// import AdminLogin from "./Pages/admin/AdminLogin";
// import OI from "./Pages/oi/oi";
// import ForgotPassword from "./Pages/Login Page/ForgotPassword";

// function AllRoute() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/termAndCondition" element={<TermAndCondition />} />
//       <Route path="/AboutUs" element={<AboutUs />} />
//       <Route path="/Privacypolicy" element={<Privacypolicy />} />
//       <Route path="/RefundandCancel" element={<RefundandCancel />} />
//       <Route path="/register" element={<Registration />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/admin-login" element={<AdminLogin />} />
//       <Route path="/SubscriptionPage" element={<SubscriptionPage />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       {/* Admin route with AdminPrivateRoute */}
//       <Route path="/admin" element={
//         <AdminPrivateRoute>
//           <Admin />
//         </AdminPrivateRoute>
//       } />

//       {/* Other routes (no longer private) */}
//       <Route path="/Data" element={<Datapage />} />
//       <Route path="/oi" element={<OI />} />
//       <Route path="/CommutativeSum" element={<CommutativeSum />} />
//       <Route path="/StrikeGraph" element={<StrikeGraph />} />
//       <Route path="/Buyer_VS_Seller" element={<Buy_Seller />} />
//       <Route path="/screener" element={<Screener />} />
//     </Routes>
//   );
// }

// export default AllRoute;
