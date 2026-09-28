// Patient Records - only shows data once a QR+OTP unlock has happened this
// session (passed via router state). Directly visiting this page without
// that unlock shows a locked state - the QR/URL alone never exposes records.
import React, { useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Lock, Pill } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import EmptyState from '../../components/common/EmptyState'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import TimelineItem from '../../components/patient/TimelineItem'
import { useUnlockedPatientRecord } from '../../controllers/clinicianController'
import { viewRecordAudit } from '../../controllers/patientController'
import { formatDate } from '../../utils/formatters'

export default function PatientRecords() {
  const location = useLocation()
  const unlocked = Boolean(location.state?.patientId)
  const record = useUnlockedPatientRecord(unlocked)

  useEffect(() => {
    if (record) viewRecordAudit(record.patient.name)
  }, [record])

  if (!unlocked) {
    return (
      <EmptyState
        icon={Lock}
        title="No record unlocked"
        description="Scan a patient's QR and verify their OTP to view a record. Records are never accessible directly."
        action={<Link to="/clinician/scan" className="text-sm text-teal-500 hover:underline">Go to Scan QR</Link>}
      />
    )
  }

  if (!record) return <LoadingSpinner label="Decrypting authorized record…" />

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-ink">{record.patient.name}</h2>
          <p className="text-sm text-slate-400">{record.patient.gender} · {record.patient.bloodGroup} · DOB {formatDate(record.patient.dob)}</p>
        </div>
        <Badge tone="success">Access verified</Badge>
      </div>

      <Card title="Allergies">
        <div className="flex flex-wrap gap-2">
          {record.patient.allergies.map(a => <Badge key={a} tone="warning">{a}</Badge>)}
        </div>
      </Card>

      <div>
        <h3 className="font-semibold text-ink mb-4 flex items-center gap-2"><Pill size={16} className="text-teal-500" /> Visit history</h3>
        {record.visits.map((v, i) => (
          <TimelineItem key={v.id} visit={v} isLast={i === record.visits.length - 1} />
        ))}
      </div>
    </div>
  )
}
