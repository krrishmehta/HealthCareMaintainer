// patientController - simple data-access hooks for patient views.
// Wraps mock data + services so views stay presentation-only.
import { useState, useEffect } from 'react'
import { DEMO_PATIENT, DEMO_VISITS, DEMO_DOCUMENTS } from '../services/mockData'
import { logAction } from '../services/auditService'
import { AUDIT_ACTIONS } from '../utils/constants'

export function usePatientProfile() {
  const [patient, setPatient] = useState(null)
  useEffect(() => {
    const t = setTimeout(() => setPatient(DEMO_PATIENT), 300)
    return () => clearTimeout(t)
  }, [])
  return patient
}

export function useHealthTimeline() {
  const [visits, setVisits] = useState(null)
  useEffect(() => {
    const t = setTimeout(() => setVisits(DEMO_VISITS), 400)
    return () => clearTimeout(t)
  }, [])
  return visits
}

export function useDocuments() {
  const [docs, setDocs] = useState(DEMO_DOCUMENTS)
  function addDocument(doc) {
    setDocs(prev => [doc, ...prev])
  }
  return { docs, addDocument }
}

export function viewRecordAudit(patientName) {
  logAction({ actor: patientName, action: AUDIT_ACTIONS.RECORD_VIEW, target: 'own-record' })
}
