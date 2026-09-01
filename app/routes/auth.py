from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.database.connection import get_db
from app.models.user import User
from app.schemas.user_schema import UserLogin, Token
from app.auth.jwt_handler import sign_jwt, decode_refresh_jwt
import os
import requests

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    secret = os.getenv("CAPTCHA_APIKEY")
    if secret:
        if not user.captcha_token:
            raise HTTPException(status_code=400, detail="Por favor, completa el Captcha de seguridad")
        
        # Verify Turnstile
        verify_url = "https://challenges.cloudflare.com/turnstile/v0/siteverify"
        try:
            res = requests.post(verify_url, data={"secret": secret, "response": user.captcha_token}, timeout=5)
            data = res.json()
            if not data.get("success"):
                raise HTTPException(status_code=400, detail="Captcha inválido o expirado. Por favor, intenta de nuevo.")
        except Exception:
            raise HTTPException(status_code=500, detail="Error de conexión al validar el Captcha")

    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Credenciales invalidas")
    return sign_jwt(str(db_user.id))

@router.post("/refresh", response_model=Token)
def refresh_token(refresh_token: str):
    payload = decode_refresh_jwt(refresh_token)
    if not payload:
        raise HTTPException(status_code=401, detail="Refresh token invalido o expirado")
    
    return sign_jwt(payload["user_id"])
