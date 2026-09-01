import re
import unicodedata
import logging
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from typing import List

from app.database.connection import get_db
from app.models.noticia import Noticia, NoticiaImagen
from app.models.user import User
from app.schemas.noticia import NoticiaResponse, NoticiaCreate, NoticiaUpdate, NoticiaImagenResponse
from app.middleware.auth import require_role
from app.services.cloudinary_service import upload_image, delete_image, is_configured

router = APIRouter(
    tags=["Noticias"]
)


def generar_slug(titulo: str, db: Session, noticia_id: int = None) -> str:
    """
    Genera un slug único a partir del título.
    Elimina acentos, caracteres especiales y asegura unicidad.
    """
    # Normalizar y quitar acentos
    texto = unicodedata.normalize('NFKD', titulo).encode('ascii', 'ignore').decode('ascii')
    # Minúsculas, reemplazar espacios y caracteres no alfanuméricos por guiones
    texto = re.sub(r'[^\w\s-]', '', texto.lower())
    slug_base = re.sub(r'[\s_]+', '-', texto).strip('-')

    # Verificar unicidad
    slug = slug_base
    contador = 1
    while True:
        query = db.query(Noticia).filter(Noticia.slug == slug)
        if noticia_id:
            query = query.filter(Noticia.id != noticia_id)
        if not query.first():
            break
        slug = f"{slug_base}-{contador}"
        contador += 1
    return slug


