// Admin overview - top-line anonymized stats + a category breakdown chart.
import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { Users, TrendingUp, MapPinned, ShieldCheck } from 'lucide-react'
import Card from '../../components/common/Card'
import StatCard from '../../components/common/StatCard'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import { useCategoryBreakdown } from '../../controllers/adminController'

const COLORS = ['#0F5C56', '#E8A33D', '#C4432B', '#5B6864', '#1F7A70']

export default function AdminOverview() {
  const breakdown = useCategoryBreakdown()
  if (!breakdown) return <LoadingSpinner label="Aggregating anonymized data…" />

  const totalCases = breakdown.reduce((s, b) => s + b.value, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-ink">Overview</h2>
        <p className="text-slate-400 text-sm mt-1">All figures are anonymized and aggregated. No individual records are shown here.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <StatCard icon={Users} label="Total reported cases" value={totalCases.toLocaleString()} />
        <StatCard icon={TrendingUp} label="Respiratory ↑ (30d)" value="18%" tone="amber" />
        <StatCard icon={MapPinned} label="Regions tracked" value={8} tone="slate" />
        <StatCard icon={ShieldCheck} label="Privacy threshold (K)" value={5} tone="teal" />
      </div>

      <Card title="Case categories" subtitle="Synthetic demo data">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie data={breakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} label>
              {breakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13, border: '1px solid #E1E5E3' }} />
            <Legend wrapperStyle={{ fontSize: 13 }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
