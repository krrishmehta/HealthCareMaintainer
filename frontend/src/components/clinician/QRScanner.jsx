// QRScanner - simulates scanning a QR (no camera access needed for the demo).
// Clinician can paste/type a token or use "Simulate scan" with a sample token.
import React, { useState } from 'react'
import { ScanLine, CheckCircle2, XCircle } from 'lucide-react'
import Button from '../common/Button'
import Input from '../common/Input'
import * as qrService from '../../services/qrService'

const SAMPLE_TOKEN = 'qr-tok-9F3D2A'

export default function QRScanner({ clinician, onScanned }) {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null) // { success, error }

  async function handleScan(rawValue) {
    setLoading(true)
    setResult(null)
    const res = await qrService.scanToken(rawValue, clinician)
    setLoading(false)
    setResult(res)
    if (res.success) onScanned(res.token)
  }

  return (
    <div className="max-w-md">
      <div className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center py-10 mb-4 transition-colors duration-300 hover:border-teal-300">
        <ScanLine size={30} className={`text-slate-300 mb-2 transition-transform duration-700 ${loading ? 'animate-pulse text-teal-400' : ''}`} />
        <p className="text-sm font-medium text-ink">Point the camera at the patient's QR</p>
        <p className="text-xs text-slate-400 mt-1">(Demo: no camera needed — simulate below)</p>
      </div>

      <Button className="w-full mb-3" onClick={() => handleScan(SAMPLE_TOKEN)} loading={loading}>
        Simulate scan (demo patient)
      </Button>

      <div className="flex gap-2">
        <Input placeholder="Or paste a QR token manually" value={value} onChange={(e) => setValue(e.target.value)} className="flex-1" />
        <Button variant="secondary" onClick={() => handleScan(value)} disabled={!value || loading}>Scan</Button>
      </div>

      {result && (
        <div className={`mt-4 flex items-center gap-2 text-sm animate-fadeInUp ${result.success ? 'text-teal-600' : 'text-danger'}`}>
          {result.success ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
          {result.success ? 'QR recognized. Proceeding to authorization.' : result.error}
        </div>
      )}
    </div>
  )
}
