# Design Document: Aegis Platform

## Overview

Aegis is an AI-powered urban safety intelligence and navigation platform that combines real-time incident data aggregation, geospatial analysis, machine learning-based risk prediction, and autonomous agent systems to provide users with actionable safety insights and intelligent route recommendations.

### System Purpose

The platform serves three primary purposes:
1. **Safety Intelligence**: Aggregate and visualize public safety incident data to help users understand risk patterns in urban areas
2. **Predictive Analytics**: Use machine learning to forecast risk levels based on temporal and spatial patterns
3. **Smart Navigation**: Provide route optimization that balances travel time with safety considerations

### Key Design Principles

- **Privacy-First**: Focus on aggregate incident patterns rather than individual records
- **Real-Time Responsiveness**: Provide sub-second response times for critical user interactions
- **Scalability**: Handle datasets with 100,000+ incidents while maintaining performance
- **Modularity**: Separate concerns between frontend, backend, AI agents, and data storage
- **Progressive Enhancement**: Deliver core functionality on all devices with enhanced features on capable platforms

## Architecture

### High-Level System Architecture

The Aegis platform follows a modern three-tier architecture with an additional AI/ML layer:

```mermaid
graph TB
    subgraph "Client Layer"
        A[Next.js Frontend]
        A1[React Components]
        A2[Mapbox/Leaflet]
        A3[Chart.js/Recharts]
    end
    
    subgraph "API Layer"
        B[FastAPI Backend]
        B1[REST Endpoints]
        B2[Route Optimizer]
        B3[Risk Analyzer]
    end
    
    subgraph "Data Layer"
        C[PostgreSQL + PostGIS]
        C1[Incident Store]
        C2[Spatial Indexes]
    end
    
    subgraph "AI/ML Layer"
        D[LangGraph Orchestrator]
        D1[Data Collector Agent]
        D2[Prediction Agent]
        D3[Report Generator Agent]
        E[Ollama LLM]
        F[ChromaDB Vector Store]
    end
    
    A --> B
    B --> C
    B --> D
    D --> E
    D --> F
    D --> C
```

### Technology Stack

**Frontend:**
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Mapping**: Mapbox GL JS or Leaflet
- **Charts**: Chart.js or Recharts
- **Animations**: Framer Motion
- **State Management**: React Context + SWR for data fetching
- **Deployment**: Vercel

**Backend:**
- **Framework**: FastAPI (Python 3.11+)
- **ORM**: SQLAlchemy with GeoAlchemy2
- **Validation**: Pydantic v2
- **Async Runtime**: asyncio + uvicorn
- **Caching**: Redis (optional for production)
- **Deployment**: Render or Railway

**Database:**
- **Primary Database**: PostgreSQL 15+
- **Geospatial Extension**: PostGIS 3.3+
- **Hosting**: Supabase
- **Connection Pooling**: pgBouncer

**AI/ML Stack:**
- **Agent Orchestration**: LangGraph
- **LLM Runtime**: Ollama (local inference)
- **Models**: Llama 3.1 or Mistral
- **Vector Database**: ChromaDB
- **ML Framework**: scikit-learn, XGBoost
- **Embeddings**: sentence-transformers

### Deployment Architecture

```mermaid
graph LR
    A[User Browser] -->|HTTPS| B[Vercel CDN]
    B --> C[Next.js Frontend]
    C -->|REST API| D[Render Backend]
    D --> E[Supabase PostgreSQL]
    D --> F[Ollama Service]
    D --> G[ChromaDB]
    F --> H[Local LLM Models]
```

## Components and Interfaces

### Frontend Components

#### 1. Map Component (`components/Map`)

**Responsibilities:**
- Render interactive map with incident markers
- Display heatmap layer for incident density
- Handle user interactions (pan, zoom, click)
- Manage marker clustering for performance

**Key Interfaces:**
```typescript
interface MapProps {
  center: [number, number];
  zoom: number;
  incidents: Incident[];
  heatmapEnabled: boolean;
  onMarkerClick: (incident: Incident) => void;
}

interface Incident {
  id: string;
  latitude: number;
  longitude: number;
  type: string;
  severity: number;
  timestamp: string;
  description: string;
}
```

**Dependencies:**
- Mapbox GL JS or Leaflet library
- Incident data from API
- User location service

#### 2. Dashboard Component (`components/Dashboard`)

**Responsibilities:**
- Display analytics charts and visualizations
- Show incident trends by time and type
- Render hotspot rankings
- Handle time range filtering

**Key Interfaces:**
```typescript
interface DashboardProps {
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
}

interface AnalyticsData {
  incidentsByType: Record<string, number>;
  incidentsByHour: number[];
  incidentsByDay: number[];
  hotspots: Hotspot[];
  trends: TrendData;
}
```