@router.get("/", response_model=List[NoticiaResponse])
def get_noticias(db: Session = Depends(get_db)):
    """
    Obtener todas las noticias ordenadas por fecha descendente.
    """
    try:
        return (
            db.query(Noticia)
            .options(joinedload(Noticia.autor), joinedload(Noticia.imagenes))
            .order_by(desc(Noticia.fecha_publicacion))
            .all()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener noticias: {str(e)}")


@router.post("/fix-slugs", tags=["Admin"])
def fix_missing_slugs(
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """
    Genera slugs para noticias que no tienen uno. Ejecutar una vez para migrar datos antiguos.
    """
    noticias_sin_slug = db.query(Noticia).filter(
        (Noticia.slug == None) | (Noticia.slug == "")
    ).all()
    
    count = 0
    for noticia in noticias_sin_slug:
        noticia.slug = generar_slug(noticia.titulo, db, noticia.id)
        count += 1
    
    db.commit()
    return {"message": f"Se generaron slugs para {count} noticias."}



@router.get("/por-slug/{slug}", response_model=NoticiaResponse)
def get_noticia_por_slug(slug: str, db: Session = Depends(get_db)):
    """
    Obtener el detalle de una noticia por su slug. Si no se encuentra por slug, 
    intenta buscar por ID (para compatibilidad con noticias antiguas sin slug).
    Incrementa las vistas.
    """
    noticia = db.query(Noticia).filter(Noticia.slug == slug).first()
    
    if not noticia and slug.isdigit():
        noticia = db.query(Noticia).filter(Noticia.id == int(slug)).first()
        
    if not noticia:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")
    
    # Incrementar vistas
    if noticia.vistas is None:
        noticia.vistas = 0
    noticia.vistas += 1
    db.commit()
    db.refresh(noticia)
    
    return noticia


@router.get("/{noticia_id}", response_model=NoticiaResponse)
def get_noticia(noticia_id: int, db: Session = Depends(get_db)):
    """
    Obtener el detalle de una noticia por ID.
    """
    noticia = db.query(Noticia).filter(Noticia.id == noticia_id).first()
    if not noticia:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")
    return noticia


@router.post("/", response_model=NoticiaResponse)
def create_noticia(
    noticia: NoticiaCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """
    Crear una nueva noticia. Solo para admins.
    """
    # Lógica de Noticia Destacada: Solo puede existir UNA noticia destacada a la vez
    if noticia.es_destacado:
        db.query(Noticia).filter(Noticia.es_destacado == True).update({"es_destacado": False})
    
    slug = generar_slug(noticia.titulo, db)
    
    db_noticia = Noticia(
        titulo=noticia.titulo,
        slug=slug,
        categoria=noticia.categoria,
        extracto=noticia.extracto,
        contenido=noticia.contenido,
        icono=noticia.icono,
        es_destacado=noticia.es_destacado,
        autor_id=current_user.id
    )
    db.add(db_noticia)
    db.commit()
    db.refresh(db_noticia)
    return db_noticia


@router.put("/{noticia_id}", response_model=NoticiaResponse)
def update_noticia(
    noticia_id: int,
    noticia_update: NoticiaUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """
    Actualizar una noticia existente.
    """
    noticia = db.query(Noticia).filter(Noticia.id == noticia_id).first()
    if not noticia:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")
    
    update_data = noticia_update.model_dump(exclude_unset=True)
    
    # Si cambia el título, regenerar el slug
    if "titulo" in update_data and update_data["titulo"] != noticia.titulo:
        update_data["slug"] = generar_slug(update_data["titulo"], db, noticia_id)
    
    # Lógica de Noticia Destacada
    if update_data.get("es_destacado") is True:
        db.query(Noticia).filter(Noticia.id != noticia_id, Noticia.es_destacado == True).update({"es_destacado": False})
        
    for key, value in update_data.items():
        setattr(noticia, key, value)
        
    db.commit()
    db.refresh(noticia)
    return noticia


@router.delete("/{noticia_id}")
def delete_noticia(
    noticia_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """
    Eliminar una noticia y sus imágenes asociadas (assets de Cloudinary + registros en BD).
    """
    noticia = db.query(Noticia).filter(Noticia.id == noticia_id).first()
    if not noticia:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")

    # Borrar assets de Cloudinary (best-effort)
    for img in noticia.imagenes:
        delete_image(img.image_path)

    # La BD eliminará los registros de NoticiaImagen por el ondelete="CASCADE"
    db.delete(noticia)
    db.commit()
    return {"message": "Noticia y sus imágenes eliminadas correctamente"}


@router.post("/{noticia_id}/images", response_model=List[NoticiaImagenResponse])
def upload_noticia_images(
    noticia_id: int,
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """
    Subir imágenes de una noticia a Cloudinary. La primera imagen se marca como portada si no hay otras.
    """
    if not is_configured():
        raise HTTPException(
            status_code=503,
            detail="Cloudinary no está configurado. Revisa CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY y CLOUDINARY_API_SECRET en app/.env"
        )

    noticia = db.query(Noticia).filter(Noticia.id == noticia_id).first()
    if not noticia:
        raise HTTPException(status_code=404, detail="Noticia no encontrada")

    has_portada = db.query(NoticiaImagen).filter(NoticiaImagen.noticia_id == noticia_id, NoticiaImagen.es_portada == True).first() is not None

    uploaded_images = []
    for idx, file in enumerate(files):
        file_bytes = file.file.read()

        try:
            secure_url = upload_image(file_bytes, file.filename)
        except Exception as e:
            logging.error(f"Error subiendo imagen a Cloudinary: {e}")
            raise HTTPException(status_code=502, detail="Error al subir la imagen a Cloudinary")

        # Determinar si es portada
        es_portada = False
        if not has_portada and idx == 0:
            es_portada = True

        db_image = NoticiaImagen(
            noticia_id=noticia_id,
            image_path=secure_url,
            es_portada=es_portada
        )
        db.add(db_image)
        uploaded_images.append(db_image)

    db.commit()
    for img in uploaded_images:
        db.refresh(img)

    return uploaded_images


@router.delete("/{noticia_id}/images/{image_id}")
def delete_noticia_image(
    noticia_id: int,
    image_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_role(["admin"]))
):
    """
    Eliminar una imagen específica de una noticia: borra el asset de Cloudinary y el registro de BD.
    """
    image = db.query(NoticiaImagen).filter(NoticiaImagen.id == image_id, NoticiaImagen.noticia_id == noticia_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Imagen no encontrada")

    # Borrar de Cloudinary (best-effort: si falla, se loguea pero se elimina el registro)
    delete_image(image.image_path)

    db.delete(image)
    db.commit()
    return {"message": "Imagen eliminada"}
