import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const PrivateRoute = ({ children }) => {
   const { isSubscribed, user } = useContext(AuthContext);
   const location = useLocation();

   useEffect(() => {
     if (localStorage.getItem("isSubscribed") && location.pathname === "/SubscriptionPage") {
       toast.success("You are already subscribed!");
     }
   }, [isSubscribed, location])

   if (!localStorage.getItem("isSubscribed")) {
     return <Navigate to="/SubscriptionPage" />
   }

   return children;
};

export default PrivateRoute;