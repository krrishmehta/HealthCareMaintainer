// clinicianController - data-access hooks for clinician views.
import { useState, useEffect } from 'react'
import { DEMO_RECENT_PATIENTS, DEMO_PATIENT, DEMO_VISITS } from '../services/mockData'
import { createVisit } from '../models/Visit'
import { logAction } from '../services/auditService'
import { AUDIT_ACTIONS } from '../utils/constants'

export function useRecentPatients() {
  const [patients, setPatients] = useState(null)
  useEffect(() => {
    const t = setTimeout(() => setPatients(DEMO_RECENT_PATIENTS), 350)
    return () => clearTimeout(t)
  }, [])
  return patients
}

// After OTP verification, this resolves the token to the (mock) patient record
export function useUnlockedPatientRecord(unlocked) {
  const [record, setRecord] = useState(null)
  useEffect(() => {
    if (!unlocked) return
    const t = setTimeout(() => setRecord({ patient: DEMO_PATIENT, visits: DEMO_VISITS }), 400)
    return () => clearTimeout(t)
  }, [unlocked])
  return record
}

export function addVisitForPatient({ clinicianName, clinicName, patientId, formData }) {
  const visit = createVisit({
    id: `v-${Date.now()}`,
    patientId,
    date: new Date().toISOString().slice(0, 10),
    clinicianName,
    clinicName,
    ...formData,
  })
  logAction({ actor: clinicianName, action: AUDIT_ACTIONS.VISIT_ADD, target: patientId })
  if (formData.prescriptions?.length) {
    logAction({ actor: clinicianName, action: AUDIT_ACTIONS.PRESCRIPTION_ADD, target: patientId })
  }
  return visit
}
