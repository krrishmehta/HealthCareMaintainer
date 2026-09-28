// Clinician's document scanner - same OCR flow as patient's, for scanning
// documents on a patient's behalf during a visit.
import React, { useState } from 'react'
import { FileCheck2 } from 'lucide-react'
import Card from '../../components/common/Card'
import DocumentUploader from '../../components/patient/DocumentUploader'
import { useAuth } from '../../controllers/authController.jsx'

export default function DocumentScanner() {
  const { user } = useAuth()
  const [savedCount, setSavedCount] = useState(0)

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-xl font-semibold text-ink">Document Scanner</h2>
      <Card title="Scan a patient document" subtitle="JPG, PNG, or PDF — extracted fields can be edited before saving.">
        <DocumentUploader actorName={user.name} onSaved={() => setSavedCount(c => c + 1)} />
      </Card>
      {savedCount > 0 && (
        <div className="flex items-center gap-2 text-sm text-teal-600">
          <FileCheck2 size={16} /> {savedCount} document{savedCount > 1 ? 's' : ''} saved this session.
        </div>
      )}
    </div>
  )
}
