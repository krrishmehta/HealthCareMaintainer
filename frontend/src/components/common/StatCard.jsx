// Compact metric card used across dashboards
import React from 'react'

export default function StatCard({ icon: Icon, label, value, tone = 'teal' }) {
  const toneMap = {
    teal: 'bg-teal-50 text-teal-500',
    amber: 'bg-amber-100 text-amber-500',
    slate: 'bg-slate-50 text-slate-600',
  }
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 flex items-center gap-4 card-hover animate-fadeInUp group">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center transition-transform duration-300 ease-smooth group-hover:scale-110 ${toneMap[tone]}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-2xl font-semibold text-ink leading-none">{value}</p>
        <p className="text-sm text-slate-400 mt-1">{label}</p>
      </div>
    </div>
  )
}
