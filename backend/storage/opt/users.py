from database import *
from typing import Literal

class UsersOPT:
    def get_user(id: int, email: str, session: Session):
        if id:
            stmt = select(users).where(users.id == id)
        elif email:
            stmt = select(users).where(users.email == email)
        else:
            return None
        
        user_data = session.exec(stmt).first()
        return user_data
    
    def insert_user(
        email: str,
        password: str,
        name: str,
        dob: str,
        mobile: str,
        rbac: Literal["patient", "doctor", "administrator"],
        jti: str,
        session: Session
        ):
        new_model = users(email=email, password=password, name=name, mobile=mobile, dob=dob, rbac=rbac, jti=jti)
        
        session.add(new_model)
        session.commit()
        session.refresh()