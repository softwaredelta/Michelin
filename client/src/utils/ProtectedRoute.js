import React from 'react'
import { Navigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token') // eslint-disable-line
  if (token) {
    const decodedToken = jwtDecode(token)
    const currentDate = new Date()

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return <Navigate to='/login' replace />
    } else {
      return children
    }
  }

  return <Navigate to='/login' replace />
}

export default ProtectedRoute
