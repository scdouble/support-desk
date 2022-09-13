import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import Spinner from './Spinner'
import {useAuthStatus} from '../hooks/useAuthStatus'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth)

  if (user) return children

  return <Navigate to='/login' />
}

export default PrivateRoute
