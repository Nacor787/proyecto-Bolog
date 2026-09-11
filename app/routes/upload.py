"""
Endpoint de upload directo a Cloudinary.
Permite subir imágenes y videos desde el panel de administración
sin necesidad de pegar links manualmente.
"""
import time
import logging
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from typing import Optional

from app.models.user import User
from app.middleware.auth import require_role
from app.services.cloudinary_service import is_configured

import cloudinary
import cloudinary.uploader

router = APIRouter(tags=["Upload"])

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"}
MAX_IMAGE_MB = 10
MAX_VIDEO_MB = 200


@router.post("/imagen")
async def upload_imagen(
    file: UploadFile = File(...),
    carpeta: Optional[str] = Form("subidas"),
    current_user: User = Depends(require_role(["admin"]))
):
    """
    Sube una imagen a Cloudinary y devuelve la URL segura.
    Carpeta por defecto: 'subidas'.
    """
    if not is_configured():
        raise HTTPException(status_code=503, detail="Cloudinary no está configurado.")

    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail=f"Tipo de archivo no permitido: {file.content_type}. Solo imágenes.")

    content = await file.read()
    if len(content) > MAX_IMAGE_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail=f"Imagen demasiado grande. Máximo {MAX_IMAGE_MB}MB.")

    try:
        safe_name = Path(file.filename.replace(" ", "_")).stem
        public_id = f"{int(time.time() * 1000)}_{safe_name}"
        result = cloudinary.uploader.upload(
            content,
            folder=carpeta,
            public_id=public_id,
            resource_type="image",
        )
        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
            "width": result.get("width"),
            "height": result.get("height"),
        }
    except Exception as e:
        logging.error(f"Error subiendo imagen a Cloudinary: {e}")
        raise HTTPException(status_code=502, detail=f"Error al subir imagen: {str(e)}")


@router.post("/video")
async def upload_video(
    file: UploadFile = File(...),
    carpeta: Optional[str] = Form("videos"),
    current_user: User = Depends(require_role(["admin"]))
):
    """
    Sube un video a Cloudinary y devuelve la URL segura.
    """
    if not is_configured():
        raise HTTPException(status_code=503, detail="Cloudinary no está configurado.")

    if file.content_type not in ALLOWED_VIDEO_TYPES:
        raise HTTPException(status_code=400, detail=f"Tipo de archivo no permitido: {file.content_type}. Solo videos.")

    content = await file.read()
    if len(content) > MAX_VIDEO_MB * 1024 * 1024:
        raise HTTPException(status_code=413, detail=f"Video demasiado grande. Máximo {MAX_VIDEO_MB}MB.")

    try:
        safe_name = Path(file.filename.replace(" ", "_")).stem
        public_id = f"{int(time.time() * 1000)}_{safe_name}"
        result = cloudinary.uploader.upload(
            content,
            folder=carpeta,
            public_id=public_id,
            resource_type="video",
        )
        return {
            "url": result["secure_url"],
            "public_id": result["public_id"],
            "duration": result.get("duration"),
            "format": result.get("format"),
        }
    except Exception as e:
        logging.error(f"Error subiendo video a Cloudinary: {e}")
        raise HTTPException(status_code=502, detail=f"Error al subir video: {str(e)}")
