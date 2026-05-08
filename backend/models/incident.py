"""
Incident data models with validation
"""

from pydantic import BaseModel, Field, field_validator
from datetime import datetime
from typing import Optional, Dict, Any, Literal


class Location(BaseModel):
    """Geographic location with validation"""
    latitude: float = Field(..., ge=-90, le=90, description="Latitude coordinate")
    longitude: float = Field(..., ge=-180, le=180, description="Longitude coordinate")
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "latitude": 41.8781,
                "longitude": -87.6298
            }
        }
    }


class IncidentBase(BaseModel):
    """Base incident model"""
    incident_type: str = Field(..., min_length=1, max_length=100)
    severity: Literal[1, 2, 3, 4, 5] = Field(..., description="Severity level from 1 (low) to 5 (critical)")
    description: Optional[str] = Field(None, max_length=1000)
    location: Location
    occurred_at: datetime
    reported_at: Optional[datetime] = None
    source: str = Field(..., min_length=1, max_length=100)
    metadata: Optional[Dict[str, Any]] = None


class IncidentCreate(IncidentBase):
    """Model for creating new incidents"""
    external_id: Optional[str] = Field(None, max_length=255)


class Incident(IncidentBase):
    """Complete incident model with ID"""
    id: str
    external_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "external_id": "CHI-2024-001234",
                "incident_type": "theft",
                "severity": 3,
                "description": "Vehicle theft reported in downtown area",
                "location": {
                    "latitude": 41.8781,
                    "longitude": -87.6298
                },
                "occurred_at": "2024-01-15T14:30:00Z",
                "reported_at": "2024-01-15T15:00:00Z",
                "source": "chicago_pd",
                "metadata": {
                    "case_number": "JG123456",
                    "district": "001"
                },
                "created_at": "2024-01-15T15:05:00Z",
                "updated_at": "2024-01-15T15:05:00Z"
            }
        }
    }


class IncidentResponse(BaseModel):
    """GeoJSON-compatible incident response"""
    type: str = "Feature"
    id: str
    geometry: Dict[str, Any]
    properties: Dict[str, Any]
    
    @classmethod
    def from_incident(cls, incident: Incident) -> "IncidentResponse":
        """Convert Incident to GeoJSON Feature"""
        return cls(
            id=incident.id,
            geometry={
                "type": "Point",
                "coordinates": [incident.location.longitude, incident.location.latitude]
            },
            properties={
                "incident_type": incident.incident_type,
                "severity": incident.severity,
                "description": incident.description,
                "occurred_at": incident.occurred_at.isoformat(),
                "reported_at": incident.reported_at.isoformat() if incident.reported_at else None,
                "source": incident.source,
                "metadata": incident.metadata,
            }
        )
