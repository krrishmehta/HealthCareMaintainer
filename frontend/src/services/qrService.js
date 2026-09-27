// qrService - QR tokens are OPAQUE. The QR code only ever encodes a random
// token id - never any medical data. Resolving a token to a patient record
// requires clinician authorization + patient OTP (see otpService).
import { request } from './apiService'
import { logAction } from './auditService'
import { AUDIT_ACTIONS } from '../utils/constants'

function randomToken() {
  return 'qr-tok-' + Math.random().toString(36).slice(2, 10).toUpperCase()
}

export function generateToken(patient) {
  return request(() => {
    const token = randomToken()
    logAction({ actor: patient.name, action: AUDIT_ACTIONS.QR_GENERATE, target: token })
    return { success: true, token, issuedAt: new Date().toISOString() }
  })
}

export function regenerateToken(patient, oldToken) {
  return request(() => {
    const token = randomToken()
    logAction({ actor: patient.name, action: AUDIT_ACTIONS.QR_REGENERATE, target: token, details: `Replaced ${oldToken}` })
    return { success: true, token, issuedAt: new Date().toISOString() }
  })
}

export function revokeToken(patient, token) {
  return request(() => {
    logAction({ actor: patient.name, action: AUDIT_ACTIONS.QR_REVOKE, target: token })
    return { success: true }
  })
}

// Simulates a clinician scanning a QR - only confirms the token LOOKS valid.
// It never returns medical data by itself.
export function scanToken(rawValue, clinician) {
  return request(() => {
    const isValid = typeof rawValue === 'string' && rawValue.startsWith('qr-tok-')
    logAction({
      actor: clinician?.name || 'Unknown clinician',
      action: AUDIT_ACTIONS.QR_SCAN,
      target: rawValue,
      result: isValid ? 'success' : 'failed',
    })
    if (!isValid) return { success: false, error: 'Invalid or unreadable QR code.' }
    return { success: true, token: rawValue }
  })
}
