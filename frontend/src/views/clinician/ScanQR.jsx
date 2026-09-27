// Scan QR flow - Scan QR -> Clinician authorization -> Patient OTP -> Verify -> Record.
// The QR alone never exposes records; only a verified OTP does.
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, ArrowRight } from 'lucide-react'
import QRScanner from '../../components/clinician/QRScanner'
import OTPVerify from '../../components/clinician/OTPVerify'
import Button from '../../components/common/Button'
import { useAuth } from '../../controllers/authController.jsx'
import { useToast } from '../../components/common/ToastContext'
import { DEMO_PATIENT } from '../../services/mockData'

const STEPS = ['Scan QR', 'Authorization', 'Patient OTP', 'Record']

export default function ScanQR() {
  const { user } = useAuth()
  const [step, setStep] = useState(0)
  const [token, setToken] = useState(null)
  const { showToast } = useToast()
  const navigate = useNavigate()

  function handleScanned(tok) {
    setToken(tok)
    setStep(1)
  }

  function handleAuthorize() {
    setStep(2)
  }

  function handleVerified() {
    showToast('Access granted — record unlocked.', 'success')
    navigate('/clinician/records', { state: { patientId: DEMO_PATIENT.id } })
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink mb-2">Scan QR</h2>
      <div className="flex items-center gap-2 mb-8 text-xs">
        {STEPS.map((s, i) => (
          <React.Fragment key={s}>
            <span className={`px-2.5 py-1 rounded-full font-medium ${i <= step ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-400'}`}>{s}</span>
            {i < STEPS.length - 1 && <span className="text-slate-300">—</span>}
          </React.Fragment>
        ))}
      </div>

      {step === 0 && <QRScanner clinician={user} onScanned={handleScanned} />}

      {step === 1 && (
        <div className="max-w-md bg-white border border-slate-200 rounded-lg p-6">
          <ShieldCheck size={26} className="text-teal-500 mb-3" />
          <h3 className="font-semibold text-ink mb-1">Confirm clinician authorization</h3>
          <p className="text-sm text-slate-500 mb-5">
            By continuing, you confirm you are treating this patient and are authorized to request access. This action is logged.
          </p>
          <Button onClick={handleAuthorize} className="w-full">
            I confirm, request patient OTP <ArrowRight size={16} />
          </Button>
        </div>
      )}

      {step === 2 && <OTPVerify clinician={user} patientName={DEMO_PATIENT.name} onVerified={handleVerified} />}
    </div>
  )
}
