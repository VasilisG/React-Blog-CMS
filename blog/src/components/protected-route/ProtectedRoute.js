import React from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

const ProtectedRoute = ( {component} ) => {

  const { isLoggedIn } = useSelector((state) => {
    return state.auth;
  });

  const location = useLocation();

  return isLoggedIn ? component : <Navigate to="/login" state={{from: location}} replace/>

}

export default ProtectedRoute;