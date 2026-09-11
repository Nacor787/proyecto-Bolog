from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from app.models.base import Base

class Cliente(Base):
    __tablename__ = "clientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    logo_url = Column(String, nullable=False)
    orden = Column(Integer, default=0)
    activo = Column(Integer, default=1)  # 1=activo, 0=inactivo
    fecha_creacion = Column(DateTime, default=datetime.utcnow)
