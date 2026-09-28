from fastapi import Depends
from fastapi.routing import APIRouter, Request
from fastapi.responses import JSONResponse

from slowapi import Limiter
from slowapi.util import get_remote_address

from datamodels.auth_models import *

from auth.jwt_auth import *

from storage.redis_cache import *
from qr.generate import *
from hashlib import sha256

r = APIRouter()
limiter = Limiter(key_func=get_remote_address)
login = Login()
signup = Signup()
cache = CacheRedis()
qrGenerator = QRTokenGenerate()

@r.post("/login")
@limiter.limit("5/minute")
async def login_func(request: Request, data: LoginData, session: Session = Depends(get_session)):
    return login.authenticate(data=data, session=session)

@r.post("/signup")
@limiter.limit("5/minute")
async def signup_func(request: Request, data: SignupData, session: Session = Depends(get_session)):
    return signup.create_account(data=data, session=session)

@r.get("/generate/qr/{pid}")
@limiter.limit("70/minute")
async def generate_qr_token(request: Request, pid: int, session: Session = Depends(get_session), payload: tuple = Depends(login.current_user)):
    uid, role = payload
    if pid != uid or role != "doctor":
        return JSONResponse(content={
            "status": False,
            "message": "Unauthorized Access"
        }, status_code=status.HTTP_401_UNAUTHORIZED)
        
    token = str(uuid4)[:8]
    jwt_qr_token = qrGenerator.create_jwt_token({
        "qrToken": token,
        "uid": uid
    }, timedelta(minutes=5))
    
    cache.set_cache_qr(uid=uid, qr_hash=sha256(token.encode('utf-8')).hexdigest())
    return jwt_qr_token

@r.get("/get/patient/{qrToken}")
@limiter.limit("30/minute")
async def get_patient_data(request: Request, qrToken: str, session: Session = Depends(get_session), payload: tuple = Depends(login.current_user)):
    uid, role = payload
    if not uid or role != "doctor":
        return JSONResponse(content={
            "status": False,
            "message": "Unauthorized Access"
        }, status_code=status.HTTP_401_UNAUTHORIZED)
    
    pid, token = qrGenerator.decode_token(qr_token=qrToken)
    
    hash_token = cache.get_cache_qr(pid)
    
    if not hash_token or hash_token != sha256(token.encode('utf-8')).hexdigest():
        return JSONResponse(content={
            "status": False,
            "message": "QR Expired. Please re-generate it."
        })
        
    return JSONResponse(content={
        "stauts": True,
        "message": "Token Worked"
    })
    