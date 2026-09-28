from pydantic import BaseModel

class SignupData(BaseModel):
    email: str
    name: str
    dob: str
    mobile: str
    password: str | None
    rbac: str
    provider: str | None
    provider_uid: str | None
    blood: str | None
    registration: str | None
    
class LoginData(BaseModel):
    email: str
    password: str