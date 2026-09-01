from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List
from app.database.connection import get_db
from app.models.role import Role
from app.schemas.user_schema import RoleCreate, RoleUpdate, RoleResponse
from app.middleware.auth import verify_token

router = APIRouter()

@router.get("/", response_model=List[RoleResponse], dependencies=[Depends(verify_token)])
def get_roles(db: Session = Depends(get_db)):
    return db.query(Role).all()

@router.post("/", response_model=RoleResponse, dependencies=[Depends(verify_token)])
def create_role(role: RoleCreate, db: Session = Depends(get_db)):
    existing = db.query(Role).filter(Role.name == role.name).first()
    if existing:
        raise HTTPException(status_code=400, detail="El rol ya existe")
    
    new_role = Role(**role.dict())
    db.add(new_role)
    db.commit()
    db.refresh(new_role)
    return new_role

@router.put("/{role_id}", response_model=RoleResponse, dependencies=[Depends(verify_token)])
def update_role(role_id: int, role: RoleUpdate, db: Session = Depends(get_db)):
    db_role = db.query(Role).filter(Role.id == role_id).first()
    if not db_role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
        
    if db_role.name == "admin" and role.name is not None and role.name != "admin":
        raise HTTPException(status_code=400, detail="No puedes renombrar el rol de administrador")

    if role.name is not None and role.name != db_role.name:
        existing = db.query(Role).filter(Role.name == role.name).first()
        if existing:
            raise HTTPException(status_code=400, detail="El nombre del rol ya existe")
        db_role.name = role.name

    if role.description is not None:
        db_role.description = role.description

    db.commit()
    db.refresh(db_role)
    return db_role

@router.delete("/{role_id}", dependencies=[Depends(verify_token)])
def delete_role(role_id: int, db: Session = Depends(get_db)):
    db_role = db.query(Role).filter(Role.id == role_id).first()
    if not db_role:
        raise HTTPException(status_code=404, detail="Rol no encontrado")
        
    if db_role.name == "admin":
        raise HTTPException(status_code=400, detail="No puedes eliminar el rol de administrador")
        
    # Check if any users have this role
    from app.models.user import User
    users_with_role = db.query(User).filter(User.role_id == role_id).first()
    if users_with_role:
        raise HTTPException(status_code=400, detail="No puedes eliminar este rol porque hay usuarios asignados a él")

    try:
        db.delete(db_role)
        db.commit()
        return {"message": "Rol eliminado exitosamente"}
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="No se puede eliminar el rol porque hay usuarios asociados a él.")
