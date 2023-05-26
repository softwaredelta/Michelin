import React from 'react'
import { Navigate } from 'react-router-dom'
// 1 - TBM
// 2- Manager
// 3 - Admin
const ManagerRoute = ({ children }) => {
  const role = localStorage.getItem('role') // eslint-disable-line
  if (role == 2 || role == 3) { //eslint-disable-line
    return children
  } else {
    return <Navigate to='/' replace />
  }
}

export default ManagerRoute
