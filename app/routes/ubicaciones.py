from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.connection import get_db
from app.models.ubicacion import Ubicacion
from app.models.user import User
from app.schemas.ubicacion import UbicacionCreate, UbicacionUpdate, UbicacionResponse
from app.middleware.auth import require_role

router = APIRouter(tags=["Ubicaciones"])


@router.get("", response_model=List[UbicacionResponse])
@router.get("/", response_model=List[UbicacionResponse], include_in_schema=False)
def get_ubicaciones(db: Session = Depends(get_db)):
    """Obtener todas las ubicaciones activas ordenadas."""
    return db.query(Ubicacion).filter(Ubicacion.activo == True).order_by(Ubicacion.orden, Ubicacion.id).all()


@router.get("/todas", response_model=List[UbicacionResponse])
def get_todas_ubicaciones(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Obtener todas las ubicaciones para administración."""
    return db.query(Ubicacion).order_by(Ubicacion.orden, Ubicacion.id).all()


@router.post("/", response_model=UbicacionResponse)
def create_ubicacion(
    ubicacion: UbicacionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Crear una nueva ubicación/sucursal."""
    # Si es sede central, quitar la sede central anterior
    if ubicacion.es_sede_central:
        db.query(Ubicacion).filter(Ubicacion.es_sede_central == True).update({"es_sede_central": False})

    db_ub = Ubicacion(**ubicacion.model_dump())
    db.add(db_ub)
    db.commit()
    db.refresh(db_ub)
    return db_ub


@router.put("/{ubicacion_id}", response_model=UbicacionResponse)
def update_ubicacion(
    ubicacion_id: int,
    ubicacion_update: UbicacionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Actualizar una ubicación existente."""
    ubicacion = db.query(Ubicacion).filter(Ubicacion.id == ubicacion_id).first()
    if not ubicacion:
        raise HTTPException(status_code=404, detail="Ubicación no encontrada")

    update_data = ubicacion_update.model_dump(exclude_unset=True)

    # Si se está marcando como sede central, desmarcar las demás
    if update_data.get("es_sede_central") is True:
        db.query(Ubicacion).filter(
            Ubicacion.id != ubicacion_id,
            Ubicacion.es_sede_central == True
        ).update({"es_sede_central": False})

    for key, value in update_data.items():
        setattr(ubicacion, key, value)

    db.commit()
    db.refresh(ubicacion)
    return ubicacion


@router.delete("/{ubicacion_id}")
def delete_ubicacion(
    ubicacion_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Eliminar una ubicación."""
    ubicacion = db.query(Ubicacion).filter(Ubicacion.id == ubicacion_id).first()
    if not ubicacion:
        raise HTTPException(status_code=404, detail="Ubicación no encontrada")

    db.delete(ubicacion)
    db.commit()
    return {"message": "Ubicación eliminada correctamente"}
