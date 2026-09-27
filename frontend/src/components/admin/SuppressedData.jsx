// SuppressedData - shown in place of any aggregate value below the K=5
// privacy threshold. Never renders the underlying count.
import React from 'react'
import { Lock } from 'lucide-react'
import { SUPPRESSED_MESSAGE } from '../../utils/privacy'

export default function SuppressedData({ compact = false }) {
  if (compact) {
    return <span className="inline-flex items-center gap-1 text-xs text-slate-400"><Lock size={12} /> Suppressed</span>
  }
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
      <Lock size={14} /> {SUPPRESSED_MESSAGE}
    </div>
  )
}
