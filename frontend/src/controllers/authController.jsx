// authController - React context that exposes the current session and
// auth actions (login/register/logout) to the whole app.
import React, { createContext, useContext, useEffect, useState } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setUser(authService.getSession())
    setLoading(false)
  }, [])

  async function login(email, password) {
    const res = await authService.login(email, password)
    if (res.success) setUser(res.user)
    return res
  }

  async function register(payload) {
    const res = await authService.register(payload)
    if (res.success) setUser(res.user)
    return res
  }

  function logout() {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
