// ProtectedRoute - guards a route subtree by login state + allowed roles.
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../controllers/authController.jsx'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingSpinner label="Checking your session…" />
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/403" replace />

  return children
}
