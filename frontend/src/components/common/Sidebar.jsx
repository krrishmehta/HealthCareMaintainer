// Role-aware sidebar navigation for dashboard layouts.
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Activity } from 'lucide-react'

export default function Sidebar({ items, roleLabel }) {
  return (
    <aside className="w-64 shrink-0 bg-teal-700 text-white min-h-screen flex flex-col animate-fadeIn">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/10 pulse-glow shrink-0">
          <Activity size={17} className="text-amber-400 transition-transform duration-500 ease-smooth hover:rotate-12" />
        </span>
        <div>
          <p className="font-semibold leading-none">MediChain</p>
          <p className="text-xs text-teal-100/70 mt-1">{roleLabel}</p>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto thin-scroll stagger-children">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ease-smooth ${
                isActive
                  ? 'bg-white/10 text-white font-medium translate-x-0.5'
                  : 'text-teal-100/80 hover:bg-white/5 hover:text-white hover:translate-x-1'
              }`
            }
          >
            <Icon size={18} className="transition-transform duration-200 ease-smooth group-hover:scale-110 group-hover:-rotate-6" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
