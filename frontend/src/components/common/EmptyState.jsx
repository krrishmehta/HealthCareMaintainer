// Empty-state placeholder - invites the next action rather than just saying "nothing here".
import React from 'react'

export default function EmptyState({ icon: Icon, title, description, action = null }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-4 animate-fadeInUp">
      {Icon && <Icon size={36} className="text-slate-300 mb-3 animate-fadeIn" />}
      <h4 className="font-medium text-ink">{title}</h4>
      {description && <p className="text-sm text-slate-400 mt-1 max-w-sm">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
