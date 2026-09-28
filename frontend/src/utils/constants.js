// App-wide constants
export const ROLES = { PATIENT: 'patient', CLINICIAN: 'clinician', ADMIN: 'admin' }

// Privacy threshold: any aggregate group smaller than this must be suppressed
export const K_THRESHOLD = 5

export const OTP_TTL_SECONDS = 120
export const QR_TTL_HOURS = 24

export const AUDIT_ACTIONS = {
  QR_GENERATE: 'QR_GENERATE',
  QR_REGENERATE: 'QR_REGENERATE',
  QR_REVOKE: 'QR_REVOKE',
  QR_SCAN: 'QR_SCAN',
  OTP_SENT: 'OTP_SENT',
  OTP_VERIFIED: 'OTP_VERIFIED',
  OTP_FAILED: 'OTP_FAILED',
  RECORD_VIEW: 'RECORD_VIEW',
  VISIT_ADD: 'VISIT_ADD',
  PRESCRIPTION_ADD: 'PRESCRIPTION_ADD',
  OCR_SCAN: 'OCR_SCAN',
  DOCUMENT_SAVE: 'DOCUMENT_SAVE',
  ADMIN_QUERY: 'ADMIN_QUERY',
  AI_SUMMARY: 'AI_SUMMARY',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
}
