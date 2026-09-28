// My QR - generate/regenerate/revoke the opaque access token.
import React, { useEffect, useState } from 'react'
import { RefreshCcw, ShieldOff, QrCode as QrIcon } from 'lucide-react'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'
import QRDisplay from '../../components/patient/QRDisplay'
import EmptyState from '../../components/common/EmptyState'
import { useAuth } from '../../controllers/authController.jsx'
import { useToast } from '../../components/common/ToastContext'
import * as qrService from '../../services/qrService'

export default function MyQR() {
  const { user } = useAuth()
  const [token, setToken] = useState(null)
  const [revoked, setRevoked] = useState(false)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const res = await qrService.generateToken(user)
      setLoading(false)
      if (res.success) setToken(res.token)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleRegenerate() {
    setLoading(true)
    const res = await qrService.regenerateToken(user, token)
    setLoading(false)
    if (res.success) {
      setToken(res.token)
      setRevoked(false)
      showToast('New QR generated. The old code no longer works.', 'success')
    }
  }

  async function handleRevoke() {
    setLoading(true)
    await qrService.revokeToken(user, token)
    setLoading(false)
    setRevoked(true)
    showToast('QR revoked. Clinicians can no longer scan it.', 'success')
  }

  return (
    <div className="max-w-lg space-y-6">
      <h2 className="text-xl font-semibold text-ink">My QR</h2>
      <Card title="Your access QR" subtitle="Contains only a random token — never any medical data.">
        {revoked ? (
          <EmptyState icon={ShieldOff} title="QR revoked" description="Generate a new one to restore clinician access." />
        ) : (
          <div className="flex flex-col items-center gap-4">
            <QRDisplay token={token || '…'} />
            <Badge tone={loading ? 'neutral' : 'success'}>{loading ? 'Updating…' : 'Active'}</Badge>
          </div>
        )}
        <div className="flex gap-2 mt-6 justify-center">
          <Button variant="secondary" onClick={handleRegenerate} loading={loading}>
            <RefreshCcw size={16} /> Regenerate
          </Button>
          <Button variant="danger" onClick={handleRevoke} loading={loading} disabled={revoked}>
            <ShieldOff size={16} /> Revoke
          </Button>
        </div>
      </Card>
      <Card title="How it works">
        <div className="flex items-start gap-3 text-sm text-slate-500">
          <QrIcon size={18} className="text-teal-500 mt-0.5 shrink-0" />
          <p>A clinician scans this code, then must send you an OTP that you approve before any record is shown. Regenerating or revoking instantly invalidates the previous code.</p>
        </div>
      </Card>
    </div>
  )
}
