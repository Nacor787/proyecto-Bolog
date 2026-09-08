from pydantic import BaseModel
from typing import Optional


class ContactForm(BaseModel):
    service: str
    name: str
    company: Optional[str] = None
    email: str
    phone: str
    origin: Optional[str] = None
    destination: Optional[str] = None
    pickupAddress: Optional[str] = None
    weight: Optional[str] = None
    details: str
