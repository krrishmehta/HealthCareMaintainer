// Regional Analysis - per-region case counts with disease/month filters.
// Any region+disease group below K=5 is suppressed, never shown as a number.
import React, { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MapPinned } from 'lucide-react'
import Card from '../../components/common/Card'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import Badge from '../../components/common/Badge'
import SuppressedData from '../../components/admin/SuppressedData'
import { useRegionalData } from '../../controllers/adminController'
import { useAuth } from '../../controllers/authController.jsx'

const DISEASES = ['All', 'Respiratory', 'Diabetes', 'Hypertension', 'Infectious']

export default function RegionalAnalysis() {
  const { user } = useAuth()
  const [disease, setDisease] = useState('All')
  const [month, setMonth] = useState('August 2026')
  const data = useRegionalData(user.name, { disease, month })

  if (!data) return <LoadingSpinner label="Applying privacy threshold…" />

  const filtered = disease === 'All' ? data : data.filter(d => d.disease === disease)
  const chartData = filtered.map(d => ({ region: d.region, cases: d.suppressed ? 0 : d.cases, suppressed: d.suppressed }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-ink flex items-center gap-2"><MapPinned size={20} className="text-teal-500" /> Regional Analysis</h2>
          <p className="text-slate-400 text-sm mt-1">Groups smaller than 5 cases are suppressed to protect privacy.</p>
        </div>
        <div className="flex gap-2">
          <select value={disease} onChange={(e) => setDisease(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:border-teal-500 outline-none">
            {DISEASES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={month} onChange={(e) => setMonth(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white focus:border-teal-500 outline-none">
            <option>August 2026</option>
            <option>July 2026</option>
            <option>June 2026</option>
          </select>
        </div>
      </div>

      <Card title="Cases by region">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E1E5E3" />
            <XAxis dataKey="region" tick={{ fontSize: 11, fill: '#8A9793' }} angle={-20} textAnchor="end" height={60} />
            <YAxis tick={{ fontSize: 12, fill: '#8A9793' }} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13, border: '1px solid #E1E5E3' }} formatter={(val, _n, props) => props.payload.suppressed ? ['Suppressed', 'Cases'] : [val, 'Cases']} />
            <Bar dataKey="cases" radius={[6, 6, 0, 0]}>
              {chartData.map((row, i) => <Cell key={i} fill={row.suppressed ? '#E1E5E3' : '#0F5C56'} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Region detail">
        <div className="overflow-x-auto thin-scroll">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-100">
                <th className="pb-2 font-medium">Region</th>
                <th className="pb-2 font-medium">Disease category</th>
                <th className="pb-2 font-medium">Cases</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((row, i) => (
                <tr key={i}>
                  <td className="py-2.5 font-medium text-ink">{row.region}</td>
                  <td className="py-2.5"><Badge tone="neutral">{row.disease}</Badge></td>
                  <td className="py-2.5">
                    {row.suppressed ? <SuppressedData compact /> : row.cases}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
