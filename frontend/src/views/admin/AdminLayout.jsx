import React from 'react'
import { LayoutDashboard, TrendingUp, MapPinned, ScrollText, Sparkles } from 'lucide-react'
import DashboardShell from '../../components/common/DashboardShell'

const NAV = [
  { to: '/admin/overview', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/disease-trends', label: 'Disease Trends', icon: TrendingUp },
  { to: '/admin/regional-analysis', label: 'Regional Analysis', icon: MapPinned },
  { to: '/admin/audit-logs', label: 'Audit Logs', icon: ScrollText },
  { to: '/admin/ai-summary', label: 'AI Trend Summary', icon: Sparkles },
]

export default function AdminLayout() {
  return <DashboardShell navItems={NAV} roleLabel="Admin" />
}
