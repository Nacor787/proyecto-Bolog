from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from passlib.context import CryptContext
from app.database.connection import get_db
from app.models.user import User
from app.models.role import Role
from app.schemas.user_schema import UserCreate, UserUpdate, UserResponse
from app.middleware.auth import verify_token

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

@router.get("/me", response_model=UserResponse)
def get_current_user(user_id: str = Depends(verify_token), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == int(user_id)).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user

@router.get("/", response_model=List[UserResponse], dependencies=[Depends(verify_token)])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.post("/", response_model=UserResponse, dependencies=[Depends(verify_token)])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if role exists
    role = db.query(Role).filter(Role.id == user.role_id).first()
    if not role:
        raise HTTPException(status_code=400, detail="Rol inválido")
        
    # Check if username or email exists
    existing = db.query(User).filter(
        (User.username == user.username) | (User.email == user.email)
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Usuario o email ya existe")
        
    hashed_pwd = get_password_hash(user.password)
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        username=user.username,
        email=user.email,
        password_hash=hashed_pwd,
        role_id=user.role_id,
        is_active=user.is_active
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.put("/{user_id}", response_model=UserResponse, dependencies=[Depends(verify_token)])
def update_user(user_id: int, user: UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    if user.username is not None and user.username != db_user.username:
        existing = db.query(User).filter(User.username == user.username).first()
        if existing:
            raise HTTPException(status_code=400, detail="Username ya en uso")
        db_user.username = user.username
        
    if user.email is not None and user.email != db_user.email:
        existing = db.query(User).filter(User.email == user.email).first()
        if existing:
            raise HTTPException(status_code=400, detail="Email ya en uso")
        db_user.email = user.email

    if user.role_id is not None:
        role = db.query(Role).filter(Role.id == user.role_id).first()
        if not role:
            raise HTTPException(status_code=400, detail="Rol inválido")
        db_user.role_id = user.role_id

    if user.first_name is not None:
        db_user.first_name = user.first_name
    if user.last_name is not None:
        db_user.last_name = user.last_name
    if user.is_active is not None:
        db_user.is_active = user.is_active
    if user.password:
        db_user.password_hash = get_password_hash(user.password)

    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/{user_id}", dependencies=[Depends(verify_token)])
def delete_user(user_id: int, current_user_id: str = Depends(verify_token), db: Session = Depends(get_db)):
    if int(current_user_id) == user_id:
        raise HTTPException(status_code=400, detail="No puedes eliminarte a ti mismo")
        
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
        
    db.delete(db_user)
    db.commit()
    return {"message": "Usuario eliminado correctamente"}

