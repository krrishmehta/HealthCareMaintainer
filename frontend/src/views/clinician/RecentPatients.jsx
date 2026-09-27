// Recent patients seen by this clinician - list view.
import React from 'react'
import { Link } from 'react-router-dom'
import { Users } from 'lucide-react'
import Card from '../../components/common/Card'
import EmptyState from '../../components/common/EmptyState'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { useRecentPatients } from '../../controllers/clinicianController'
import { formatDate } from '../../utils/formatters'

export default function RecentPatients() {
  const patients = useRecentPatients()
  if (!patients) return <LoadingSpinner label="Loading recent patients…" />

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink mb-6">Recent Patients</h2>
      {patients.length === 0 ? (
        <EmptyState icon={Users} title="No patients yet" description="Patients you've seen will appear here after their first visit." />
      ) : (
        <Card>
          <ul className="divide-y divide-slate-100 stagger-children">
            {patients.map(p => (
              <li key={p.id} className="py-3 flex items-center justify-between transition-colors duration-200 hover:bg-slate-50 -mx-2 px-2 rounded-md">
                <div>
                  <p className="font-medium text-ink text-sm">{p.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.condition} · Last visit {formatDate(p.lastVisit)}</p>
                </div>
                <Link to="/clinician/scan" className="text-sm text-teal-500 hover:underline transition-colors duration-200">Scan to access</Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  )
}
