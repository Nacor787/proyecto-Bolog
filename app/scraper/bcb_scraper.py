import requests
from bs4 import BeautifulSoup
from datetime import datetime
import logging

def scrape_official_exchange_rate():
    url = "https://www.bcb.gob.bo/"
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Basado en la estructura HTML proporcionada:
        # div.bcb-tco-value -> div.bcb-tco-amount -> span.bcb-tco-num
        
        tco_amount_div = soup.find("div", class_="bcb-tco-amount")
        if not tco_amount_div:
            logging.error("No se encontró el div con clase bcb-tco-amount")
            return None
            
        tco_num_span = tco_amount_div.find("span", class_="bcb-tco-num")
        if not tco_num_span:
            logging.error("No se encontró el span con clase bcb-tco-num")
            return None
            
        rate_str = tco_num_span.text.strip().replace(",", ".")
        rate_float = float(rate_str)
        
        return rate_float
    except Exception as e:
        logging.error(f"Error scraping BCB exchange rate: {e}")
        return None

if __name__ == "__main__":
    rate = scrape_official_exchange_rate()
    print(f"Tipo de cambio oficial: {rate}")