#### 3. Route Planner Component (`components/RoutePlanner`)

**Responsibilities:**
- Accept origin and destination inputs
- Display multiple route options
- Show safety scores and travel times
- Highlight route differences

**Key Interfaces:**
```typescript
interface RoutePlannerProps {
  onRouteRequest: (origin: Location, destination: Location) => void;
}

interface RouteOption {
  id: string;
  path: [number, number][];
  distance: number;
  duration: number;
  safetyScore: number;
  type: 'fastest' | 'safest';
}
```

#### 4. Alert Component (`components/Alert`)

**Responsibilities:**
- Display safety alerts to users
- Show severity indicators
- Allow dismissal and acknowledgment
- Manage alert queue

**Key Interfaces:**
```typescript
interface AlertProps {
  alerts: SafetyAlert[];
  onDismiss: (alertId: string) => void;
}

interface SafetyAlert {
  id: string;
  severity: 'low' | 'medium' | 'high';
  area: string;
  message: string;
  timestamp: string;
  recommendations: string[];
}
```

### Backend API Endpoints

#### Incident Endpoints

```
GET /api/v1/incidents
  Query Parameters:
    - bbox: string (bounding box: "minLng,minLat,maxLng,maxLat")
    - radius: number (meters)
    - center: string ("lng,lat")
    - start_date: string (ISO 8601)
    - end_date: string (ISO 8601)
    - types: string[] (comma-separated)
    - limit: number (default: 1000)
    - offset: number (default: 0)
  Response: { data: Incident[], total: number, page: number }

GET /api/v1/incidents/{id}
  Response: { data: Incident }
```

#### Safety Score Endpoints

```
GET /api/v1/safety/score
  Query Parameters:
    - lat: number
    - lng: number
    - radius: number (meters, default: 500)
  Response: { data: { score: number, level: string, factors: object } }

GET /api/v1/safety/heatmap
  Query Parameters:
    - bbox: string
    - resolution: number (grid size)
  Response: { data: HeatmapCell[] }
```

#### Route Optimization Endpoints

```
POST /api/v1/routes/optimize
  Body: {
    origin: { lat: number, lng: number },
    destination: { lat: number, lng: number },
    time: string (ISO 8601, optional)
  }
  Response: { data: { fastest: Route, safest: Route } }
```

#### Prediction Endpoints

```
GET /api/v1/predictions/risk
  Query Parameters:
    - lat: number
    - lng: number
    - time: string (ISO 8601)
    - horizon: string ('24h' | '7d' | '30d')
  Response: { data: { risk_level: string, confidence: number, factors: object } }
```

#### Analytics Endpoints

```
GET /api/v1/analytics/trends
  Query Parameters:
    - start_date: string
    - end_date: string
    - granularity: string ('hour' | 'day' | 'week' | 'month')
  Response: { data: TrendData }

GET /api/v1/analytics/hotspots
  Query Parameters:
    - bbox: string
    - limit: number
  Response: { data: Hotspot[] }
```

#### Report Endpoints

```
GET /api/v1/reports/area
  Query Parameters:
    - lat: number
    - lng: number
    - radius: number
  Response: { data: { summary: string, sections: ReportSection[] } }
```

### Backend Service Components

#### 1. Risk Analyzer Service

**Responsibilities:**
- Calculate safety scores for geographic areas
- Detect incident spikes and anomalies
- Identify hotspots based on density thresholds
- Weight incidents by severity and recency

**Key Methods:**
```python
class RiskAnalyzer:
    def calculate_safety_score(
        self,
        lat: float,
        lng: float,
        radius: float = 500
    ) -> SafetyScore
    
    def detect_hotspots(
        self,
        bbox: BoundingBox,
        threshold: float = 2.0
    ) -> List[Hotspot]
    
    def detect_spike(
        self,
        area: Area,
        window: timedelta
    ) -> Optional[IncidentSpike]
```

#### 2. Route Optimizer Service

**Responsibilities:**
- Generate multiple route options
- Calculate route safety scores
- Balance time vs. safety tradeoffs
- Avoid high-risk areas when possible

**Key Methods:**
```python
class RouteOptimizer:
    def optimize_routes(
        self,
        origin: Location,
        destination: Location,
        time: datetime
    ) -> RouteOptions
    
    def calculate_route_safety(
        self,
        path: List[Location]
    ) -> float
    
    def score_route_segment(
        self,
        segment: LineString,
        time: datetime
    ) -> float
```

#### 3. Data Collector Service

**Responsibilities:**
- Fetch incident data from external APIs
- Clean and normalize data
- Deduplicate records
- Validate geographic coordinates

