from database import *

class PatientsOPT:
    def get_patient(id: int, session: Session):
        if id:
            stmt = select(patients).where(patients.id == id)
        else:
            return False
        
        patient_data = session.exec(stmt).first()
        return patient_data
    
    def insert_data(id: int, blood: str, session: Session):
        new_model = patients(id=id, blood=blood)

        session.add(new_model)
        session.commit()
        session.refresh()