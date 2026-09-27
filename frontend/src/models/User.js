// User model - shape of a logged-in account (patient, clinician, or admin)
export const ROLES = {
  PATIENT: 'patient',
  CLINICIAN: 'clinician',
  ADMIN: 'admin',
}

export function createUser({ id, name, email, role, clinicName = null, avatarColor = '#0F5C56' }) {
  return { id, name, email, role, clinicName, avatarColor }
}
