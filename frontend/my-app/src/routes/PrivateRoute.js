import React from "react";
import { Route, Navigate } from "react-router-dom";  
import { useAuth } from './useAuth';  

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  console.log(isAuthenticated);
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
