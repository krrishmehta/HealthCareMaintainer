// Visit model - one entry in a patient's health timeline
export function createVisit({
  id, patientId, date, clinicianName, clinicName,
  diagnosis, symptoms = [], notes, treatment,
  prescriptions = [], followUp = null,
}) {
  return {
    id, patientId, date, clinicianName, clinicName,
    diagnosis, symptoms, notes, treatment, prescriptions, followUp,
  }
}
