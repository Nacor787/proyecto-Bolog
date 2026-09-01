from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from app.models.base import Base

class Noticia(Base):
    __tablename__ = "noticias"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True, nullable=False)
    categoria = Column(String, nullable=False)
    extracto = Column(String, nullable=False)
    contenido = Column(Text, nullable=False)
    icono = Column(String, nullable=True)
    es_destacado = Column(Boolean, default=False)
    vistas = Column(Integer, default=0)
    fecha_publicacion = Column(DateTime, default=datetime.utcnow)
    
    autor_id = Column(Integer, ForeignKey("users.id"))
    
    # Relationships
    autor = relationship("User", back_populates="noticias")
    imagenes = relationship("NoticiaImagen", back_populates="noticia", cascade="all, delete-orphan")


class NoticiaImagen(Base):
    __tablename__ = "noticia_imagenes"

    id = Column(Integer, primary_key=True, index=True)
    noticia_id = Column(Integer, ForeignKey("noticias.id", ondelete="CASCADE"), nullable=False)
    image_path = Column(String, nullable=False)
    es_portada = Column(Boolean, default=False)

    noticia = relationship("Noticia", back_populates="imagenes")