**Key Methods:**
```python
class DataCollector:
    async def fetch_incidents(
        self,
        source: DataSource,
        start_date: date,
        end_date: date
    ) -> List[RawIncident]
    
    def clean_incident(
        self,
        raw: RawIncident
    ) -> Optional[Incident]
    
    def deduplicate(
        self,
        incidents: List[Incident]
    ) -> List[Incident]
```

## Data Models

### Database Schema

#### Incidents Table

```sql
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_id VARCHAR(255) UNIQUE,
    incident_type VARCHAR(100) NOT NULL,
    severity INTEGER CHECK (severity BETWEEN 1 AND 5),
    description TEXT,
    location GEOMETRY(Point, 4326) NOT NULL,
    occurred_at TIMESTAMP WITH TIME ZONE NOT NULL,
    reported_at TIMESTAMP WITH TIME ZONE,
    source VARCHAR(100),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Spatial index for location queries
CREATE INDEX idx_incidents_location ON incidents USING GIST(location);

-- Temporal index for time-based queries
CREATE INDEX idx_incidents_occurred_at ON incidents(occurred_at DESC);

-- Composite index for type filtering
CREATE INDEX idx_incidents_type_time ON incidents(incident_type, occurred_at DESC);
```

#### Safety Scores Cache Table

```sql
CREATE TABLE safety_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location GEOMETRY(Point, 4326) NOT NULL,
    radius INTEGER NOT NULL,
    score DECIMAL(5, 2) CHECK (score BETWEEN 0 AND 100),
    level VARCHAR(20),
    incident_count INTEGER,
    calculated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    UNIQUE(location, radius)
);

CREATE INDEX idx_safety_scores_location ON safety_scores USING GIST(location);
```

#### Hotspots Table

```sql
CREATE TABLE hotspots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    area GEOMETRY(Polygon, 4326) NOT NULL,
    centroid GEOMETRY(Point, 4326) NOT NULL,
    incident_count INTEGER NOT NULL,
    severity_avg DECIMAL(3, 2),
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    active BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_hotspots_area ON hotspots USING GIST(area);
CREATE INDEX idx_hotspots_active ON hotspots(active) WHERE active = TRUE;
```

#### Predictions Table

```sql
CREATE TABLE predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location GEOMETRY(Point, 4326) NOT NULL,
    prediction_time TIMESTAMP WITH TIME ZONE NOT NULL,
    horizon VARCHAR(10) NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    confidence DECIMAL(3, 2),
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_predictions_location_time ON predictions(location, prediction_time);
```

### Pydantic Models

#### Incident Model

```python
from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional

class Location(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)

class Incident(BaseModel):
    id: str
    external_id: Optional[str] = None
    incident_type: str
    severity: int = Field(..., ge=1, le=5)
    description: Optional[str] = None
    location: Location
    occurred_at: datetime
    reported_at: Optional[datetime] = None
    source: str
    metadata: Optional[dict] = None
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "incident_type": "theft",
                "severity": 3,
                "location": {"latitude": 41.8781, "longitude": -87.6298},
                "occurred_at": "2024-01-15T14:30:00Z",
                "source": "chicago_pd"
            }
        }
```

#### Safety Score Model

```python
class SafetyScore(BaseModel):
    score: float = Field(..., ge=0, le=100)
    level: str  # 'very_safe', 'safe', 'moderate', 'risky', 'dangerous'
    location: Location
    radius: int
    incident_count: int
    factors: dict
    calculated_at: datetime
    
    @validator('level')
    def validate_level(cls, v):
        valid_levels = ['very_safe', 'safe', 'moderate', 'risky', 'dangerous']
        if v not in valid_levels:
            raise ValueError(f'Level must be one of {valid_levels}')
        return v
```

#### Route Model

```python
class RouteSegment(BaseModel):
    start: Location
    end: Location
    distance: float  # meters
    safety_score: float

class Route(BaseModel):
    id: str
    type: str  # 'fastest' or 'safest'
    path: list[Location]
    segments: list[RouteSegment]
    total_distance: float  # meters
    estimated_duration: int  # seconds
    overall_safety_score: float
    risk_areas: list[dict]
```

## Multi-Agent System Architecture

### Agent Orchestration with LangGraph

The Aegis platform uses LangGraph to orchestrate multiple autonomous agents that work together to analyze incident data, generate predictions, and produce insights.

```mermaid
graph TD
    A[Scheduler] -->|Daily| B[Data Collector Agent]
    B -->|New Data| C[Risk Analyzer Agent]
    C -->|Hotspots Detected| D[Alert Generator Agent]
    C -->|Patterns Found| E[Prediction Agent]
    E -->|Forecasts Ready| F[Report Generator Agent]
    F -->|Reports Complete| G[Notification Service]
    
    B --> H[(PostgreSQL)]
    C --> H
    E --> H
    E --> I[(ChromaDB)]
    F --> I
    F --> J[Ollama LLM]
```

