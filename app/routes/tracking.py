from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/tracking")
def track_shipment(tracking_number: str):
    # Dummy response for tracking
    statuses = ["In Transit", "Customs Clearance", "Out for Delivery", "Delivered"]
    locations = ["Miami, FL", "La Paz, BO", "Santa Cruz, BO", "Arica, CL"]
    
    return {
        "tracking_number": tracking_number,
        "status": random.choice(statuses),
        "location": random.choice(locations),
        "estimated_delivery": "2026-08-15"
    }
