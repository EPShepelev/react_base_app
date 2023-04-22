import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { publicRoutes, privateRoutes } from '../router'
import { AuthContext } from '../context'
import Loader from './UI/loader/Loader'

const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <Loader />
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} end={route.end} />
      ))}
      <Route path='*' element={<Navigate to='/posts' replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} end={route.end} />
      ))}
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  )
}

export default AppRouter