### Agent Definitions

#### 1. Data Collector Agent

**Purpose**: Fetch and process incident data from external sources

**Workflow:**
1. Connect to configured data sources (Chicago, NYC, London APIs)
2. Fetch incidents for the specified time range
3. Clean and normalize data (handle missing fields, validate coordinates)
4. Deduplicate based on location + timestamp
5. Store validated incidents in PostgreSQL
6. Update collection metadata

**Tools:**
- HTTP client for API requests
- Data validation functions
- Database write operations

**Schedule**: Daily at 2:00 AM UTC

#### 2. Risk Analyzer Agent

**Purpose**: Analyze incident patterns and calculate safety metrics

**Workflow:**
1. Query recent incidents from database
2. Calculate safety scores for grid cells across the city
3. Detect hotspots using density-based clustering
4. Identify incident spikes by comparing to historical baselines
5. Update safety score cache
6. Trigger alerts for significant changes

**Tools:**
- Geospatial query functions
- Statistical analysis functions
- Clustering algorithms (DBSCAN)

**Schedule**: Every 6 hours

#### 3. Prediction Agent

**Purpose**: Generate risk forecasts using machine learning

**Workflow:**
1. Load trained ML model (Random Forest or XGBoost)
2. Extract features for target locations and times
3. Generate predictions for 24h, 7d, and 30d horizons
4. Store predictions in database
5. Update model performance metrics

**Features Used:**
- Temporal: hour, day_of_week, month, season, is_weekend
- Spatial: latitude, longitude, nearby_incident_count, area_safety_score
- Historical: avg_incidents_same_hour, avg_incidents_same_day

**Model Training**: Weekly retraining with updated data

#### 4. Report Generator Agent

**Purpose**: Produce natural language safety reports

**Workflow:**
1. Receive request for area report (location + radius)
2. Query relevant incidents from database
3. Retrieve similar historical patterns from ChromaDB
4. Generate report sections using Ollama LLM:
   - Executive summary
   - Incident breakdown by type
   - Temporal patterns
   - Hotspot identification
   - Safety recommendations
5. Format report with visualizations
6. Store report for caching

**LLM Prompts:**
```python
REPORT_SUMMARY_PROMPT = """
Based on the following incident data for {area_name}:
- Total incidents: {count}
- Time period: {start_date} to {end_date}
- Most common types: {top_types}
- Trend: {trend_direction}

Generate a concise 2-3 sentence summary of the safety situation.
"""

RECOMMENDATIONS_PROMPT = """
Given the incident patterns:
{pattern_description}

Provide 3-5 specific, actionable safety recommendations for residents and visitors.
"""
```

### Vector Store Usage

ChromaDB stores embeddings for:
- Historical incident patterns
- Previous safety reports
- Area characteristics
- Temporal trends

**Embedding Strategy:**
```python
# Create embeddings for incident patterns
pattern_text = f"""
Area: {area_name}
Time: {time_period}
Incidents: {incident_summary}
Trend: {trend_description}
"""

embedding = embedding_model.encode(pattern_text)
collection.add(
    embeddings=[embedding],
    documents=[pattern_text],
    metadatas=[{"area": area_name, "date": date}],
    ids=[pattern_id]
)
```

**Retrieval for Context:**
```python
# Find similar historical patterns
query_embedding = embedding_model.encode(current_pattern)
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5
)
```

## Data Flow

### User Request Flow

```mermaid
sequenceDiagram
    participant U as User Browser
    participant F as Next.js Frontend
    participant B as FastAPI Backend
    participant D as PostgreSQL
    participant C as Cache
    
    U->>F: Load map page
    F->>F: Get user location
    F->>B: GET /api/v1/incidents?bbox=...
    B->>C: Check cache
    alt Cache hit
        C->>B: Return cached data
    else Cache miss
        B->>D: Query incidents with spatial index
        D->>B: Return incidents
        B->>C: Store in cache
    end
    B->>F: Return JSON response
    F->>F: Render markers on map
    F->>U: Display interactive map
```

### Route Optimization Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant R as Route Optimizer
    participant D as Database
    
    U->>F: Request route (origin, destination)
    F->>B: POST /api/v1/routes/optimize
    B->>R: Calculate routes
    R->>D: Query incidents along potential paths
    D->>R: Return incident data
    R->>R: Score route segments
    R->>R: Generate fastest route
    R->>R: Generate safest route
    R->>B: Return route options
    B->>F: Return routes with scores
    F->>F: Render routes on map
    F->>U: Display route comparison
