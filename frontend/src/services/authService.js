// authService - mock authentication only. No real password hashing/storage;
// this exists purely to demo role-based login/register flows.
import { DEMO_USERS, DEMO_CREDENTIALS } from './mockData'
import { request } from './apiService'
import { logAction } from './auditService'
import { AUDIT_ACTIONS } from '../utils/constants'

const SESSION_KEY = 'medichain_session'

export function login(email, password) {
  return request(() => {
    const user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
    const validPassword = DEMO_CREDENTIALS[email.toLowerCase()] === password
    if (!user || !validPassword) {
      return { success: false, error: 'Invalid email or password.' }
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    logAction({ actor: user.name, action: AUDIT_ACTIONS.LOGIN, target: user.email, result: 'success' })
    return { success: true, user }
  })
}

// Registration is mock: it "creates" a user object client-side only.
// Admin accounts cannot self-register (enforced in the Register view too).
export function register({ name, email, password, role, clinicName }) {
  return request(() => {
    if (role === 'admin') {
      return { success: false, error: 'Admin accounts cannot be self-registered.' }
    }
    if (DEMO_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' }
    }
    const newUser = { id: `u-${Date.now()}`, name, email, role, clinicName: clinicName || null, avatarColor: '#0F5C56' }
    DEMO_USERS.push(newUser)
    DEMO_CREDENTIALS[email.toLowerCase()] = password
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))
    logAction({ actor: newUser.name, action: AUDIT_ACTIONS.LOGIN, target: newUser.email, result: 'success', details: 'New registration' })
    return { success: true, user: newUser }
  })
}

export function requestPasswordReset(email) {
  return request(() => {
    const exists = DEMO_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())
    // Always report success to avoid leaking which emails are registered
    return { success: true, message: exists ? 'Reset link sent to your email.' : 'If that email exists, a reset link has been sent.' }
  }, 600)
}

export function logout() {
  const session = getSession()
  if (session) logAction({ actor: session.name, action: AUDIT_ACTIONS.LOGOUT, target: session.email })
  localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
