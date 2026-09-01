from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from app.schemas.user_schema import UserResponse

class NoticiaImagenBase(BaseModel):
    image_path: str
    es_portada: bool

class NoticiaImagenResponse(NoticiaImagenBase):
    id: int
    noticia_id: int

    class Config:
        from_attributes = True

class NoticiaBase(BaseModel):
    titulo: str
    categoria: str
    extracto: str
    contenido: str
    icono: Optional[str] = None
    es_destacado: bool = False
    vistas: int = 0
    slug: Optional[str] = None

class NoticiaCreate(NoticiaBase):
    pass

class NoticiaUpdate(BaseModel):
    titulo: Optional[str] = None
    categoria: Optional[str] = None
    extracto: Optional[str] = None
    contenido: Optional[str] = None
    icono: Optional[str] = None
    es_destacado: Optional[bool] = None
    slug: Optional[str] = None

class NoticiaResponse(NoticiaBase):
    id: int
    fecha_publicacion: datetime
    autor_id: Optional[int]
    autor: Optional[UserResponse] = None
    imagenes: List[NoticiaImagenResponse] = []

    class Config:
        from_attributes = True
