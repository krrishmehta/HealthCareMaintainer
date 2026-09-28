from database import *

class DoctorsOPT:
    def get_patient(id: int, session: Session):
        if id:
            stmt = select(doctors).where(doctors.id == id)
        else:
            return False
        
        patient_data = session.exec(stmt).first()
        return patient_data
    
    def insert_data(id: int, registration: str, session: Session):
        new_model = doctors(id=id, registration=registration)

        session.add(new_model)
        session.commit()
        session.refresh()