// Clinician dashboard - quick stats + shortcut to scan flow.
import React from 'react'
import { Link } from 'react-router-dom'
import { Users, ScanLine, FileText, ArrowRight } from 'lucide-react'
import Card from '../../components/common/Card'
import StatCard from '../../components/common/StatCard'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { useAuth } from '../../controllers/authController.jsx'
import { useRecentPatients } from '../../controllers/clinicianController'
import { formatDate } from '../../utils/formatters'

export default function ClinicianDashboard() {
  const { user } = useAuth()
  const patients = useRecentPatients()
  if (!patients) return <LoadingSpinner label="Loading dashboard…" />

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Good to see you, {user.name.split(' ')[1] || user.name}</h2>
        <p className="text-slate-400 text-sm mt-1">{user.clinicName}</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 stagger-children">
        <StatCard icon={Users} label="Patients seen this week" value={patients.length} />
        <StatCard icon={ScanLine} label="QR scans today" value={7} tone="amber" />
        <StatCard icon={FileText} label="Documents scanned" value={12} tone="slate" />
      </div>

      <Card title="Recent patients" action={
        <Link to="/clinician/recent-patients" className="text-sm text-teal-500 flex items-center gap-1 hover:underline">
          View all <ArrowRight size={14} />
        </Link>
      }>
        <ul className="divide-y divide-slate-100">
          {patients.slice(0, 4).map(p => (
            <li key={p.id} className="py-2.5 flex items-center justify-between text-sm">
              <span className="font-medium text-ink">{p.name}</span>
              <span className="text-slate-400">{p.condition} · {formatDate(p.lastVisit)}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Link to="/clinician/scan" className="block bg-teal-500 hover:bg-teal-600 text-white rounded-lg p-5 flex items-center justify-between">
        <div>
          <p className="font-medium">Scan a patient's QR</p>
          <p className="text-sm text-teal-100 mt-0.5">Start the QR → OTP → record flow</p>
        </div>
        <ArrowRight size={20} />
      </Link>
    </div>
  )
}
