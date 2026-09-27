// Shared audit log table - used by patient, clinician, and admin audit views.
import React from 'react'
import { ScrollText } from 'lucide-react'
import Card from './Card'
import Badge from './Badge'
import EmptyState from './EmptyState'
import { formatDateTime } from '../../utils/formatters'

export default function AuditLogTable({ logs }) {
  if (!logs || logs.length === 0) {
    return <EmptyState icon={ScrollText} title="No activity yet" description="Sensitive actions like QR scans, OTP checks, and record views will be logged here." />
  }

  return (
    <Card>
      <div className="overflow-x-auto thin-scroll">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              <th className="pb-2 font-medium">Timestamp</th>
              <th className="pb-2 font-medium">Actor</th>
              <th className="pb-2 font-medium">Action</th>
              <th className="pb-2 font-medium">Target</th>
              <th className="pb-2 font-medium">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 stagger-children">
            {logs.map(l => (
              <tr key={l.id} className="transition-colors duration-200 hover:bg-slate-50">
                <td className="py-2.5 text-slate-500 whitespace-nowrap">{formatDateTime(l.timestamp)}</td>
                <td className="py-2.5 text-ink font-medium whitespace-nowrap">{l.actor}</td>
                <td className="py-2.5 text-slate-500">{l.action.replace(/_/g, ' ')}</td>
                <td className="py-2.5 text-slate-400 truncate max-w-[220px]">{l.target}</td>
                <td className="py-2.5">
                  <Badge tone={l.result === 'success' ? 'success' : 'danger'}>{l.result}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
