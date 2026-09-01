from apscheduler.schedulers.background import BackgroundScheduler
from app.scraper.bcb_scraper import scrape_official_exchange_rate
from app.database.connection import SessionLocal
from app.models.exchange_rate import ExchangeRate
from datetime import date
import logging

def update_exchange_rate():
    logging.info("Iniciando actualizacion de tipo de cambio BCB...")
    rate = scrape_official_exchange_rate()
    if rate is not None:
        db = SessionLocal()
        try:
            today = date.today()
            existing = db.query(ExchangeRate).filter(ExchangeRate.date_recorded == today).first()
            if not existing:
                new_rate = ExchangeRate(rate=rate, date_recorded=today)
                db.add(new_rate)
                db.commit()
                logging.info(f"Tipo de cambio guardado: {rate}")
            else:
                existing.rate = rate
                db.commit()
                logging.info(f"Tipo de cambio actualizado: {rate}")
        except Exception as e:
            logging.error(f"Error al guardar tipo de cambio: {e}")
            db.rollback()
        finally:
            db.close()

scheduler = BackgroundScheduler()
scheduler.add_job(update_exchange_rate, 'interval', hours=12)
