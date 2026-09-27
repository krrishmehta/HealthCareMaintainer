// Disease Trends - monthly aggregate case counts by category, with filters.
import React, { useState } from 'react'
import Card from '../../components/common/Card'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import TrendChart from '../../components/admin/TrendChart'
import { useDiseaseTrends } from '../../controllers/adminController'

const CATEGORIES = ['All', 'Respiratory', 'Diabetes', 'Hypertension', 'Infectious']

export default function DiseaseTrends() {
  const data = useDiseaseTrends()
  const [category, setCategory] = useState('All')

  if (!data) return <LoadingSpinner label="Loading disease trends…" />

  const filtered = category === 'All'
    ? data
    : data.map(row => ({ month: row.month, [category]: row[category] }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold text-ink">Disease Trends</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:border-teal-500 outline-none"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <Card title="Monthly aggregate cases" subtitle="Synthetic demo data · Mar–Aug 2026">
        <TrendChart data={filtered} />
      </Card>
    </div>
  )
}
