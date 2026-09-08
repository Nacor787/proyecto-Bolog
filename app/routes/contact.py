import os
import smtplib
from email.message import EmailMessage
from fastapi import APIRouter, BackgroundTasks
from app.schemas.contact_schema import ContactForm

router = APIRouter()

def send_email_task(data: ContactForm):
    smtp_server = os.getenv("SMTP_SERVER", "smtp.hostinger.com")
    smtp_port = int(os.getenv("SMTP_PORT", 465))
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    
    if not smtp_user or not smtp_pass:
        print("Error: SMTP_USER or SMTP_PASS not configured in .env")
        return

    msg = EmailMessage()
    msg['Subject'] = f"Nueva Cotización: {data.service} - {data.name}"
    msg['From'] = smtp_user
    msg['To'] = smtp_user # Send to ourselves
    msg['Reply-To'] = data.email
    
    body = f"""Has recibido una nueva solicitud de cotización desde la web.

Detalles del contacto:
----------------------
Servicio: {data.service}
Nombre: {data.name}
Empresa: {data.company or 'No especificado'}
Correo: {data.email}
Teléfono: {data.phone}

Detalles de la operación:
-------------------------
Origen: {data.origin or 'No especificado'}
Destino: {data.destination or 'No especificado'}
Dirección de Recojo: {data.pickupAddress or 'No especificado'}
Peso Estimado: {data.weight or 'No especificado'}

Mensaje:
--------
{data.details}
"""
    msg.set_content(body)
    
    try:
        # Usamos SMTP_SSL para el puerto 465 (por defecto en Hostinger)
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as smtp:
            smtp.login(smtp_user, smtp_pass)
            smtp.send_message(msg)
    except Exception as e:
        print(f"Error enviando correo: {e}")

@router.post("/")
async def submit_contact_form(data: ContactForm, background_tasks: BackgroundTasks):
    # Procesar el envío de correo en segundo plano para no bloquear la respuesta rápida al usuario
    background_tasks.add_task(send_email_task, data)
    return {"message": "Formulario recibido con éxito"}
