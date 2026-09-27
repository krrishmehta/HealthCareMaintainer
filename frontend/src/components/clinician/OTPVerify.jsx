// OTPVerify - clinician enters the OTP the patient shares with them.
// Shows valid / invalid / expired states clearly. The demo code is shown
// in an amber banner labeled "for demo purposes only" since there's no
// real SMS/push channel in this hackathon build.
import React, { useState, useEffect } from 'react'
import { ShieldCheck, Clock, XCircle } from 'lucide-react'
import Button from '../common/Button'
import Input from '../common/Input'
import Badge from '../common/Badge'
import * as otpService from '../../services/otpService'
import { OTP_TTL_SECONDS } from '../../utils/constants'

export default function OTPVerify({ clinician, patientName, onVerified }) {
  const [demoCode, setDemoCode] = useState(null)
  const [secondsLeft, setSecondsLeft] = useState(OTP_TTL_SECONDS)
  const [entered, setEntered] = useState('')
  const [status, setStatus] = useState(null) // 'invalid' | 'expired' | null
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const res = await otpService.sendOtp(patientName)
      if (res.success) setDemoCode(res.demoCode)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (secondsLeft <= 0) return
    const t = setInterval(() => setSecondsLeft(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [secondsLeft])

  async function handleVerify() {
    setLoading(true)
    const res = await otpService.verifyOtp(entered, clinician.name)
    setLoading(false)
    if (res.success) {
      onVerified()
    } else {
      setStatus(res.status)
    }
  }

  const expired = secondsLeft <= 0

  return (
    <div className="max-w-md">
      <div className="bg-amber-100 text-amber-500 rounded-lg p-3 text-sm mb-4 flex items-center justify-between">
        <span>Demo OTP for {patientName}: <strong className="font-mono">{demoCode || '……'}</strong></span>
        <span className="flex items-center gap-1 text-xs"><Clock size={13} /> {Math.max(secondsLeft, 0)}s</span>
      </div>

      <Input
        label="Enter the OTP the patient shared"
        value={entered}
        onChange={(e) => setEntered(e.target.value)}
        maxLength={6}
        placeholder="6-digit code"
      />

      {status === 'invalid' && (
        <div className="flex items-center gap-2 text-sm text-danger mt-3">
          <XCircle size={16} /> Incorrect OTP. Please check with the patient and try again.
        </div>
      )}
      {(status === 'expired' || expired) && (
        <div className="flex items-center gap-2 text-sm text-danger mt-3">
          <XCircle size={16} /> OTP expired. Please rescan the patient's QR to request a new one.
        </div>
      )}

      <Button className="w-full mt-4" onClick={handleVerify} loading={loading} disabled={expired || entered.length < 4}>
        <ShieldCheck size={16} /> Verify & unlock record
      </Button>
    </div>
  )
}
