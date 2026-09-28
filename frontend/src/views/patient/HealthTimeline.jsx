// Health timeline - chronological list of all visits, diagnoses, and treatments.
import React from 'react'
import { History } from 'lucide-react'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import EmptyState from '../../components/common/EmptyState'
import TimelineItem from '../../components/patient/TimelineItem'
import { useHealthTimeline } from '../../controllers/patientController'

export default function HealthTimeline() {
  const visits = useHealthTimeline()
  if (!visits) return <LoadingSpinner label="Loading your health timeline…" />

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-ink mb-6">Health Timeline</h2>
      {visits.length === 0 ? (
        <EmptyState icon={History} title="No visits yet" description="Your visit history will appear here once a clinician adds a record." />
      ) : (
        <div>
          {visits.map((v, i) => (
            <TimelineItem key={v.id} visit={v} isLast={i === visits.length - 1} />
          ))}
        </div>
      )}
    </div>
  )
}
