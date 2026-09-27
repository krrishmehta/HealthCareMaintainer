// Patient dashboard - quick overview of records, next follow-up, QR status.
import React from 'react'
import { Link } from 'react-router-dom'
import { History, Pill, FileText, QrCode, ArrowRight } from 'lucide-react'
import Card from '../../components/common/Card'
import StatCard from '../../components/common/StatCard'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { useAuth } from '../../controllers/authController.jsx'
import { useHealthTimeline, usePatientProfile } from '../../controllers/patientController'
import { formatDate } from '../../utils/formatters'

export default function PatientDashboard() {
  const { user } = useAuth()
  const visits = useHealthTimeline()
  const patient = usePatientProfile()

  if (!visits || !patient) return <LoadingSpinner label="Loading your dashboard…" />

  const nextFollowUp = visits.find(v => v.followUp && new Date(v.followUp) > new Date())
  const totalPrescriptions = visits.reduce((sum, v) => sum + v.prescriptions.length, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Welcome back, {user.name.split(' ')[0]}</h2>
        <p className="text-slate-400 text-sm mt-1">Here's a snapshot of your health record.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatCard icon={History} label="Total visits" value={visits.length} />
        <StatCard icon={Pill} label="Active prescriptions" value={totalPrescriptions} tone="amber" />
        <StatCard icon={FileText} label="Documents on file" value={2} tone="slate" />
        <StatCard icon={QrCode} label="QR status" value="Active" tone="teal" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card title="Most recent visit" className="lg:col-span-2" action={
          <Link to="/patient/timeline" className="text-sm text-teal-500 flex items-center gap-1 hover:underline">
            View timeline <ArrowRight size={14} />
          </Link>
        }>
          {visits[0] && (
            <div>
              <p className="text-sm text-slate-400">{formatDate(visits[0].date)} · {visits[0].clinicName}</p>
              <p className="font-medium text-ink mt-1">{visits[0].diagnosis}</p>
              <p className="text-sm text-slate-500 mt-2">{visits[0].notes}</p>
            </div>
          )}
        </Card>

        <Card title="Next follow-up">
          {nextFollowUp ? (
            <div>
              <p className="text-2xl font-semibold text-teal-500">{formatDate(nextFollowUp.followUp)}</p>
              <p className="text-sm text-slate-500 mt-2">{nextFollowUp.diagnosis} with {nextFollowUp.clinicianName}</p>
            </div>
          ) : (
            <p className="text-sm text-slate-400">No upcoming follow-ups scheduled.</p>
          )}
        </Card>
      </div>
    </div>
  )
}
