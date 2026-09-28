// Patient settings - notification + privacy toggles (mock, local state only).
import React, { useState } from 'react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import { useToast } from '../../components/common/ToastContext'

export default function PatientSettings() {
  const [notifyOtp, setNotifyOtp] = useState(true)
  const [notifyVisit, setNotifyVisit] = useState(true)
  const { showToast } = useToast()

  function save() {
    showToast('Settings saved.', 'success')
  }

  return (
    <div className="max-w-lg space-y-6">
      <h2 className="text-xl font-semibold text-ink">Settings</h2>
      <Card title="Notifications">
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-sm text-ink">Notify me when a clinician requests OTP access</span>
            <input type="checkbox" checked={notifyOtp} onChange={(e) => setNotifyOtp(e.target.checked)} className="w-4 h-4 accent-teal-500" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-ink">Notify me when a new visit is added</span>
            <input type="checkbox" checked={notifyVisit} onChange={(e) => setNotifyVisit(e.target.checked)} className="w-4 h-4 accent-teal-500" />
          </label>
        </div>
      </Card>
      <Button onClick={save}>Save settings</Button>
    </div>
  )
}
