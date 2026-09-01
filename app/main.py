import sys
import os
from pathlib import Path

# Agregar la ruta raíz para permitir ejecutar uvicorn desde dentro de 'app'
sys.path.insert(0, str(Path(__file__).parent.parent))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import engine
import app.models # Register all models
from app.models import base
from app.scheduler.tasks import scheduler
from app.routes import tracking, auth, exchange_rate, roles, users, noticias, categories
from fastapi.staticfiles import StaticFiles
from app.database.connection import SessionLocal
from app.models.role import Role
from app.models.user import User
from passlib.context import CryptContext
from dotenv import load_dotenv
import os
from pathlib import Path

env_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path=env_path)

# Configurar orígenes permitidos
allowed_origins_str = os.getenv("ALLOWED_ORIGINS", "*")
origins = [origin.strip() for origin in allowed_origins_str.split(",")] if allowed_origins_str else ["*"]

# Crear tablas si no existen
base.Base.metadata.create_all(bind=engine)

app = FastAPI(title="BOLOG Logistics Group API")

# CORS setup para frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir archivos estaticos para imagenes hero
BASE_DIR = Path(__file__).parent
app.mount("/uploads", StaticFiles(directory=str(BASE_DIR / "uploads")), name="uploads")

app.include_router(tracking.router, tags=["Tracking"])
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(noticias.router, prefix="/api/noticias", tags=["Noticias"])
app.include_router(exchange_rate.router, prefix="/api/exchange-rate", tags=["Exchange Rate"])
app.include_router(roles.router, prefix="/api/roles", tags=["Roles"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])

app.include_router(categories.router, prefix="/api/categories", tags=["Categories"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.on_event("startup")
def startup_event():
    scheduler.start()
    
    # Ejecutar el tipo de cambio al iniciar si no hay dato del día
    from app.scheduler.tasks import update_exchange_rate
    from app.models.exchange_rate import ExchangeRate
    from datetime import date
    db_check = SessionLocal()
    try:
        today = date.today()
        existing = db_check.query(ExchangeRate).filter(ExchangeRate.date_recorded == today).first()
        if not existing:
            update_exchange_rate()
    finally:
        db_check.close()
    
    # Seeding database
    db = SessionLocal()
    try:


        admin_role = db.query(Role).filter(Role.name == "admin").first()
        if not admin_role:
            admin_role = Role(name="admin", description="Administrador del sistema")
            db.add(admin_role)
            db.commit()
            db.refresh(admin_role)
        
        admin_user = db.query(User).filter(User.username == "nacor").first()
        if not admin_user:
            admin_user = User(
                first_name="Nacor",
                last_name="BOLOG",
                username="nacor",
                email="nacor@blg.com.bo",
                password_hash=pwd_context.hash("nacor"),
                role_id=admin_role.id
            )
            db.add(admin_user)
            db.commit()
            

    finally:
        db.close()

@app.on_event("shutdown")
def shutdown_event():
    scheduler.shutdown()

@app.get("/")
def read_root():
    return {"message": "BOLOG API is running"}
