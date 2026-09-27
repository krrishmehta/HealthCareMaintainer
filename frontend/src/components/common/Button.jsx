// Reusable button with variant styles. Keeps interactive styling consistent.
import React from 'react'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'bg-teal-500 text-white hover:bg-teal-600 disabled:bg-slate-200 disabled:text-slate-400',
  secondary: 'bg-white text-teal-500 border border-teal-500 hover:bg-teal-50',
  ghost: 'bg-transparent text-ink hover:bg-slate-50',
  danger: 'bg-danger text-white hover:opacity-90',
}

export default function Button({ children, variant = 'primary', loading = false, className = '', ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-smooth hover:-translate-y-0.5 active:translate-y-0 btn-press disabled:cursor-not-allowed disabled:hover:translate-y-0 ${VARIANTS[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  )
}
