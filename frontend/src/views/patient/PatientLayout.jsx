// Patient dashboard shell - defines the patient sidebar nav.
import React from 'react'
import { LayoutDashboard, User, History, Pill, FileText, QrCode, ScrollText, Settings } from 'lucide-react'
import DashboardShell from '../../components/common/DashboardShell'

const NAV = [
  { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/patient/profile', label: 'Profile', icon: User },
  { to: '/patient/timeline', label: 'Health Timeline', icon: History },
  { to: '/patient/prescriptions', label: 'Prescriptions', icon: Pill },
  { to: '/patient/documents', label: 'Medical Documents', icon: FileText },
  { to: '/patient/qr', label: 'My QR', icon: QrCode },
  { to: '/patient/audit-logs', label: 'Audit Logs', icon: ScrollText },
  { to: '/patient/settings', label: 'Settings', icon: Settings },
]

export default function PatientLayout() {
  return <DashboardShell navItems={NAV} roleLabel="Patient" />
}
