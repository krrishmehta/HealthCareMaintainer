// Full-width loading state used while mock data "loads".
import React from 'react'
import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3 animate-fadeIn">
      <Loader2 size={28} className="animate-spin text-teal-500" />
      <p className="text-sm animate-pulse">{label}</p>
    </div>
  )
}
