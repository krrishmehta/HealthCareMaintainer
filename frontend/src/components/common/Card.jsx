// Simple content card - used as the base container across dashboards.
import React from 'react'

export default function Card({ children, className = '', title = null, subtitle = null, action = null }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-5 card-hover animate-fadeInUp ${className}`}>
      {(title || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && <h3 className="font-semibold text-ink">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
