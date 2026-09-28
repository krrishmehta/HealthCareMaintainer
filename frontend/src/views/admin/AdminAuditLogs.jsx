// Admin sees ALL audit logs system-wide (not filtered to their own actions),
// since audit oversight is an admin responsibility.
import React, { useEffect, useState } from 'react'
import AuditLogTable from '../../components/common/AuditLogTable'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { getLogs } from '../../services/auditService'

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setLogs(getLogs()), 300)
    return () => clearTimeout(t)
  }, [])

  if (!logs) return <LoadingSpinner label="Loading system audit logs…" />

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink mb-1">Audit Logs</h2>
      <p className="text-slate-400 text-sm mb-6">System-wide log of QR, OTP, record, visit, prescription, OCR, and admin actions.</p>
      <AuditLogTable logs={logs} />
    </div>
  )
}
