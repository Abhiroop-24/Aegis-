"""
Standard API response models
"""

from pydantic import BaseModel, Field
from typing import Generic, TypeVar, Optional, Any, List
from datetime import datetime


T = TypeVar('T')


class APIResponse(BaseModel, Generic[T]):
    """Standard successful API response"""
    data: T
    status: str = "success"
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "data": {"key": "value"},
                "status": "success",
                "timestamp": "2024-01-15T10:30:00Z"
            }
        }
    }


class ErrorResponse(BaseModel):
    """Standard error response"""
    error: str
    message: str
    details: Optional[Dict[str, Any]] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    request_id: Optional[str] = None
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "error": "ValidationError",
                "message": "Invalid bounding box coordinates",
                "details": {
                    "field": "bbox",
                    "provided": "invalid,coords",
                    "expected": "minLng,minLat,maxLng,maxLat"
                },
                "timestamp": "2024-01-15T10:30:00Z",
                "request_id": "req_abc123"
            }
        }
    }


class PaginatedResponse(BaseModel, Generic[T]):
    """Paginated API response"""
    data: List[T]
    total: int
    page: int
    page_size: int
    total_pages: int
    status: str = "success"
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "data": [],
                "total": 1000,
                "page": 1,
                "page_size": 100,
                "total_pages": 10,
                "status": "success",
                "timestamp": "2024-01-15T10:30:00Z"
            }
        }
    }
