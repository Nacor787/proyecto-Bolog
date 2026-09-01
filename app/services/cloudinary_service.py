import os
import re
import time
import logging
from pathlib import Path

import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

env_path = Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME", ""),
    api_key=os.getenv("CLOUDINARY_API_KEY", ""),
    api_secret=os.getenv("CLOUDINARY_API_SECRET", ""),
    secure=True,
)

CLOUDINARY_FOLDER = "noticias"


def _real_value(value: str) -> bool:
    return bool(value) and not value.startswith("TU_")


def is_configured() -> bool:
    return all([
        _real_value(os.getenv("CLOUDINARY_CLOUD_NAME")),
        _real_value(os.getenv("CLOUDINARY_API_KEY")),
        _real_value(os.getenv("CLOUDINARY_API_SECRET")),
    ])


def upload_image(file_bytes: bytes, filename: str) -> str:
    """Sube la imagen a Cloudinary y devuelve la URL segura (secure_url)."""
    safe_name = Path(filename.replace(" ", "_")).stem
    public_id = f"{int(time.time() * 1000)}_{safe_name}"
    result = cloudinary.uploader.upload(
        file_bytes,
        folder=CLOUDINARY_FOLDER,
        public_id=public_id,
        resource_type="image",
    )
    return result["secure_url"]


def delete_image(secure_url: str) -> bool:
    """Borra el asset de Cloudinary a partir de su URL. Nunca lanza excepción."""
    public_id = extract_public_id(secure_url)
    if not public_id:
        logging.warning(f"No se pudo extraer public_id de: {secure_url}")
        return False
    try:
        result = cloudinary.uploader.destroy(public_id)
        return result.get("result") == "ok"
    except Exception as e:
        logging.error(f"Error eliminando imagen de Cloudinary ({public_id}): {e}")
        return False


def extract_public_id(secure_url: str) -> str:
    """Extrae el public_id (carpeta + nombre sin extensión) de una URL de Cloudinary."""
    if not secure_url or "res.cloudinary.com" not in secure_url:
        return None
    marker = "/image/upload/"
    idx = secure_url.find(marker)
    if idx == -1:
        return None
    path = secure_url[idx + len(marker):]
    # Quitar segmentos de transformación (f_auto, q_auto, w_..., etc.) y versión (v1234/)
    path = re.sub(r"^(v\d+/|f_[a-z0-9_,]+/|q_[a-z0-9_,]+/|w_\d+/|h_\d+/|c_[a-z0-9_,]+/|e_[a-z0-9_]+/)+", "", path)
    # Quitar solo la última extensión (formato real). El public_id puede contener puntos
    # (p. ej. cuando el nombre original era "foto.png" o Cloudinary convirtió a .webp).
    path = re.sub(r"\.[a-zA-Z0-9]+$", "", path)
    return path or None