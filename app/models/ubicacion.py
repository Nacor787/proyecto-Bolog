from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime
from app.models.base import Base

class Ubicacion(Base):
    __tablename__ = "ubicaciones"

    id = Column(Integer, primary_key=True, index=True)
    nombre_es = Column(String, nullable=False)         # ej: "Sede Central"
    nombre_en = Column(String, nullable=False)         # ej: "Headquarters"
    ciudad_es = Column(String, nullable=False)         # ej: "La Paz, Bolivia"
    ciudad_en = Column(String, nullable=False)
    direccion_es = Column(Text, nullable=True)
    direccion_en = Column(Text, nullable=True)
    horarios_es = Column(String, nullable=True)        # ej: "Lunes a Viernes, 8:30 - 17:00"
    horarios_en = Column(String, nullable=True)
    telefonos = Column(String, nullable=True)          # ej: "2 2147305 – 2 2147384"
    email = Column(String, nullable=True)
    # Google Maps - iframe embed src URL o link directo
    mapa_url = Column(Text, nullable=True)
    mapa_link = Column(Text, nullable=True)            # link para "Abrir en Google Maps"
    es_sede_central = Column(Boolean, default=False)
    activo = Column(Boolean, default=True)
    orden = Column(Integer, default=0)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
