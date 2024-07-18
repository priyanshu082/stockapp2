import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { adminEmail,adminPassword } from '../Assets/config';

const AdminPrivateRoute = ({ children }) => {
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAdminStatus = () => {
      

      const storedEmail = localStorage.getItem("adminEmail");
      const storedPassword = localStorage.getItem("adminPassword");

      if (storedEmail === adminEmail && storedPassword === adminPassword) {
        setIsAdmin(true);
        // Remove admin credentials from localStorage
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminPassword");
      } 
      setIsChecking(false);
    };

    checkAdminStatus();
  }, []);

  if (isChecking) {
    return <div>Checking admin status...</div>;
  }

  if (!isAdmin) {
    toast.error("Admin access required. Redirecting to login.");
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminPrivateRoute;