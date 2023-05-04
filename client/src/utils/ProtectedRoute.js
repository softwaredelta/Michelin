import React from 'react'
import { Navigate, useLocation } from "react-router-dom"
import jwt_decode from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token')
    if(token) {
    const decodedToken = jwt_decode(token);
    const currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return <Navigate to="/login" replace />
  } else {  
    return children
  }
}
return <Navigate to="/login" replace />

};

export default ProtectedRoute;