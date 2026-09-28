from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import timedelta, datetime, timezone
from typing import Optional

from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse, RedirectResponse

from datamodels.auth_models import *

from storage.database import *
from storage.opt.users import *
from storage.opt.oauth_acc import *
from storage.opt.patients import *
from storage.opt.doctors import *

from dotenv import load_dotenv, find_dotenv
import os


load_dotenv(find_dotenv())
pwd_context = CryptContext(schemes=["argon2"])
user_opt = UsersOPT()
oauth_acc = OAuthOPT()
patient_opt = PatientsOPT()
doctor_opt = DoctorsOPT()

class JWTToken:
    def verify_password(self, password:str, hashed_password:str) -> str:
        return pwd_context.verify(password, hashed_password)
    
    def hash_password(self, password:str) -> str:
        return pwd_context.hash(password)
    
    def create_jwt_token(self, user_data:dict, expire_time:Optional[timedelta] = None):
        to_encode = user_data.copy()
        expire = datetime.now(timezone.utc) + (expire_time if expire_time else timedelta(hours=1))
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, os.getenv("JWT_SECRET_KEY"), os.getenv("JWT_ALGORITHM"))
    
    def current_user(self, request: Request):
        auth = request.cookies.get("access_token")
        
        if not auth:
            return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access Denied")
        
        try:
            payload = jwt.decode(auth, os.getenv("JWT_SECRET_KEY"), os.getenv("JWT_ALGRORITHM"))
            uid: int = int(payload.get("sub"))
            role: str = str(payload.get("rbac"))

            if not uid:
                return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access Denied")
            
            return uid, role
        
        except JWTError as e:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access Denied")
        

class Login(JWTToken):
    def authenticate(self, data: LoginData, session: Session):
        email: str = data.email
        password: str = data.password
        jti: str = str(uuid4())[:8]
        
        user: users = user_opt.get_user(email=email, session=session)
        
        if not user:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
       
        if not self.verify_password(password, user.password):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Wrong Credentials")

        access_token = self.create_jwt_token(
           data = {
               'sub': str(user.id),
               'type': 'access',
               'rbac': str(user.rbac),
               'iat': time.time() * 1000,
           },
           expire_time = timedelta(minutes=30)
        )
       
        refresh_token = self.create_jwt_token(
            data = {
                'sub': str(user.id),
                'type': 'refresh',
                'rbac': str(user.rbac),
                'iat': time.time() * 1000,
                'jti': jti
            },
            expire_time = timedelta(days=14)
        )
        
        self.store_jti(jti, user, session)
        
        response = RedirectResponse("/dashboard", status_code=status.HTTP_200_OK)
        response.set_cookie(
            key="access_token",
            value=access_token,
            max_age=(60*30),
            httponly=True,
            secure=True,
            samesite='lax'
        )
        
        response.set_cookie(
            key="refresh_token",
            value=refresh_token,
            max_age=(60*60*24*14),
            httponly=True,
            secure=True,
            samesite='lax',
            path='/api/v1/auth/refresh'
        )
        
        return response

    def store_jti(self, jti: str, model: users, session: Session):
        model.jti = jti
        add_orm(model=model, session=session)
        

class Signup(JWTToken):
    def create_account(self, data: SignupData, session: Session):
        email: str = data.email
        name: str = data.name
        dob: str = data.dob
        mobile: str = data.mobile
        password: str = data.password
        rbac: str = data.rbac
        provider: str = data.provider
        provider_uid: str = data.provider_uid
        blood: str = data.blood
        registration: str = data.registration
        jti: str = str(uuid4())[:8]
        
        user: users = user_opt.get_user(email=email, session=session)
        if user:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User already registered")

        hashed_password = self.hash_password(password)
        
        new_user:users = user_opt.insert_user(
            email=email,
            password=password,
            name=name,
            dob=dob,
            mobile=mobile,
            rbac=rbac,
            jti=jti,
            session=session
        )
        
        try:
            if provider == "google":
                oauth_acc.insert_user(
                    user_id=new_user.id,
                    provider=provider,
                    provider_uid=provider_uid,
                    session=session
                )
                
            if rbac == "patient":
                patient_opt.insert_data(
                    id=new_user.id,
                    blood=blood,
                    session=session
                )
            
            elif rbac == "doctor":
                doctor_opt.insert_data(
                    id=new_user.id,
                    registration=registration,
                    session=session
                )
                
            else:
                return JSONResponse(content={
                    "status": False,
                    "message": "Wrong user role selected"
                })
                
            return JSONResponse(content={
                "status": True,
                "uid": new_user.id,
                "email": email
            }, status_code=status.HTTP_200_OK)
            
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=e)