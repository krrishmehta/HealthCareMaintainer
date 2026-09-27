import React from 'react'
import Card from '../../components/common/Card'
import { useAuth } from '../../controllers/authController.jsx'

export default function ClinicianProfile() {
  const { user } = useAuth()
  const rows = [
    ['Full name', user.name],
    ['Email', user.email],
    ['Clinic / Practice', user.clinicName || '—'],
    ['Role', 'Clinician'],
  ]
  return (
    <div className="max-w-lg space-y-6">
      <h2 className="text-xl font-semibold text-ink">Profile</h2>
      <Card>
        <dl className="divide-y divide-slate-100">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between py-2.5 text-sm">
              <dt className="text-slate-400">{label}</dt>
              <dd className="text-ink font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  )
}
