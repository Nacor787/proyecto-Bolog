from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.nosotros import Nosotros
from app.models.user import User
from app.schemas.nosotros import NosotrosUpdate, NosotrosResponse
from app.middleware.auth import require_role

router = APIRouter(tags=["Nosotros"])


def _get_or_create(db: Session) -> Nosotros:
    """Obtiene el registro singleton, o lo crea si no existe."""
    nosotros = db.query(Nosotros).first()
    if not nosotros:
        nosotros = Nosotros()
        db.add(nosotros)
        db.commit()
        db.refresh(nosotros)
    return nosotros


@router.get("", response_model=NosotrosResponse)
@router.get("/", response_model=NosotrosResponse, include_in_schema=False)
def get_nosotros(db: Session = Depends(get_db)):
    """Obtener la información institucional de la empresa."""
    return _get_or_create(db)


@router.put("", response_model=NosotrosResponse)
@router.put("/", response_model=NosotrosResponse, include_in_schema=False)
def update_nosotros(
    update: NosotrosUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """Actualizar la información institucional. Solo administradores."""
    nosotros = _get_or_create(db)

    for key, value in update.model_dump(exclude_unset=True).items():
        setattr(nosotros, key, value)

    db.commit()
    db.refresh(nosotros)
    return nosotros
