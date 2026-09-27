// QRDisplay - renders the patient's opaque QR token as an actual scannable
// QR code (qrcode.react). The QR value is ONLY the token string - never
// any medical data.
import React from 'react'
import { QRCodeSVG } from 'qrcode.react'

export default function QRDisplay({ token, size = 200 }) {
  return (
    <div className="inline-flex flex-col items-center p-5 bg-white border border-slate-200 rounded-lg animate-scaleIn card-hover">
      <QRCodeSVG value={token} size={size} fgColor="#252B21" />
      <p className="text-xs text-slate-400 mt-3 font-mono">{token}</p>
    </div>
  )
}
