from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.models.cobertura import RutaCobertura
from app.models.user import User
from app.schemas.cobertura import RutaCoberturaCreate, RutaCoberturaUpdate, RutaCoberturaResponse
from app.middleware.auth import require_role

router = APIRouter(tags=["Cobertura"])


@router.get("", response_model=List[RutaCoberturaResponse])
@router.get("/", response_model=List[RutaCoberturaResponse], include_in_schema=False)
def get_rutas(db: Session = Depends(get_db)):
    """Obtener todas las rutas activas para el mapa público."""
    return db.query(RutaCobertura).filter(RutaCobertura.activo == True).order_by(RutaCobertura.orden, RutaCobertura.id).all()


@router.get("/todas", response_model=List[RutaCoberturaResponse])
def get_todas_rutas(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Obtener todas las rutas (incluidas inactivas) para administración."""
    return db.query(RutaCobertura).order_by(RutaCobertura.orden, RutaCobertura.id).all()


@router.post("/", response_model=RutaCoberturaResponse)
def create_ruta(
    ruta: RutaCoberturaCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Crear una nueva ruta de cobertura."""
    db_ruta = RutaCobertura(**ruta.model_dump())
    db.add(db_ruta)
    db.commit()
    db.refresh(db_ruta)
    return db_ruta


@router.put("/{ruta_id}", response_model=RutaCoberturaResponse)
def update_ruta(
    ruta_id: int,
    ruta_update: RutaCoberturaUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Actualizar una ruta de cobertura existente."""
    ruta = db.query(RutaCobertura).filter(RutaCobertura.id == ruta_id).first()
    if not ruta:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")

    for key, value in ruta_update.model_dump(exclude_unset=True).items():
        setattr(ruta, key, value)

    db.commit()
    db.refresh(ruta)
    return ruta


@router.delete("/{ruta_id}")
def delete_ruta(
    ruta_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Eliminar una ruta de cobertura."""
    ruta = db.query(RutaCobertura).filter(RutaCobertura.id == ruta_id).first()
    if not ruta:
        raise HTTPException(status_code=404, detail="Ruta no encontrada")

    db.delete(ruta)
    db.commit()
    return {"message": "Ruta eliminada correctamente"}
