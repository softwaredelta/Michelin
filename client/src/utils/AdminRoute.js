import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem('role') // eslint-disable-line
  if (role == 3 ) {//eslint-disable-line
    return children
  } else {
    return <Navigate to='/home' replace />
  }
}

export default AdminRoute
