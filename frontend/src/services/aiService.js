// aiService - Admin-only AGGREGATE trend summaries. This service NEVER
// touches authentication, authorization, OTP verification, privacy
// suppression, or individual clinical decisions - it only narrates
// pre-aggregated, already-anonymized numbers.
import { request } from './apiService'
import { logAction } from './auditService'
import { AUDIT_ACTIONS } from '../utils/constants'
import { AI_SUMMARY_TEXT } from './mockData'

export function generateTrendSummary(adminName, filters = {}) {
  return request(() => {
    logAction({ actor: adminName, action: AUDIT_ACTIONS.AI_SUMMARY, target: JSON.stringify(filters) })
    return { success: true, summary: AI_SUMMARY_TEXT, generatedAt: new Date().toISOString() }
  }, 900)
}
