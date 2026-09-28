// Labeled text input with optional error message.
import React from 'react'

export default function Input({ label, error, className = '', ...props }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-ink mb-1.5">{label}</span>}
      <input
        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white
          ${error ? 'border-danger' : 'border-slate-200'}
          focus:border-teal-500 focus:shadow-[0_0_0_3px_rgba(87,104,85,0.12)] outline-none transition-all duration-200 ease-smooth ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-danger mt-1 block">{error}</span>}
    </label>
  )
}
