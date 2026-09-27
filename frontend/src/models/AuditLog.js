// AuditLog model - one immutable record of a sensitive action
export function createAuditLog({ id, timestamp, actor, action, target, result = 'success', details = '' }) {
  return { id, timestamp, actor, action, target, result, details }
}
