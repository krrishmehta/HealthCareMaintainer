// AppRoutes - central route table. Keeps App.jsx tiny.
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import { ROLES } from '../utils/constants'

import LandingPage from '../views/LandingPage'
import LoginPage from '../views/LoginPage'
import RegisterPage from '../views/RegisterPage'
import NotFoundPage from '../views/NotFoundPage'
import UnauthorizedPage from '../views/UnauthorizedPage'

import PatientLayout from '../views/patient/PatientLayout'
import PatientDashboard from '../views/patient/PatientDashboard'
import PatientProfile from '../views/patient/PatientProfile'
import HealthTimeline from '../views/patient/HealthTimeline'
import Prescriptions from '../views/patient/Prescriptions'
import MedicalDocuments from '../views/patient/MedicalDocuments'
import MyQR from '../views/patient/MyQR'
import PatientAuditLogs from '../views/patient/PatientAuditLogs'
import PatientSettings from '../views/patient/PatientSettings'

import ClinicianLayout from '../views/clinician/ClinicianLayout'
import ClinicianDashboard from '../views/clinician/ClinicianDashboard'
import ScanQR from '../views/clinician/ScanQR'
import RecentPatients from '../views/clinician/RecentPatients'
import PatientRecords from '../views/clinician/PatientRecords'
import DocumentScanner from '../views/clinician/DocumentScanner'
import AddVisit from '../views/clinician/AddVisit'
import ClinicianAuditLogs from '../views/clinician/ClinicianAuditLogs'
import ClinicianProfile from '../views/clinician/ClinicianProfile'

import AdminLayout from '../views/admin/AdminLayout'
import AdminOverview from '../views/admin/AdminOverview'
import DiseaseTrends from '../views/admin/DiseaseTrends'
import RegionalAnalysis from '../views/admin/RegionalAnalysis'
import AdminAuditLogs from '../views/admin/AdminAuditLogs'
import AITrendSummary from '../views/admin/AITrendSummary'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/403" element={<UnauthorizedPage />} />

      <Route
        path="/patient"
        element={<ProtectedRoute allowedRoles={[ROLES.PATIENT]}><PatientLayout /></ProtectedRoute>}
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PatientDashboard />} />
        <Route path="profile" element={<PatientProfile />} />
        <Route path="timeline" element={<HealthTimeline />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="documents" element={<MedicalDocuments />} />
        <Route path="qr" element={<MyQR />} />
        <Route path="audit-logs" element={<PatientAuditLogs />} />
        <Route path="settings" element={<PatientSettings />} />
      </Route>

      <Route
        path="/clinician"
        element={<ProtectedRoute allowedRoles={[ROLES.CLINICIAN]}><ClinicianLayout /></ProtectedRoute>}
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ClinicianDashboard />} />
        <Route path="scan" element={<ScanQR />} />
        <Route path="recent-patients" element={<RecentPatients />} />
        <Route path="records" element={<PatientRecords />} />
        <Route path="scanner" element={<DocumentScanner />} />
        <Route path="add-visit" element={<AddVisit />} />
        <Route path="audit-logs" element={<ClinicianAuditLogs />} />
        <Route path="profile" element={<ClinicianProfile />} />
      </Route>

      <Route
        path="/admin"
        element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]}><AdminLayout /></ProtectedRoute>}
      >
        <Route index element={<Navigate to="overview" replace />} />
        <Route path="overview" element={<AdminOverview />} />
        <Route path="disease-trends" element={<DiseaseTrends />} />
        <Route path="regional-analysis" element={<RegionalAnalysis />} />
        <Route path="audit-logs" element={<AdminAuditLogs />} />
        <Route path="ai-summary" element={<AITrendSummary />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
