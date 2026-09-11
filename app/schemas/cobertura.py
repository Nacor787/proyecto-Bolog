from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class RutaCoberturaBase(BaseModel):
    region: str
    region_label_es: str
    region_label_en: str
    titulo_es: str
    titulo_en: str
    tipo_transporte_es: Optional[str] = None
    tipo_transporte_en: Optional[str] = None
    tiempo_transito: Optional[str] = None
    puerto_entrada: Optional[str] = None
    frecuencia_es: Optional[str] = None
    frecuencia_en: Optional[str] = None
    lat_destino: Optional[float] = None
    lng_destino: Optional[float] = None
    activo: bool = True
    orden: int = 0

class RutaCoberturaCreate(RutaCoberturaBase):
    pass

class RutaCoberturaUpdate(BaseModel):
    region: Optional[str] = None
    region_label_es: Optional[str] = None
    region_label_en: Optional[str] = None
    titulo_es: Optional[str] = None
    titulo_en: Optional[str] = None
    tipo_transporte_es: Optional[str] = None
    tipo_transporte_en: Optional[str] = None
    tiempo_transito: Optional[str] = None
    puerto_entrada: Optional[str] = None
    frecuencia_es: Optional[str] = None
    frecuencia_en: Optional[str] = None
    lat_destino: Optional[float] = None
    lng_destino: Optional[float] = None
    activo: Optional[bool] = None
    orden: Optional[int] = None

class RutaCoberturaResponse(RutaCoberturaBase):
    id: int
    fecha_creacion: datetime

    class Config:
        from_attributes = True
