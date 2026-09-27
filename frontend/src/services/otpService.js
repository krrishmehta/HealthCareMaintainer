// otpService - simulates sending a one-time password to the patient after a
// clinician scans their QR. The clinician never sees the code; in the demo
// we surface it in a toast/banner labeled "for demo purposes only".
import { request } from './apiService'
import { logAction } from './auditService'
import { AUDIT_ACTIONS, OTP_TTL_SECONDS } from '../utils/constants'

let activeOtp = null // { code, expiresAt, patientName }

export function sendOtp(patientName) {
  return request(() => {
    const code = String(Math.floor(100000 + Math.random() * 900000))
    activeOtp = { code, expiresAt: Date.now() + OTP_TTL_SECONDS * 1000, patientName }
    logAction({ actor: patientName, action: AUDIT_ACTIONS.OTP_SENT, target: 'clinician-verification' })
    return { success: true, demoCode: code, ttlSeconds: OTP_TTL_SECONDS }
  }, 500)
}

export function verifyOtp(enteredCode, clinicianName) {
  return request(() => {
    if (!activeOtp) return { success: false, status: 'expired', error: 'No active OTP. Please rescan the QR.' }
    if (Date.now() > activeOtp.expiresAt) {
      logAction({ actor: clinicianName, action: AUDIT_ACTIONS.OTP_FAILED, target: activeOtp.patientName, result: 'failed', details: 'expired' })
      return { success: false, status: 'expired', error: 'OTP expired. Please rescan the QR.' }
    }
    if (enteredCode !== activeOtp.code) {
      logAction({ actor: clinicianName, action: AUDIT_ACTIONS.OTP_FAILED, target: activeOtp.patientName, result: 'failed', details: 'incorrect code' })
      return { success: false, status: 'invalid', error: 'Incorrect OTP. Please try again.' }
    }
    logAction({ actor: clinicianName, action: AUDIT_ACTIONS.OTP_VERIFIED, target: activeOtp.patientName })
    const patientName = activeOtp.patientName
    activeOtp = null
    return { success: true, status: 'valid', patientName }
  }, 500)
}