```

### Agent Workflow

```mermaid
sequenceDiagram
    participant S as Scheduler
    participant DC as Data Collector
    participant RA as Risk Analyzer
    participant PA as Prediction Agent
    participant RG as Report Generator
    participant DB as Database
    participant LLM as Ollama
    
    S->>DC: Trigger daily collection
    DC->>DC: Fetch from APIs
    DC->>DB: Store incidents
    DC->>RA: Notify new data
    RA->>DB: Query incidents
    RA->>RA: Calculate safety scores
    RA->>DB: Update scores
    RA->>PA: Trigger predictions
    PA->>DB: Load features
    PA->>PA: Run ML model
    PA->>DB: Store predictions
    PA->>RG: Request reports
    RG->>DB: Query data
    RG->>LLM: Generate text
    LLM->>RG: Return report
    RG->>DB: Store report
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

The Aegis platform includes several data parsing and serialization components that are well-suited for property-based testing. These components handle configuration files, incident data from external sources, and API responses. The following properties ensure that these critical data transformation operations maintain correctness across all possible inputs.


### Property 1: Configuration Round-Trip Preservation

*For any* valid Configuration object in either JSON or YAML format, serializing it to a configuration file and then parsing that file back SHALL produce an equivalent Configuration object with all fields and values preserved.

**Validates: Requirements 17.1, 17.5, 17.6, 17.7**

### Property 2: Configuration Validation Completeness

*For any* Configuration object, the validator SHALL correctly identify all missing required fields (database URL, API keys, deployment environment) and all type/range violations, returning descriptive error messages for each validation failure.

**Validates: Requirements 17.3, 17.4**

### Property 3: Configuration Error Handling

*For any* invalid configuration file (malformed syntax, missing required fields, invalid types), the parser SHALL return a descriptive error message rather than crashing or producing an invalid Configuration object.

**Validates: Requirements 17.2**

### Property 4: Incident Data Round-Trip Preservation

*For any* valid Incident object, serializing it to JSON or GeoJSON format and then parsing that serialized data back SHALL produce an equivalent Incident object with all fields, geometry, and metadata preserved.

**Validates: Requirements 18.1, 18.2, 18.3, 18.5, 18.6, 18.7**

### Property 5: Incident Parser Error Reporting

*For any* invalid incident data (missing required fields, invalid coordinates, wrong types), the parser SHALL return descriptive error messages that identify the specific problematic records and fields.

**Validates: Requirements 18.4**

### Property 6: Incident Default Value Handling

*For any* incident data with missing optional fields, the parser SHALL apply appropriate default values consistently, and the resulting Incident object SHALL be valid and complete.

**Validates: Requirements 18.8**

### Property 7: API Response Round-Trip Preservation

*For any* valid Response object (success or error), serializing it to JSON and then deserializing that JSON back SHALL produce an equivalent Response object with all data, timestamps, and metadata preserved.

**Validates: Requirements 19.6**

### Property 8: API Response Schema Consistency

*For any* API response, successful responses SHALL contain data, status, and timestamp fields in the standard Response_Schema format, and error responses SHALL contain error, message, and details fields in the standard Error_Schema format.

**Validates: Requirements 19.1, 19.2**

### Property 9: Datetime Serialization Format

*For any* Response object containing datetime values, serializing the response SHALL format all datetime objects in valid ISO 8601 format, and deserializing SHALL correctly parse them back to equivalent datetime objects.

**Validates: Requirements 19.3**

### Property 10: Coordinate Serialization Format

*For any* Response object containing geospatial coordinates, serializing the response SHALL format all coordinates as [longitude, latitude] arrays, and deserializing SHALL correctly parse them back to equivalent coordinate pairs.

**Validates: Requirements 19.4**

### Property 11: Null Value Handling Consistency

*For any* Response object containing null values in any fields, serializing and deserializing SHALL preserve null values consistently across all response types without converting them to empty strings, zeros, or other default values.

**Validates: Requirements 19.5**

## Error Handling

### Error Categories

The Aegis platform implements comprehensive error handling across all layers:

#### 1. Client-Side Errors

**Network Errors:**
- Display user-friendly messages for connection failures
- Implement retry logic with exponential backoff
- Show offline indicators when network is unavailable

**Validation Errors:**
- Validate user inputs before submission
- Display inline error messages for form fields
- Prevent invalid data from reaching the backend

**Rendering Errors:**
- Implement React error boundaries
- Display fallback UI for component crashes
- Log errors to monitoring service

**Example Error Boundary:**
```typescript
class MapErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Map rendering error:', error, errorInfo);
    // Log to monitoring service
  }
  
  render() {
    if (this.state.hasError) {
      return <MapFallback message="Unable to load map" />;
    }
    return this.props.children;
  }
}
```

#### 2. API-Level Errors

