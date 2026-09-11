from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ClienteBase(BaseModel):
    nombre: str
    logo_url: str
    orden: int = 0
    activo: int = 1

class ClienteCreate(ClienteBase):
    pass

class ClienteUpdate(BaseModel):
    nombre: Optional[str] = None
    logo_url: Optional[str] = None
    orden: Optional[int] = None
    activo: Optional[int] = None

class ClienteResponse(ClienteBase):
    id: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
