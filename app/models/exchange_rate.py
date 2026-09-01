from sqlalchemy import Column, Integer, Float, Date, DateTime
from datetime import datetime
from app.models.base import Base

class ExchangeRate(Base):
    __tablename__ = "exchange_rates"

    id = Column(Integer, primary_key=True, index=True)
    rate = Column(Float, nullable=False)
    date_recorded = Column(Date, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
