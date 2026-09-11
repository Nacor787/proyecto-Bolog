from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NosotrosBase(BaseModel):
    historia_es: Optional[str] = None
    historia_en: Optional[str] = None
    video_url: Optional[str] = None
    mision_es: Optional[str] = None
    mision_en: Optional[str] = None
    mision_bullets_es: Optional[str] = None
    mision_bullets_en: Optional[str] = None
    vision_es: Optional[str] = None
    vision_en: Optional[str] = None
    vision_bullets_es: Optional[str] = None
    vision_bullets_en: Optional[str] = None
    valores_es: Optional[str] = None
    valores_en: Optional[str] = None
    valores_bullets_es: Optional[str] = None
    valores_bullets_en: Optional[str] = None
    politicas_es: Optional[str] = None
    politicas_en: Optional[str] = None
    tagline_es: Optional[str] = None
    tagline_en: Optional[str] = None
    trayectoria_es: Optional[str] = None
    trayectoria_en: Optional[str] = None

class NosotrosUpdate(NosotrosBase):
    pass

class NosotrosResponse(NosotrosBase):
    id: int
    fecha_actualizacion: Optional[datetime] = None

    class Config:
        from_attributes = True
