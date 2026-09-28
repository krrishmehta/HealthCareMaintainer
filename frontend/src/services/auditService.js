// auditService - append-only mock audit trail, backed by localStorage so
// entries survive a page refresh during the demo. Every sensitive action
// (QR, OTP, records, visits, prescriptions, OCR, admin queries, AI summary)
// should call logAction().
import { createAuditLog } from '../models/AuditLog'

const STORAGE_KEY = 'medichain_audit_logs'

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAll(logs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
  } catch {
    // storage unavailable (private browsing etc) - fail silently for demo
  }
}

export function logAction({ actor, action, target, result = 'success', details = '' }) {
  const entry = createAuditLog({
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    actor, action, target, result, details,
  })
  const logs = readAll()
  logs.unshift(entry)
  writeAll(logs.slice(0, 500)) // cap growth for the demo
  return entry
}

export function getLogs({ actorFilter = null } = {}) {
  const logs = readAll()
  if (!actorFilter) return logs
  return logs.filter(l => l.actor === actorFilter)
}

export function seedIfEmpty(seedEntries) {
  if (readAll().length === 0) writeAll(seedEntries)
}
