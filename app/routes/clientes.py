from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.models.cliente import Cliente
from app.models.user import User
from app.schemas.cliente import ClienteCreate, ClienteUpdate, ClienteResponse
from app.middleware.auth import require_role
from app.services.cloudinary_service import upload_image, delete_image, is_configured

router = APIRouter(tags=["Clientes"])


@router.get("", response_model=List[ClienteResponse])
@router.get("/", response_model=List[ClienteResponse], include_in_schema=False)
def get_clientes(db: Session = Depends(get_db)):
    """Obtener todos los clientes activos ordenados por campo 'orden'."""
    return db.query(Cliente).filter(Cliente.activo == 1).order_by(Cliente.orden, Cliente.id).all()


@router.get("/todos", response_model=List[ClienteResponse])
def get_todos_clientes(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Obtener todos los clientes (incluidos inactivos) para administración."""
    return db.query(Cliente).order_by(Cliente.orden, Cliente.id).all()


@router.post("/", response_model=ClienteResponse)
def create_cliente(
    cliente: ClienteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Crear un cliente nuevo."""
    db_cliente = Cliente(**cliente.model_dump())
    db.add(db_cliente)
    db.commit()
    db.refresh(db_cliente)
    return db_cliente


@router.post("/{cliente_id}/logo", response_model=ClienteResponse)
def upload_cliente_logo(
    cliente_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Subir o reemplazar el logo de un cliente a Cloudinary."""
    if not is_configured():
        raise HTTPException(status_code=503, detail="Cloudinary no está configurado.")

    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    # Borrar logo anterior si existe
    if cliente.logo_url:
        delete_image(cliente.logo_url)

    file_bytes = file.file.read()
    try:
        secure_url = upload_image(file_bytes, file.filename, folder="clientes")
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Error al subir imagen: {str(e)}")

    cliente.logo_url = secure_url
    db.commit()
    db.refresh(cliente)
    return cliente


@router.put("/{cliente_id}", response_model=ClienteResponse)
def update_cliente(
    cliente_id: int,
    cliente_update: ClienteUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Actualizar datos de un cliente."""
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    for key, value in cliente_update.model_dump(exclude_unset=True).items():
        setattr(cliente, key, value)

    db.commit()
    db.refresh(cliente)
    return cliente


@router.delete("/{cliente_id}")
def delete_cliente(
    cliente_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Eliminar un cliente y su logo de Cloudinary."""
    cliente = db.query(Cliente).filter(Cliente.id == cliente_id).first()
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")

    if cliente.logo_url:
        delete_image(cliente.logo_url)

    db.delete(cliente)
    db.commit()
    return {"message": "Cliente eliminado correctamente"}
