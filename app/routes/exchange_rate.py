from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.connection import get_db
from app.models.exchange_rate import ExchangeRate

router = APIRouter()

@router.get("/current")
def get_current_exchange_rate(db: Session = Depends(get_db)):
    rate = db.query(ExchangeRate).order_by(ExchangeRate.date_recorded.desc()).first()
    if not rate:
        return {"rate": None}
    return {"rate": rate.rate, "date": rate.date_recorded}
