from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.models.base import Base

class Nosotros(Base):
    """
    Tabla singleton (solo existe 1 fila). Toda la info institucional de la empresa.
    """
    __tablename__ = "nosotros"

    id = Column(Integer, primary_key=True, index=True)
    # Historia
    historia_es = Column(Text, nullable=True)
    historia_en = Column(Text, nullable=True)
    # Video URL (YouTube embed o link directo)
    video_url = Column(String, nullable=True)
    # Misión
    mision_es = Column(Text, nullable=True)
    mision_en = Column(Text, nullable=True)
    mision_bullets_es = Column(Text, nullable=True)
    mision_bullets_en = Column(Text, nullable=True)
    # Visión
    vision_es = Column(Text, nullable=True)
    vision_en = Column(Text, nullable=True)
    vision_bullets_es = Column(Text, nullable=True)
    vision_bullets_en = Column(Text, nullable=True)
    # Valores
    valores_es = Column(Text, nullable=True)
    valores_en = Column(Text, nullable=True)
    valores_bullets_es = Column(Text, nullable=True)
    valores_bullets_en = Column(Text, nullable=True)
    # Políticas
    politicas_es = Column(Text, nullable=True)
    politicas_en = Column(Text, nullable=True)
    # Tagline (subtitle corto)
    tagline_es = Column(String, nullable=True)
    tagline_en = Column(String, nullable=True)
    # Trayectoria (párrafo extra bajo historia)
    trayectoria_es = Column(Text, nullable=True)
    trayectoria_en = Column(Text, nullable=True)
    fecha_actualizacion = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
