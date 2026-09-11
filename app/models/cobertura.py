from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean
from datetime import datetime
from app.models.base import Base

class RutaCobertura(Base):
    __tablename__ = "rutas_cobertura"

    id = Column(Integer, primary_key=True, index=True)
    region = Column(String, nullable=False)            # ej: "asia", "na", "eu"
    region_label_es = Column(String, nullable=False)   # ej: "Asia — Pacífico"
    region_label_en = Column(String, nullable=False)   # ej: "Asia — Pacific"
    titulo_es = Column(String, nullable=False)
    titulo_en = Column(String, nullable=False)
    tipo_transporte_es = Column(String, nullable=True)
    tipo_transporte_en = Column(String, nullable=True)
    tiempo_transito = Column(String, nullable=True)    # ej: "28 - 32 Días"
    puerto_entrada = Column(String, nullable=True)     # ej: "Arica (CL) / Callao (PE)"
    frecuencia_es = Column(String, nullable=True)
    frecuencia_en = Column(String, nullable=True)
    # Coordenadas para el globo 3D (punto de destino, Bolivia es el origen)
    lat_destino = Column(Float, nullable=True)
    lng_destino = Column(Float, nullable=True)
    activo = Column(Boolean, default=True)
    orden = Column(Integer, default=0)
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
