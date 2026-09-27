// Central mock/demo dataset. In a real deployment this file is replaced by
// real API calls (see apiService.js) - nothing here talks to a backend.
import { createUser } from '../models/User'
import { createPatient } from '../models/Patient'
import { createVisit } from '../models/Visit'
import { createDocument } from '../models/Document'

export const DEMO_USERS = [
  createUser({ id: 'u-p1', name: 'Ananya Rao', email: 'patient@demo.com', role: 'patient' }),
  createUser({ id: 'u-c1', name: 'Dr. Rohan Mehta', email: 'clinician@demo.com', role: 'clinician', clinicName: 'LinkCode Family Clinic' }),
  createUser({ id: 'u-a1', name: 'System Admin', email: 'admin@demo.com', role: 'admin' }),
]

// Passwords are mock-only, never validated against a real store
export const DEMO_CREDENTIALS = {
  'patient@demo.com': 'patient123',
  'clinician@demo.com': 'clinician123',
  'admin@demo.com': 'admin123',
}

export const DEMO_PATIENT = createPatient({
  id: 'u-p1',
  name: 'Ananya Rao',
  dob: '1994-03-12',
  gender: 'Female',
  bloodGroup: 'O+',
  phone: '+91 98765 43210',
  address: 'Baner, Pune, Maharashtra',
  allergies: ['Penicillin', 'Dust'],
  qrTokenId: 'qr-tok-9F3D2A',
})

export const DEMO_VISITS = [
  createVisit({
    id: 'v-1', patientId: 'u-p1', date: '2026-08-14',
    clinicianName: 'Dr. Rohan Mehta', clinicName: 'LinkCode Family Clinic',
    diagnosis: 'Seasonal Allergic Rhinitis', symptoms: ['Sneezing', 'Runny nose', 'Itchy eyes'],
    notes: 'Symptoms worsen with dust exposure. Advised allergy panel if recurrent.',
    treatment: 'Antihistamines, saline nasal spray',
    prescriptions: [{ drug: 'Cetirizine 10mg', dosage: '1 tablet at night', duration: '7 days' }],
    followUp: '2026-08-28',
  }),
  createVisit({
    id: 'v-2', patientId: 'u-p1', date: '2026-06-02',
    clinicianName: 'Dr. Meera Iyer', clinicName: 'City Care Hospital',
    diagnosis: 'Viral Fever', symptoms: ['Fever', 'Body ache', 'Fatigue'],
    notes: 'Resolved within 4 days, no complications.',
    treatment: 'Rest, hydration, paracetamol',
    prescriptions: [{ drug: 'Paracetamol 650mg', dosage: '1 tablet every 6 hrs', duration: '4 days' }],
    followUp: null,
  }),
  createVisit({
    id: 'v-3', patientId: 'u-p1', date: '2026-02-20',
    clinicianName: 'Dr. Rohan Mehta', clinicName: 'LinkCode Family Clinic',
    diagnosis: 'Routine Checkup', symptoms: [],
    notes: 'Annual physical, all vitals normal.',
    treatment: 'No treatment required',
    prescriptions: [],
    followUp: '2027-02-20',
  }),
]

export const DEMO_DOCUMENTS = [
  createDocument({
    id: 'd-1', patientId: 'u-p1', fileName: 'blood_test_aug2026.pdf', type: 'Lab Report',
    uploadedAt: '2026-08-15T10:22:00', status: 'confirmed',
    extractedFields: { testName: 'CBC + Lipid Profile', hemoglobin: '13.2 g/dL', cholesterol: '188 mg/dL' },
  }),
  createDocument({
    id: 'd-2', patientId: 'u-p1', fileName: 'prescription_scan.jpg', type: 'Prescription',
    uploadedAt: '2026-08-14T11:05:00', status: 'confirmed',
    extractedFields: { drug: 'Cetirizine 10mg', doctor: 'Dr. Rohan Mehta' },
  }),
]

// Recent patients seen by the demo clinician, for the clinician dashboard
export const DEMO_RECENT_PATIENTS = [
  { id: 'u-p1', name: 'Ananya Rao', lastVisit: '2026-08-14', condition: 'Allergic Rhinitis' },
  { id: 'u-p2', name: 'Vikram Shah', lastVisit: '2026-08-12', condition: 'Type 2 Diabetes' },
  { id: 'u-p3', name: 'Fatima Sheikh', lastVisit: '2026-08-10', condition: 'Hypertension' },
  { id: 'u-p4', name: 'Karan Malhotra', lastVisit: '2026-08-05', condition: 'Migraine' },
]

// --- Admin aggregate demo data (synthetic, never patient-identifiable) ---

export const DISEASE_TREND_DATA = [
  { month: 'Mar', Respiratory: 42, Diabetes: 28, Hypertension: 35, Infectious: 18 },
  { month: 'Apr', Respiratory: 38, Diabetes: 30, Hypertension: 36, Infectious: 22 },
  { month: 'May', Respiratory: 45, Diabetes: 31, Hypertension: 34, Infectious: 27 },
  { month: 'Jun', Respiratory: 60, Diabetes: 33, Hypertension: 37, Infectious: 41 },
  { month: 'Jul', Respiratory: 71, Diabetes: 34, Hypertension: 38, Infectious: 52 },
  { month: 'Aug', Respiratory: 84, Diabetes: 35, Hypertension: 40, Infectious: 58 },
]

// Regional case counts - some deliberately below K=5 to demo suppression
export const REGIONAL_DATA = [
  { region: 'Pune City', cases: 132, disease: 'Respiratory' },
  { region: 'Pimpri-Chinchwad', cases: 87, disease: 'Respiratory' },
  { region: 'Hinjewadi', cases: 4, disease: 'Respiratory' },
  { region: 'Baner', cases: 56, disease: 'Diabetes' },
  { region: 'Wagholi', cases: 3, disease: 'Infectious' },
  { region: 'Kothrud', cases: 61, disease: 'Hypertension' },
  { region: 'Hadapsar', cases: 2, disease: 'Infectious' },
  { region: 'Viman Nagar', cases: 49, disease: 'Diabetes' },
]

export const CATEGORY_BREAKDOWN = [
  { name: 'Respiratory', value: 340 },
  { name: 'Diabetes', value: 191 },
  { name: 'Hypertension', value: 220 },
  { name: 'Infectious', value: 218 },
  { name: 'Other', value: 96 },
]

export const AI_SUMMARY_TEXT =
  'Respiratory disease cases increased by 18% over the last 30 days, concentrated in Pune City and Pimpri-Chinchwad. Hypertension cases remained stable. Infectious disease reports rose sharply during June–July, consistent with seasonal monsoon patterns. No region-level anomaly exceeds the reporting threshold this month.'
