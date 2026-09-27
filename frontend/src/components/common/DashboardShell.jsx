// Shared shell: sidebar + topbar + scrollable content area for role dashboards.
// The topbar title is derived from whichever nav item matches the current path.
import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardShell({ navItems, roleLabel }) {
  const { pathname } = useLocation()
  const active = [...navItems].sort((a, b) => b.to.length - a.to.length).find(i => pathname.startsWith(i.to))

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={navItems} roleLabel={roleLabel} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={active?.label || 'MediChain'} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div key={pathname} className="page-fade">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
