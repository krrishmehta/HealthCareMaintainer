// Top bar shown above every dashboard - shows page title and current user.
import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../controllers/authController.jsx'
import { initials } from '../../utils/formatters'

export default function Topbar({ title }) {
  const { user, logout } = useAuth()
  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 animate-fadeIn">
      <h1 className="font-semibold text-lg text-ink">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-ink leading-none">{user?.name}</p>
          <p className="text-xs text-slate-400 mt-1 capitalize">{user?.role}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium transition-transform duration-200 ease-smooth hover:scale-105">
          {initials(user?.name || '?')}
        </div>
        <button onClick={logout} title="Log out" className="text-slate-400 hover:text-danger p-2 rounded-lg hover:bg-slate-50 transition-all duration-200 ease-smooth hover:-translate-y-0.5">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}
