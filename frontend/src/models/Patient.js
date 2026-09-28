// Patient model - profile fields specific to patients
export function createPatient({ id, name, dob, gender, bloodGroup, phone, address, allergies = [], qrTokenId = null }) {
  return { id, name, dob, gender, bloodGroup, phone, address, allergies, qrTokenId }
}
