// DocumentUploader - shared OCR flow: pick file -> scan -> edit extracted
// fields -> confirm -> save (+ audit log). Used by both patient and clinician.
import React, { useState, useRef } from 'react'
import { UploadCloud, FileCheck2, Loader2, Edit3 } from 'lucide-react'
import Button from '../common/Button'
import { scanDocument, saveDocument } from '../../services/ocrService'
import { useToast } from '../common/ToastContext'

const STAGES = { IDLE: 'idle', SCANNING: 'scanning', REVIEW: 'review', SAVING: 'saving', DONE: 'done' }

export default function DocumentUploader({ actorName, onSaved }) {
  const [stage, setStage] = useState(STAGES.IDLE)
  const [file, setFile] = useState(null)
  const [docType, setDocType] = useState('')
  const [fields, setFields] = useState({})
  const inputRef = useRef(null)
  const { showToast } = useToast()

  async function handleFile(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setStage(STAGES.SCANNING)
    const res = await scanDocument(f, actorName)
    if (res.success) {
      setDocType(res.docType)
      setFields(res.fields)
      setStage(STAGES.REVIEW)
    }
  }

  function updateField(key, value) {
    setFields(prev => ({ ...prev, [key]: value }))
  }

  async function handleConfirm() {
    setStage(STAGES.SAVING)
    await saveDocument(actorName, file.name)
    setStage(STAGES.DONE)
    showToast('Document saved and logged to audit trail.', 'success')
    onSaved?.({ fileName: file.name, type: docType, fields })
  }

  function reset() {
    setStage(STAGES.IDLE)
    setFile(null)
    setDocType('')
    setFields({})
    if (inputRef.current) inputRef.current.value = ''
  }

  if (stage === STAGES.IDLE) {
    return (
      <label className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer hover:border-teal-400 transition-colors">
        <UploadCloud size={28} className="text-slate-300 mb-2" />
        <p className="text-sm font-medium text-ink">Upload a document to scan</p>
        <p className="text-xs text-slate-400 mt-1">JPG, PNG or PDF</p>
        <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleFile} />
      </label>
    )
  }

  if (stage === STAGES.SCANNING) {
    return (
      <div className="border border-slate-200 rounded-lg flex flex-col items-center justify-center py-10">
        <Loader2 size={26} className="animate-spin text-teal-500 mb-3" />
        <p className="text-sm text-ink font-medium">Running OCR on {file.name}…</p>
        <p className="text-xs text-slate-400 mt-1">Extracting text and fields</p>
      </div>
    )
  }

  if (stage === STAGES.REVIEW) {
    return (
      <div className="border border-slate-200 rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <Edit3 size={16} className="text-teal-500" />
          <p className="font-medium text-ink text-sm">Review extracted data — {docType}</p>
        </div>
        <div className="space-y-3">
          {Object.entries(fields).map(([key, value]) => (
            <label key={key} className="block">
              <span className="text-xs text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <input
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-teal-500 outline-none"
                value={value}
                onChange={(e) => updateField(key, e.target.value)}
              />
            </label>
          ))}
        </div>
        <div className="flex gap-2 mt-5">
          <Button onClick={handleConfirm}>Confirm & save</Button>
          <Button variant="ghost" onClick={reset}>Cancel</Button>
        </div>
      </div>
    )
  }

  if (stage === STAGES.SAVING) {
    return (
      <div className="border border-slate-200 rounded-lg flex flex-col items-center justify-center py-10">
        <Loader2 size={26} className="animate-spin text-teal-500 mb-3" />
        <p className="text-sm text-ink font-medium">Saving document…</p>
      </div>
    )
  }

  return (
    <div className="border border-teal-200 bg-teal-50 rounded-lg flex flex-col items-center justify-center py-10">
      <FileCheck2 size={28} className="text-teal-500 mb-2" />
      <p className="text-sm font-medium text-ink">Saved — {file.name}</p>
      <button onClick={reset} className="text-sm text-teal-600 mt-2 hover:underline">Scan another document</button>
    </div>
  )
}
