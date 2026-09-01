import time
import os
from typing import Dict
import jwt
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET", "bolog_super_secret_key_2026")
JWT_REFRESH_SECRET = os.getenv("JWT_REFRESH_SECRET", "bolog_refresh_secret_key_2026")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

def sign_jwt(user_id: str) -> Dict[str, str]:
    payload = {
        "user_id": user_id,
        "expires": time.time() + 3600 # 1 hora (3600 segundos)
    }
    refresh_payload = {
        "user_id": user_id,
        "expires": time.time() + 604800 # 7 dias (604800 segundos)
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    refresh_token = jwt.encode(refresh_payload, JWT_REFRESH_SECRET, algorithm=JWT_ALGORITHM)
    return {
        "access_token": token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return None

def decode_refresh_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_REFRESH_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return None
