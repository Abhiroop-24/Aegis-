# Aegis

AI-powered urban safety intelligence and navigation platform.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## About

Aegis aggregates public safety incident data and provides intelligent insights through interactive mapping, safety scoring, and risk analysis. The platform focuses on area-level safety intelligence rather than individual records, ensuring privacy while delivering actionable information.

## Features

- **Interactive Map**: Real-time incident visualization with custom markers and clustering
- **Heatmap Layer**: Density-based visualization showing incident concentration
- **Safety Scores**: Algorithmic scoring system for geographic areas (0-100 scale)
- **Analytics Dashboard**: Statistical overview and trend analysis
- **Smart Filtering**: Filter by time range, incident type, and severity level
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Leaflet (mapping)
- Framer Motion (animations)

**Backend**
- FastAPI
- PostgreSQL + PostGIS
- SQLAlchemy

**AI/ML** (in development)
- LangGraph (agent orchestration)
- Ollama (LLM inference)
- ChromaDB (vector storage)
- scikit-learn, XGBoost (prediction models)

## Installation

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+ with PostGIS

### Setup

**1. Clone repository**
```bash
git clone https://github.com/Abhiroop-24/Aegis-.git
cd Aegis-
```

**2. Frontend**
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```
Runs on `http://localhost:3000`

**3. Backend**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```
Runs on `http://localhost:8000`

**4. Database**
```sql
CREATE DATABASE aegis;
\c aegis
CREATE EXTENSION postgis;
```

Update `DATABASE_URL` in `backend/.env`

## Environment Variables

**Frontend** (`.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Backend** (`.env`)
```
DATABASE_URL=postgresql://user:password@localhost:5432/aegis
CORS_ORIGINS=http://localhost:3000
```

## Project Structure

```
Aegis/
├── frontend/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and hooks
│   └── types/            # TypeScript types
├── backend/
│   ├── main.py           # FastAPI app
│   ├── models/           # Data models
│   ├── services/         # Business logic
│   └── api/              # API endpoints
└── docs/                 # Documentation
```

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contact

GitHub: [@Abhiroop-24](https://github.com/Abhiroop-24)