**Request Validation:**
```python
from fastapi import HTTPException, status

@app.get("/api/v1/incidents")
async def get_incidents(
    bbox: str = Query(..., regex=r"^-?\d+\.?\d*,-?\d+\.?\d*,-?\d+\.?\d*,-?\d+\.?\d*$")
):
    try:
        coords = parse_bbox(bbox)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid bounding box format: {str(e)}"
        )
```

**Database Errors:**
- Catch and log database connection errors
- Return 503 Service Unavailable for database outages
- Implement connection retry logic
- Use circuit breakers for repeated failures

**Rate Limiting:**
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.get("/api/v1/incidents")
@limiter.limit("100/minute")
async def get_incidents():
    # Endpoint logic
    pass
```

#### 3. Data Processing Errors

**Parsing Errors:**
- Validate data format before parsing
- Return descriptive error messages with line numbers
- Log malformed data for investigation
- Continue processing valid records when possible

**Geospatial Errors:**
- Validate coordinate ranges (lat: -90 to 90, lng: -180 to 180)
- Handle invalid geometries gracefully
- Provide fallback for missing location data

**ML Model Errors:**
- Catch prediction failures and return cached results
- Log model errors for retraining consideration
- Provide confidence scores with predictions

#### 4. Agent Errors

**Task Failures:**
- Implement retry logic for transient failures
- Log agent errors with full context
- Send alerts for repeated failures
- Gracefully degrade functionality when agents fail

**LLM Errors:**
- Handle timeout errors from Ollama
- Implement fallback responses for generation failures
- Validate LLM outputs before using them

### Error Response Format

All API errors follow a consistent format:

```json
{
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
```

### Logging Strategy

**Log Levels:**
- **DEBUG**: Detailed information for debugging (development only)
- **INFO**: General informational messages (agent tasks, API requests)
- **WARNING**: Warning messages (rate limit approaching, cache misses)
- **ERROR**: Error messages (failed requests, parsing errors)
- **CRITICAL**: Critical errors (database connection lost, service down)

**Structured Logging:**
```python
import structlog

logger = structlog.get_logger()

logger.info(
    "incident_query",
    bbox=bbox,
    count=len(incidents),
    duration_ms=duration,
    user_id=user_id
)
```

## Testing Strategy

The Aegis platform employs a comprehensive testing strategy that combines multiple testing approaches to ensure correctness, reliability, and performance.

### Unit Testing

**Scope**: Individual functions and components in isolation

**Tools:**
- **Frontend**: Jest + React Testing Library
- **Backend**: pytest + pytest-asyncio
- **Coverage Target**: 80% code coverage

**Focus Areas:**
- Component rendering and user interactions
- API endpoint logic and validation
- Data transformation functions
- Utility functions and helpers

**Example Unit Test:**
```python
def test_calculate_safety_score():
    """Test safety score calculation with known inputs"""
    incidents = [
        create_incident(severity=5, days_ago=1),
        create_incident(severity=3, days_ago=7),
        create_incident(severity=2, days_ago=30)
    ]
    
    score = calculate_safety_score(
        lat=41.8781,
        lng=-87.6298,
        radius=500,
        incidents=incidents
    )
    
    assert 0 <= score <= 100
    assert score < 50  # Should be low due to recent severe incident
```

### Property-Based Testing

**Scope**: Data parsing, serialization, and transformation components (Requirements 17, 18, 19)

**Tools:**
- **Python**: Hypothesis
- **TypeScript**: fast-check (if needed for frontend parsing)

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with feature name and property number
- Shrinking enabled to find minimal failing examples

**Property Test Implementation:**

```python
from hypothesis import given, strategies as st
import hypothesis.strategies as st

# Strategy for generating valid Configuration objects
@st.composite
def configuration_strategy(draw):
    return Configuration(
        database_url=draw(st.text(min_size=10)),
        api_key=draw(st.text(min_size=20)),
        environment=draw(st.sampled_from(['dev', 'staging', 'prod'])),
        port=draw(st.integers(min_value=1024, max_value=65535))
    )

@given(config=configuration_strategy())
def test_config_round_trip(config):
    """
    Feature: aegis-platform, Property 1: Configuration Round-Trip Preservation
    
    For any valid Configuration object, serializing and parsing
    should produce an equivalent object.
    """
    # Serialize to JSON
    json_str = config.to_json()
    parsed = Configuration.from_json(json_str)
    assert parsed == config
    
    # Serialize to YAML
    yaml_str = config.to_yaml()
    parsed = Configuration.from_yaml(yaml_str)
    assert parsed == config

@given(
    lat=st.floats(min_value=-90, max_value=90),
    lng=st.floats(min_value=-180, max_value=180),
    incident_type=st.sampled_from(['theft', 'assault', 'vandalism']),
    severity=st.integers(min_value=1, max_value=5)
)
def test_incident_round_trip(lat, lng, incident_type, severity):
    """
    Feature: aegis-platform, Property 4: Incident Data Round-Trip Preservation
    
    For any valid Incident object, serializing and parsing
    should preserve all data.
    """
    incident = Incident(
        id=str(uuid.uuid4()),
        location=Location(latitude=lat, longitude=lng),
        incident_type=incident_type,
        severity=severity,
        occurred_at=datetime.now(),
        source="test"
    )
    
    # Test JSON round-trip
    json_data = incident.to_json()
    parsed = Incident.from_json(json_data)
    assert parsed == incident
    
    # Test GeoJSON round-trip
    geojson_data = incident.to_geojson()
    parsed = Incident.from_geojson(geojson_data)
    assert parsed == incident
```

### Integration Testing

**Scope**: API endpoints, database operations, agent workflows

**Tools:**
- **Backend**: pytest with test database
- **Database**: PostgreSQL test instance with PostGIS
- **Mocking**: pytest-mock for external services

**Focus Areas:**
- End-to-end API request/response cycles
- Database query performance
- Agent task execution
- External API integration

**Example Integration Test:**
```python
@pytest.mark.asyncio
async def test_incident_query_endpoint(test_client, test_db):
    """Test incident query with spatial filtering"""
    # Setup: Insert test incidents
    await insert_test_incidents(test_db, count=100)
    
    # Execute: Query incidents in bounding box
    response = await test_client.get(
        "/api/v1/incidents",
        params={"bbox": "-87.7,41.8,-87.6,41.9"}
    )
    
    # Assert: Verify response
    assert response.status_code == 200
    data = response.json()
    assert "data" in data
    assert len(data["data"]) > 0
    assert all(
        -87.7 <= inc["location"]["longitude"] <= -87.6
        for inc in data["data"]
    )
```

### End-to-End Testing

**Scope**: Complete user workflows through the UI

**Tools:**
- Playwright or Cypress
- Visual regression testing with Percy

**Focus Areas:**
- Map loading and interaction
- Route planning workflow
- Dashboard filtering and visualization
- Alert display and dismissal

**Example E2E Test:**
```typescript
test('user can plan a safe route', async ({ page }) => {
  await page.goto('/');
  
  // Enter origin
  await page.fill('[data-testid="origin-input"]', 'Chicago Union Station');
  
  // Enter destination
  await page.fill('[data-testid="destination-input"]', 'Navy Pier');
  
  // Click plan route
  await page.click('[data-testid="plan-route-button"]');
  
  // Wait for routes to load
  await page.waitForSelector('[data-testid="route-option"]');
  
  // Verify both routes are displayed
  const routes = await page.$$('[data-testid="route-option"]');
  expect(routes.length).toBe(2);
  
  // Verify safety scores are shown
  const safetyScores = await page.$$('[data-testid="safety-score"]');
  expect(safetyScores.length).toBe(2);
});
```

### Performance Testing

**Scope**: API response times, map rendering, database queries

**Tools:**
- Locust for load testing
- Lighthouse for frontend performance
- pg_stat_statements for query analysis

**Performance Targets:**
- API response time: < 500ms (p95)
- Map initial load: < 3s on 4G
- Database queries: < 200ms for spatial queries
- Concurrent users: 1000+ without degradation

### Testing for Non-PBT Requirements

For requirements not suitable for property-based testing (UI rendering, infrastructure, ML models), we use:

**UI Components:**
- Snapshot testing for component rendering
- Visual regression testing for layout
- Interaction testing with React Testing Library

**Infrastructure (IaC):**
- Not applicable (using managed services: Vercel, Render, Supabase)
- Configuration validation through unit tests

**ML Models:**
- Validation dataset testing (accuracy, precision, recall)
- Cross-validation during training
- A/B testing in production

**Geospatial Operations:**
- Example-based tests with known coordinates
- Boundary condition tests (poles, date line, equator)
- Performance tests with large datasets

### Continuous Integration

**CI Pipeline:**
1. Lint and format check (ESLint, Black, Prettier)
2. Unit tests with coverage report
3. Property-based tests (100 iterations)
4. Integration tests with test database
5. Build verification
6. E2E tests on staging environment

**Pre-commit Hooks:**
- Format code automatically
- Run fast unit tests
- Validate commit message format

## Implementation Phases

### Week 1: Foundation and Data Layer

**Goals:**
- Set up project structure and development environment
- Implement database schema and basic API
- Create data collection agent
- Build basic frontend with map display

**Tasks:**
1. Initialize Next.js and FastAPI projects
2. Set up PostgreSQL with PostGIS on Supabase
3. Implement database schema and migrations
4. Create Pydantic models for data validation
5. Implement data collector agent
6. Build REST API endpoints for incident queries
7. Create basic map component with Mapbox
8. Implement incident marker rendering

**Deliverables:**
- Working API with incident endpoints
- Database populated with real incident data
- Basic map displaying incidents
- Unit tests for core functions

### Week 2: Intelligence and Analytics

**Goals:**
- Implement risk analysis and safety scoring
- Build analytics dashboard
- Create prediction agent with ML model
- Implement route optimization

**Tasks:**
1. Implement risk analyzer service
2. Build safety score calculation algorithm
3. Create hotspot detection logic
4. Train initial ML model for risk prediction
5. Implement prediction agent
6. Build analytics dashboard components
7. Create chart visualizations
8. Implement route optimizer service
9. Add heatmap layer to map

**Deliverables:**
- Working safety score calculations
- Analytics dashboard with visualizations
- ML model generating predictions
- Route optimization with safety scores
- Property-based tests for data parsing

### Week 3: AI Agents and Polish

**Goals:**
- Implement report generation agent
- Set up LangGraph orchestration
- Integrate Ollama for LLM inference
- Add real-time alerts
- Polish UI and optimize performance

**Tasks:**
1. Set up Ollama with Llama model
2. Implement ChromaDB vector store
3. Create report generator agent
4. Set up LangGraph workflow
5. Implement alert system
6. Add time-based filtering
7. Optimize frontend performance
8. Implement responsive design
9. Add loading states and error handling
10. Deploy to production

**Deliverables:**
- Complete multi-agent system
- Automated report generation
- Real-time safety alerts
- Polished, responsive UI
- Production deployment
- Complete documentation

## Deployment Strategy

### Development Environment

**Local Setup:**
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev

# Database
docker-compose up -d postgres
```

**Environment Variables:**
```bash
# Backend (.env)
DATABASE_URL=postgresql://user:pass@localhost:5432/aegis
REDIS_URL=redis://localhost:6379
OLLAMA_URL=http://localhost:11434
MAPBOX_TOKEN=pk.xxx

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=pk.xxx
```

### Staging Environment

**Infrastructure:**
- Frontend: Vercel preview deployments
- Backend: Render staging service
- Database: Supabase staging project

**Purpose:**
- Test new features before production
- Run E2E tests
- Validate integrations

### Production Environment

**Infrastructure:**
- Frontend: Vercel production (auto-deploy from main)
- Backend: Render production with auto-scaling
- Database: Supabase production with backups
- Monitoring: Sentry for error tracking

**Deployment Process:**
1. Create feature branch
2. Develop and test locally
3. Create pull request
4. CI runs all tests
5. Deploy to staging for review
6. Merge to main
7. Auto-deploy to production
8. Monitor for errors

**Rollback Strategy:**
- Vercel: Instant rollback to previous deployment
- Render: Rollback to previous Docker image
- Database: Point-in-time recovery available

### Monitoring and Observability

**Metrics to Track:**
- API response times (p50, p95, p99)
- Error rates by endpoint
- Database query performance
- Agent task completion rates
- Frontend Core Web Vitals
- User engagement metrics

**Alerting:**
- Error rate > 5%: Page on-call engineer
- API latency > 1s: Send Slack alert
- Database connection failures: Page immediately
- Agent failures: Log and review daily

## Security Considerations

### Data Security

**Database:**
- Use SSL/TLS for all database connections
- Implement row-level security in Supabase
- Regular automated backups
- Encrypt sensitive configuration data

**API:**
- HTTPS only (enforce with HSTS headers)
- CORS configured for specific origins
- Rate limiting to prevent abuse
- Input validation on all endpoints

### Authentication (Future Enhancement)

While not in the initial 3-week scope, future authentication should include:
- OAuth 2.0 with social providers
- JWT tokens for API access
- Role-based access control
- API key management for programmatic access

### Privacy

**Data Handling:**
- Store only aggregate incident data
- No personally identifiable information
- Anonymize location data in logs
- Comply with data retention policies

**User Privacy:**
- Optional location sharing
- Clear privacy policy
- No tracking without consent
- Data export capabilities

## Conclusion

The Aegis platform design provides a comprehensive architecture for an AI-powered urban safety intelligence system. The modular design separates concerns between frontend visualization, backend API services, geospatial data storage, and autonomous AI agents.

Key architectural decisions:
- **Modern web stack** (Next.js + FastAPI) for rapid development and excellent performance
- **PostGIS** for efficient geospatial queries at scale
- **LangGraph + Ollama** for autonomous, privacy-preserving AI agents
- **Property-based testing** for critical data parsing and serialization components
- **Phased implementation** focusing on core functionality first, then intelligence features

The design supports the 3-week development timeline while maintaining flexibility for future enhancements such as authentication, mobile apps, and additional data sources.
