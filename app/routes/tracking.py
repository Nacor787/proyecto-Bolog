from fastapi import APIRouter, Request, HTTPException
from pydantic import BaseModel
import httpx
import time
import os
from collections import defaultdict

router = APIRouter()

# ── Rate limiting en memoria (por IP) ─────────────────────────────────────────
# Máx. 5 consultas por ventana de 60 segundos por IP
RATE_LIMIT_MAX = 5
RATE_LIMIT_WINDOW = 60  # segundos

_rate_store: dict[str, list[float]] = defaultdict(list)

def check_rate_limit(ip: str) -> bool:
    """Retorna True si la IP puede continuar, False si excedió el límite."""
    now = time.time()
    timestamps = _rate_store[ip]
    # Filtrar timestamps fuera de la ventana
    _rate_store[ip] = [t for t in timestamps if now - t < RATE_LIMIT_WINDOW]
    if len(_rate_store[ip]) >= RATE_LIMIT_MAX:
        return False
    _rate_store[ip].append(now)
    return True


# ── Verificación de Turnstile (Cloudflare CAPTCHA) ────────────────────────────
TURNSTILE_SECRET = os.getenv("CAPTCHA_APIKEY", "")
TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"

async def verify_turnstile(token: str, ip: str) -> bool:
    """Verifica el token de Turnstile con la API de Cloudflare."""
    if not TURNSTILE_SECRET or not token:
        return False
    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(TURNSTILE_VERIFY_URL, data={
            "secret": TURNSTILE_SECRET,
            "response": token,
            "remoteip": ip,
        })
        result = resp.json()
        return result.get("success", False)


# ── Schema del request ─────────────────────────────────────────────────────────
class TrackingRequest(BaseModel):
    tracking_number: str
    captcha_token: str


# ── Endpoint principal ─────────────────────────────────────────────────────────
@router.post("/tracking")
async def track_shipment(payload: TrackingRequest, request: Request):
    ip = request.client.host if request.client else "unknown"

    # 1. Rate limit
    if not check_rate_limit(ip):
        raise HTTPException(
            status_code=429,
            detail="Demasiadas solicitudes. Por favor espere un momento antes de volver a buscar."
        )

    # 2. Verificar CAPTCHA
    captcha_ok = await verify_turnstile(payload.captcha_token, ip)
    if not captcha_ok:
        raise HTTPException(
            status_code=403,
            detail="Verificación de seguridad fallida. Recarga la página e intenta de nuevo."
        )

    # 3. Consultar sistema externo BLG
    tracking_url = (
        f"https://sis.blg.com.bo/backend/web/tracking-operacion/index-tracking.html"
        f"?codigo={payload.tracking_number}"
    )

    # El sistema externo acepta GET con el código; parseamos la respuesta HTML
    # para extraer los datos relevantes. Si el sistema expone una API JSON la usamos directo.
    try:
        async with httpx.AsyncClient(timeout=15, follow_redirects=True) as client:
            resp = await client.get(tracking_url, headers={
                "User-Agent": "Mozilla/5.0 (BOLOG-Tracking-Proxy/1.0)",
                "Accept": "text/html,application/xhtml+xml,application/json",
            })

        if resp.status_code == 404:
            raise HTTPException(status_code=404, detail="Código de seguimiento no encontrado.")

        # Si el sistema devuelve JSON directamente
        content_type = resp.headers.get("content-type", "")
        if "application/json" in content_type:
            data = resp.json()
            return {
                "tracking_number": payload.tracking_number,
                "status": data.get("estado") or data.get("status", "—"),
                "location": data.get("ubicacion") or data.get("location", "—"),
                "estimated_delivery": data.get("fecha_entrega") or data.get("estimated_delivery", "—"),
                "raw": data,
                "source_url": tracking_url,
            }

        # Si devuelve HTML, retornamos la URL para que el frontend la muestre en un iframe
        return {
            "tracking_number": payload.tracking_number,
            "source_url": tracking_url,
            "html_mode": True,
        }

    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="El sistema de tracking externo tardó demasiado. Intente de nuevo."
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"No se pudo conectar al sistema de tracking: {str(e)}"
        )
