// Small status pill - used for OTP/QR states, document status, audit results.
import React from 'react'

const TONES = {
  success: 'bg-teal-50 text-teal-600',
  warning: 'bg-amber-100 text-amber-500',
  danger: 'bg-red-50 text-danger',
  neutral: 'bg-slate-50 text-slate-600',
}

export default function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-transform duration-200 ease-smooth hover:scale-105 animate-fadeIn ${TONES[tone]} ${className}`}>
      {children}
    </span>
  )
}
