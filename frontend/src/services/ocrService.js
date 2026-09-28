// ocrService - simulates OCR extraction from an uploaded JPG/PNG/PDF.
// Returns plausible extracted fields the user can edit before confirming.
import { request } from './apiService'
import { logAction } from './auditService'
import { AUDIT_ACTIONS } from '../utils/constants'

const SAMPLE_EXTRACTIONS = [
  {
    docType: 'Lab Report',
    fields: { testName: 'Complete Blood Count', hemoglobin: '13.8 g/dL', wbcCount: '7200 /µL', platelets: '2.4 lakh/µL' },
  },
  {
    docType: 'Prescription',
    fields: { drug: 'Amoxicillin 500mg', dosage: '1 capsule twice daily', duration: '5 days', doctor: 'Dr. Rohan Mehta' },
  },
  {
    docType: 'Discharge Summary',
    fields: { admission: '2026-07-02', discharge: '2026-07-05', diagnosis: 'Acute Gastroenteritis', followUp: '2026-07-15' },
  },
]

export function scanDocument(file, actorName) {
  return request(() => {
    const sample = SAMPLE_EXTRACTIONS[Math.floor(Math.random() * SAMPLE_EXTRACTIONS.length)]
    logAction({ actor: actorName, action: AUDIT_ACTIONS.OCR_SCAN, target: file?.name || 'uploaded-file' })
    return { success: true, docType: sample.docType, fields: { ...sample.fields } }
  }, 1200) // longer delay to simulate real OCR processing
}

export function saveDocument(actorName, fileName) {
  return request(() => {
    logAction({ actor: actorName, action: AUDIT_ACTIONS.DOCUMENT_SAVE, target: fileName })
    return { success: true }
  }, 400)
}
