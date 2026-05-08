# Aegis - Urban Safety Intelligence Platform

**Navigate Smarter. Move Safer.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## Overview

Aegis is an AI-powered urban safety intelligence and navigation platform that transforms public safety data into actionable insights. The platform aggregates incident data, analyzes crime patterns, and provides safety-aware navigation to help users make informed decisions about urban mobility.

### Core Capabilities

**Incident Aggregation & Visualization**
- Real-time incident mapping with interactive visualization
- Density-based heatmap overlays showing risk concentration
- Historical pattern analysis across time and location

**Safety Intelligence**
- Area-based safety scoring (0-100 scale)
- Risk level classification and trend analysis
- Geospatial hotspot identification

**Smart Navigation**
- Route optimization balancing time and safety
- Time-aware risk assessment
- Alternative path recommendations

**AI-Powered Analytics**
- Machine learning-based risk prediction
- Autonomous agent system for data analysis
- Natural language safety report generation

### Privacy-First Approach

Aegis focuses on aggregate incident patterns and area-level safety intelligence rather than individual records, ensuring privacy compliance while delivering valuable safety insights.

---

## Features

### Current Implementation

**Interactive Mapping**
- Dynamic incident visualization with severity-based markers
- Intelligent marker clustering for performance optimization
- Custom dark theme optimized for safety data display
- Responsive design supporting mobile, tablet, and desktop devices

**Heatmap Visualization**
- Real-time incident density overlay
- Severity-weighted intensity calculation
- Smooth gradient rendering with configurable parameters
- Toggle controls for layer management

**Safety Scoring System**
- Algorithmic safety score calculation for geographic areas
- Multi-factor analysis including incident density, severity, and recency
- Visual indicators with color-coded risk levels
- Grid-based area comparison

**Analytics Dashboard**
- Statistical overview of incident patterns
- Hotspot ranking and identification
- Temporal trend analysis
- Filterable data views

**Advanced Filtering**
- Time range selection (24 hours to 90 days)
- Incident type categorization
- Severity level adjustment
- Real-time filter application

### In Development

**Backend Infrastructure**
- RESTful API with FastAPI
- PostgreSQL database with PostGIS spatial extensions
- Real crime dataset integration from public data sources
- Optimized geospatial query processing

**Machine Learning Pipeline**
- Risk prediction models using ensemble methods
- Feature engineering for temporal and spatial patterns
- Model training and validation workflows
- Continuous learning system

**Autonomous Agent System**
- Multi-agent architecture using LangGraph
- Data collection and normalization agents
- Risk analysis and prediction agents
- Natural language report generation
- Vector database for context retrieval

**Enhanced Navigation**
- Multi-criteria route optimization
- Real-time safety alerts
- Time-of-day risk adjustment
- Alternative route suggestions

---

## Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend Layer                           │
│                    (Next.js 14 + TypeScript)                 │
│                                                               │
│  Map Visualization  │  Analytics Dashboard  │  Reports       │
└────────────────────────────┬─────────────────────────────────┘
                             │ REST API
┌────────────────────────────┴─────────────────────────────────┐
│                     Backend Layer                             │
│                    (FastAPI + Python)                         │
│                                                               │
│  Incident API  │  Safety Scoring  │  Route Optimizer         │
└────────────────────────────┬─────────────────────────────────┘
                             │
┌────────────────────────────┴─────────────────────────────────┐
│                     Data Layer                                │
│              (PostgreSQL + PostGIS)                           │
│                                                               │
│  Spatial Indexes  │  Incident Store  │  Analytics Cache      │
└───────────────────────────────────────────────────────────────┘
```

### Technology Stack

**Frontend**
- Next.js 14 with App Router for server-side rendering and optimal performance
- TypeScript for type safety and developer experience
- Tailwind CSS for responsive, utility-first styling
- Leaflet for interactive mapping with custom tile layers
- Framer Motion for smooth animations and transitions
- SWR for efficient data fetching and caching

**Backend**
- FastAPI for high-performance async API endpoints
- SQLAlchemy with GeoAlchemy2 for database operations
- Pydantic for data validation and serialization
- PostgreSQL 15+ with PostGIS for geospatial data management

**AI/ML Infrastructure**
- LangGraph for agent orchestration and workflow management
- Ollama for local LLM inference
- ChromaDB for vector storage and semantic search
- scikit-learn and XGBoost for predictive modeling
- sentence-transformers for embedding generation

**Deployment**
- Vercel for frontend hosting with edge network distribution
- Render for backend API deployment with auto-scaling
- Supabase for managed PostgreSQL with PostGIS

---

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- Python 3.11 or higher
- PostgreSQL 15+ with PostGIS extension
- npm or yarn package manager

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Abhiroop-24/Aegis-.git
cd Aegis-
```

**2. Frontend Setup**
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Configure environment variables in .env.local
npm run dev
```

The frontend will be available at `http://localhost:3000`

**3. Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Configure database credentials and API keys in .env
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

**4. Database Configuration**

Create a PostgreSQL database with PostGIS extension:
```sql
CREATE DATABASE aegis;
\c aegis
CREATE EXTENSION postgis;
```

Update the `DATABASE_URL` in your backend `.env` file with your connection string.

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

**Backend (.env)**
```
DATABASE_URL=postgresql://user:password@localhost:5432/aegis
CORS_ORIGINS=http://localhost:3000
```

---

## Development

### Project Structure

```
Aegis/
├── frontend/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Map view (home)
│   │   ├── dashboard/          # Analytics dashboard
│   │   └── reports/            # Safety reports
│   ├── components/             # React components
│   │   ├── Map/                # Map-related components
│   │   ├── Navigation.tsx      # Navigation bar
│   │   └── FilterSidebar.tsx   # Filter controls
│   ├── lib/                    # Utilities and hooks
│   └── types/                  # TypeScript definitions
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── models/                 # Data models
│   ├── services/               # Business logic
│   └── api/                    # API endpoints
└── docs/                       # Documentation
```

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
pytest
```

### Building for Production

```bash
# Frontend production build
cd frontend
npm run build

# Backend deployment
cd backend
# Configure production environment variables
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## Contributing

We welcome contributions from developers of all experience levels. Whether you're fixing bugs, adding features, improving documentation, or suggesting enhancements, your input is valuable.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Roadmap

### Current Phase: Foundation & Core Features
- Interactive incident visualization
- Safety scoring algorithms
- Responsive user interface
- Data filtering and layer controls

### Next Phase: Intelligence & Analytics
- Backend API implementation
- Real crime dataset integration
- Machine learning risk prediction
- Advanced analytics dashboard
- Time-based pattern analysis

### Future Phase: Autonomous Systems
- Multi-agent AI architecture
- Smart route optimization
- Real-time safety alerts
- Automated report generation
- Continuous learning pipeline

### Long-term Vision
- Mobile application development
- Community reporting features
- Real-time data streaming
- Computer vision integration
- IoT sensor network support

---

## Data Sources

Aegis integrates with public safety data from:
- Chicago Police Department Open Data Portal
- NYC Open Data
- London Metropolitan Police Data
- Additional municipal open data sources

All data is aggregated and anonymized to protect individual privacy while providing valuable safety insights.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- OpenStreetMap contributors for map tile data
- Municipal open data initiatives for incident datasets
- Open source community for the excellent tools and libraries

---

## Contact

**Project Maintainer**: Abhiroop

- GitHub: [@Abhiroop-24](https://github.com/Abhiroop-24)
- Repository: [https://github.com/Abhiroop-24/Aegis-](https://github.com/Abhiroop-24/Aegis-)

---

**Built for safer urban communities through data-driven intelligence**
