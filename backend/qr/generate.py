from jose import jwt, JWTError
from passlib.context import CryptContext
from datetime import timedelta, datetime, timezone
from typing import Optional

from fastapi import HTTPException, Request, status

from dotenv import load_dotenv, find_dotenv
import os

load_dotenv(find_dotenv())
pwd_context = CryptContext(schemes=["argon2"])

class QRTokenGenerate:
    def create_jwt_token(self, user_data:dict, expire_time:Optional[timedelta] = None):
        to_encode = user_data.copy()
        expire = datetime.now(timezone.utc) + (expire_time if expire_time else timedelta(minutes=5))
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, os.getenv("JWT_SECRET_KEY"), os.getenv("JWT_ALGORITHM"))
    
    def decode_token(self, qr_token: str):
        if not qr_token:
            return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access Denied")
        
        try:
            payload = jwt.decode(qr_token, os.getenv("JWT_SECRET_KEY"), os.getenv("JWT_ALGRORITHM"))
            uid: int = int(payload.get("sub"))
            token: str = str(payload.get("qrToken"))

            if not uid or not token:
                return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access Denied")
            
            return uid, token
        
        except JWTError as e:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access Denied")
  