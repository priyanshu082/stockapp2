// src/components/PrivateRoute.js
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../Context/AuthContext";
import { useContext } from 'react';

const PrivateRoute = ({ children }) => {

  const { isSubscribed } = useContext(AuthContext);

  if (!localStorage.getItem("isSubscribed")) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/SubscriptionPage" />;
  }

  // Render the protected component if authenticated
  return children;
};

export default PrivateRoute;
