// Add Visit - clinician logs diagnosis, symptoms, notes, treatment,
// prescriptions and follow-up for the currently unlocked patient.
import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Lock, Plus, Trash2 } from 'lucide-react'
import Card from '../../components/common/Card'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import EmptyState from '../../components/common/EmptyState'
import { useAuth } from '../../controllers/authController.jsx'
import { useToast } from '../../components/common/ToastContext'
import { addVisitForPatient } from '../../controllers/clinicianController'
import { DEMO_PATIENT } from '../../services/mockData'

export default function AddVisit() {
  const { user } = useAuth()
  const location = useLocation()
  const unlocked = Boolean(location.state?.patientId) // set after a successful QR+OTP unlock
  const { showToast } = useToast()

  const [diagnosis, setDiagnosis] = useState('')
  const [symptomsText, setSymptomsText] = useState('')
  const [notes, setNotes] = useState('')
  const [treatment, setTreatment] = useState('')
  const [followUp, setFollowUp] = useState('')
  const [prescriptions, setPrescriptions] = useState([{ drug: '', dosage: '', duration: '' }])
  const [submitted, setSubmitted] = useState(false)

  function updatePrescription(i, field, value) {
    setPrescriptions(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: value } : p))
  }
  function addPrescriptionRow() {
    setPrescriptions(prev => [...prev, { drug: '', dosage: '', duration: '' }])
  }
  function removePrescriptionRow(i) {
    setPrescriptions(prev => prev.filter((_, idx) => idx !== i))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addVisitForPatient({
      clinicianName: user.name,
      clinicName: user.clinicName || 'Independent Practice',
      patientId: DEMO_PATIENT.id,
      formData: {
        diagnosis,
        symptoms: symptomsText.split(',').map(s => s.trim()).filter(Boolean),
        notes,
        treatment,
        prescriptions: prescriptions.filter(p => p.drug.trim()),
        followUp: followUp || null,
      },
    })
    setSubmitted(true)
    showToast('Visit added to patient record.', 'success')
  }

  if (!unlocked) {
    return (
      <EmptyState
        icon={Lock}
        title="No record unlocked"
        description="Complete the Scan QR flow to unlock a patient's record before adding a visit."
        action={<Link to="/clinician/scan" className="text-sm text-teal-500 hover:underline">Go to Scan QR</Link>}
      />
    )
  }

  if (submitted) {
    return (
      <EmptyState
        icon={Plus}
        title="Visit recorded"
        description={`New visit saved for ${DEMO_PATIENT.name} and logged to the audit trail.`}
        action={<button onClick={() => setSubmitted(false)} className="text-sm text-teal-500 hover:underline">Add another visit</button>}
      />
    )
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-ink mb-1">Add Visit</h2>
      <p className="text-sm text-slate-400 mb-6">For {DEMO_PATIENT.name}</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Card title="Diagnosis & symptoms">
          <div className="space-y-4">
            <Input label="Diagnosis" required value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
            <Input label="Symptoms (comma-separated)" value={symptomsText} onChange={(e) => setSymptomsText(e.target.value)} placeholder="Fever, cough, fatigue" />
          </div>
        </Card>

        <Card title="Notes & treatment">
          <div className="space-y-4">
            <label className="block">
              <span className="block text-sm font-medium text-ink mb-1.5">Clinical notes</span>
              <textarea
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:border-teal-500 outline-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
            <Input label="Treatment" value={treatment} onChange={(e) => setTreatment(e.target.value)} />
            <Input label="Follow-up date (optional)" type="date" value={followUp} onChange={(e) => setFollowUp(e.target.value)} />
          </div>
        </Card>

        <Card title="Prescriptions" action={
          <button type="button" onClick={addPrescriptionRow} className="text-sm text-teal-500 flex items-center gap-1 hover:underline">
            <Plus size={14} /> Add drug
          </button>
        }>
          <div className="space-y-3">
            {prescriptions.map((p, i) => (
              <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end">
                <Input label={i === 0 ? 'Drug' : undefined} value={p.drug} onChange={(e) => updatePrescription(i, 'drug', e.target.value)} placeholder="Drug name" />
                <Input label={i === 0 ? 'Dosage' : undefined} value={p.dosage} onChange={(e) => updatePrescription(i, 'dosage', e.target.value)} placeholder="e.g. 1 tab twice daily" />
                <Input label={i === 0 ? 'Duration' : undefined} value={p.duration} onChange={(e) => updatePrescription(i, 'duration', e.target.value)} placeholder="e.g. 5 days" />
                <button type="button" onClick={() => removePrescriptionRow(i)} className="text-slate-300 hover:text-danger p-2.5">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </Card>

        <Button type="submit" className="w-full">Save visit</Button>
      </form>
    </div>
  )
}
