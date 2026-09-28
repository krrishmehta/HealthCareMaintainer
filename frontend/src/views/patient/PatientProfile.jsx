// Patient profile - read-only demographic + medical summary info.
import React from 'react'
import Card from '../../components/common/Card'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Badge from '../../components/common/Badge'
import { usePatientProfile } from '../../controllers/patientController'
import { formatDate } from '../../utils/formatters'

export default function PatientProfile() {
  const patient = usePatientProfile()
  if (!patient) return <LoadingSpinner label="Loading profile…" />

  const rows = [
    ['Full name', patient.name],
    ['Date of birth', formatDate(patient.dob)],
    ['Gender', patient.gender],
    ['Blood group', patient.bloodGroup],
    ['Phone', patient.phone],
    ['Address', patient.address],
  ]

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-semibold text-ink">Profile</h2>
      <Card title="Personal details">
        <dl className="divide-y divide-slate-100">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between py-2.5 text-sm">
              <dt className="text-slate-400">{label}</dt>
              <dd className="text-ink font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
      <Card title="Known allergies">
        <div className="flex flex-wrap gap-2">
          {patient.allergies.length
            ? patient.allergies.map(a => <Badge key={a} tone="warning">{a}</Badge>)
            : <p className="text-sm text-slate-400">No allergies on record.</p>}
        </div>
      </Card>
    </div>
  )
}
