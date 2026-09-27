import React from 'react'
import { LayoutDashboard, ScanLine, Users, FolderHeart, FileText, PlusCircle, ScrollText, User } from 'lucide-react'
import DashboardShell from '../../components/common/DashboardShell'

const NAV = [
  { to: '/clinician/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/clinician/scan', label: 'Scan QR', icon: ScanLine },
  { to: '/clinician/recent-patients', label: 'Recent Patients', icon: Users },
  { to: '/clinician/records', label: 'Patient Records', icon: FolderHeart },
  { to: '/clinician/scanner', label: 'Document Scanner', icon: FileText },
  { to: '/clinician/add-visit', label: 'Add Visit', icon: PlusCircle },
  { to: '/clinician/audit-logs', label: 'Audit Logs', icon: ScrollText },
  { to: '/clinician/profile', label: 'Profile', icon: User },
]

export default function ClinicianLayout() {
  return <DashboardShell navItems={NAV} roleLabel="Clinician" />
}
