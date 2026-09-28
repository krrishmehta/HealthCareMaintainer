// Basic accessible modal overlay.
import React from 'react'
import { X } from 'lucide-react'

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-4 animate-fadeIn" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-ink">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-ink transition-transform duration-200 hover:rotate-90">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
