// Prescriptions - flattened list of every prescription across all visits.
import React from 'react'
import { Pill } from 'lucide-react'
import Card from '../../components/common/Card'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import { useHealthTimeline } from '../../controllers/patientController'
import { formatDate } from '../../utils/formatters'

export default function Prescriptions() {
  const visits = useHealthTimeline()
  if (!visits) return <LoadingSpinner label="Loading prescriptions…" />

  const rows = visits.flatMap(v => v.prescriptions.map(p => ({ ...p, date: v.date, doctor: v.clinicianName, diagnosis: v.diagnosis })))

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink mb-6">Prescriptions</h2>
      {rows.length === 0 ? (
        <EmptyState icon={Pill} title="No prescriptions yet" description="Prescriptions added by clinicians during a visit will show up here." />
      ) : (
        <Card>
          <div className="overflow-x-auto thin-scroll">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-medium">Drug</th>
                  <th className="pb-2 font-medium">Dosage</th>
                  <th className="pb-2 font-medium">Duration</th>
                  <th className="pb-2 font-medium">Prescribed by</th>
                  <th className="pb-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td className="py-2.5 font-medium text-ink">{r.drug}</td>
                    <td className="py-2.5 text-slate-500">{r.dosage}</td>
                    <td className="py-2.5 text-slate-500">{r.duration}</td>
                    <td className="py-2.5 text-slate-500">{r.doctor}</td>
                    <td className="py-2.5 text-slate-500">{formatDate(r.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  )
}
