// Medical documents - list of saved docs + the OCR scanner to add new ones.
import React from 'react'
import { FileText } from 'lucide-react'
import Card from '../../components/common/Card'
import Badge from '../../components/common/Badge'
import EmptyState from '../../components/common/EmptyState'
import DocumentUploader from '../../components/patient/DocumentUploader'
import { useDocuments } from '../../controllers/patientController'
import { useAuth } from '../../controllers/authController.jsx'
import { formatDateTime } from '../../utils/formatters'

export default function MedicalDocuments() {
  const { user } = useAuth()
  const { docs, addDocument } = useDocuments()

  function handleSaved({ fileName, type, fields }) {
    addDocument({
      id: `d-${Date.now()}`, patientId: user.id, fileName, type,
      uploadedAt: new Date().toISOString(), status: 'confirmed', extractedFields: fields,
    })
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-semibold text-ink">Medical Documents</h2>
      <Card title="Scan a new document">
        <DocumentUploader actorName={user.name} onSaved={handleSaved} />
      </Card>

      <Card title="Saved documents">
        {docs.length === 0 ? (
          <EmptyState icon={FileText} title="No documents yet" description="Scanned documents will appear here." />
        ) : (
          <ul className="divide-y divide-slate-100 stagger-children">
            {docs.map(d => (
              <li key={d.id} className="py-3 flex items-center justify-between transition-colors duration-200 hover:bg-slate-50 -mx-2 px-2 rounded-md">
                <div>
                  <p className="text-sm font-medium text-ink">{d.fileName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{d.type} · {formatDateTime(d.uploadedAt)}</p>
                </div>
                <Badge tone="success">Confirmed</Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
