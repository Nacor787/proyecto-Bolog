from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NewsBase(BaseModel):
    title: str
    content: str
    image_url: Optional[str] = None
    is_featured: bool = False
    category_id: Optional[int] = None

class NewsCreate(NewsBase):
    pass

class NewsResponse(NewsBase):
    id: int
    slug: str
    created_at: datetime
    
    class Config:
        from_attributes = True
