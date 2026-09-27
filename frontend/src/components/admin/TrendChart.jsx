// TrendChart - multi-line Recharts chart of disease category counts over time.
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = { Respiratory: '#0F5C56', Diabetes: '#E8A33D', Hypertension: '#C4432B', Infectious: '#5B6864' }

export default function TrendChart({ data }) {
  const categories = Object.keys(data[0]).filter(k => k !== 'month')
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E1E5E3" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8A9793' }} />
        <YAxis tick={{ fontSize: 12, fill: '#8A9793' }} />
        <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13, border: '1px solid #E1E5E3' }} />
        <Legend wrapperStyle={{ fontSize: 13 }} />
        {categories.map(cat => (
          <Line key={cat} type="monotone" dataKey={cat} stroke={COLORS[cat] || '#0F5C56'} strokeWidth={2.5} dot={{ r: 3 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}
