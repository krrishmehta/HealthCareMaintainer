// Patient's own audit log - every QR/OTP/record action tied to their account.
import React, { useEffect, useState } from 'react'
import AuditLogTable from '../../components/common/AuditLogTable'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { getLogs } from '../../services/auditService'
import { useAuth } from '../../controllers/authController.jsx'

export default function PatientAuditLogs() {
  const { user } = useAuth()
  const [logs, setLogs] = useState(null)

  useEffect(() => {
    const t = setTimeout(() => setLogs(getLogs({ actorFilter: user.name })), 300)
    return () => clearTimeout(t)
  }, [user.name])

  if (!logs) return <LoadingSpinner label="Loading audit logs…" />

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink mb-6">Audit Logs</h2>
      <AuditLogTable logs={logs} />
    </div>
  )
}
