from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UbicacionBase(BaseModel):
    nombre_es: str
    nombre_en: str
    ciudad_es: str
    ciudad_en: str
    direccion_es: Optional[str] = None
    direccion_en: Optional[str] = None
    horarios_es: Optional[str] = None
    horarios_en: Optional[str] = None
    telefonos: Optional[str] = None
    email: Optional[str] = None
    mapa_url: Optional[str] = None
    mapa_link: Optional[str] = None
    es_sede_central: bool = False
    activo: bool = True
    orden: int = 0

class UbicacionCreate(UbicacionBase):
    pass

class UbicacionUpdate(BaseModel):
    nombre_es: Optional[str] = None
    nombre_en: Optional[str] = None
    ciudad_es: Optional[str] = None
    ciudad_en: Optional[str] = None
    direccion_es: Optional[str] = None
    direccion_en: Optional[str] = None
    horarios_es: Optional[str] = None
    horarios_en: Optional[str] = None
    telefonos: Optional[str] = None
    email: Optional[str] = None
    mapa_url: Optional[str] = None
    mapa_link: Optional[str] = None
    es_sede_central: Optional[bool] = None
    activo: Optional[bool] = None
    orden: Optional[int] = None

class UbicacionResponse(UbicacionBase):
    id: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
