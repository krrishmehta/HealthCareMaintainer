// One entry in the patient's health timeline - left-border accent shows sequence.
import React from 'react'
import { Stethoscope, ArrowRight } from 'lucide-react'
import Badge from '../common/Badge'
import { formatDate } from '../../utils/formatters'

export default function TimelineItem({ visit, isLast }) {
  return (
    <div className="relative pl-8 pb-8 animate-fadeInUp">
      {!isLast && <span className="absolute left-[9px] top-6 bottom-0 w-px bg-slate-200" />}
      <span className="absolute left-0 top-1 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center transition-transform duration-200 ease-smooth hover:scale-125">
        <Stethoscope size={11} className="text-white" />
      </span>

      <div className="bg-white border border-slate-200 rounded-lg p-4 card-hover">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-sm text-slate-400">{formatDate(visit.date)} · {visit.clinicName}</p>
          {visit.followUp && <Badge tone="warning">Follow-up {formatDate(visit.followUp)}</Badge>}
        </div>
        <p className="font-semibold text-ink mt-1.5">{visit.diagnosis}</p>
        <p className="text-sm text-slate-500 mt-1">Seen by {visit.clinicianName}</p>

        {visit.symptoms.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {visit.symptoms.map(s => <Badge key={s} tone="neutral">{s}</Badge>)}
          </div>
        )}

        <p className="text-sm text-slate-600 mt-3">{visit.notes}</p>

        <div className="flex items-center gap-2 mt-3 text-sm text-teal-600">
          <ArrowRight size={14} /> <span>{visit.treatment}</span>
        </div>

        {visit.prescriptions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 space-y-1">
            {visit.prescriptions.map((p, i) => (
              <p key={i} className="text-sm text-slate-500">
                <span className="font-medium text-ink">{p.drug}</span> — {p.dosage}, {p.duration}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
