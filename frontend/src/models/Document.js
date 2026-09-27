// Document model - an uploaded/OCR-scanned medical document
export function createDocument({ id, patientId, fileName, type, uploadedAt, status, extractedFields = {} }) {
  return { id, patientId, fileName, type, uploadedAt, status, extractedFields }
}
