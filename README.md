# 🛡️ Aegis - Navigate Smarter. Move Safer.

<div align="center">

![Aegis Banner](https://via.placeholder.com/1200x300/0a0a0a/22d3ee?text=Aegis+Urban+Safety+Intelligence)

**AI-Powered Urban Safety Intelligence & Smart Navigation Platform**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) • [Documentation](#) • [Contributing](CONTRIBUTING.md) • [Roadmap](#roadmap)

</div>

---

## 📖 Overview

**Aegis** is a production-grade AI-powered platform that transforms urban safety data into actionable intelligence. By combining real-time incident visualization, machine learning-based risk prediction, and autonomous AI agents, Aegis helps users make informed decisions about urban navigation and area safety.

### 🎯 Core Mission

Instead of exposing individual criminal records (privacy concerns), Aegis focuses on:
- **Incident Aggregation**: Collecting and normalizing public safety data
- **Area Safety Intelligence**: Calculating safety scores for geographic regions
- **Public Safety Analytics**: Identifying patterns and trends
- **Risk Prediction**: Forecasting dangerous zones using ML
- **Route Optimization**: Balancing travel time with safety considerations

---

## ✨ Features

### Week 1 (Current - Foundation + Visual MVP) ✅

- **🗺️ Interactive Map**
  - Real-time incident visualization with Leaflet
  - Custom dark theme optimized for safety data
  - User location detection and centering
  - Smooth pan, zoom, and navigation controls

- **📍 Incident Markers**
  - Severity-based color coding (green → red)
  - Smart clustering for performance (500+ incidents)
  - Detailed popups with incident information
  - Real-time filtering by type and severity

- **🔥 Heatmap Visualization**
  - Dynamic incident density overlay
  - Severity-weighted intensity
  - Smooth color gradients
  - Toggle on/off with animations

- **🛡️ Safety Score System**
  - Real-time area safety calculation (0-100 scale)
  - Color-coded risk levels (Very Safe → Dangerous)
  - Circular progress indicators
  - Grid-based safety visualization

- **🎨 Modern UI/UX**
  - Futuristic dark theme with glassmorphism
  - Smooth Framer Motion animations
  - Fully responsive (mobile, tablet, desktop)
  - Collapsible filter sidebar

### Week 2 (Planned - Backend + Real AI) 🚧

- **Backend API** (FastAPI + PostgreSQL/PostGIS)
- **Real Crime Datasets** (Chicago, NYC, London)
- **ML Risk Prediction** (Random Forest/XGBoost)
- **Time-Based Analysis** (hourly/daily patterns)
- **Analytics Dashboard** (charts and trends)

### Week 3 (Planned - Autonomous AI Agents) 🔮

- **Multi-Agent System** (LangGraph orchestration)
- **Smart Routing** (safest vs fastest routes)
- **Safety Alerts** (real-time notifications)
- **AI Report Generation** (natural language insights)
- **Self-Improving Prediction** (continuous learning)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js 14)                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Map    │  │Dashboard │  │ Reports  │  │ Filters  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ REST API
┌────────────────────────┴────────────────────────────────────┐
│                    Backend (FastAPI)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Incidents │  │  Safety  │  │  Routes  │  │Analytics │   │
│  │   API    │  │Score API │  │Optimizer │  │   API    │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│              PostgreSQL + PostGIS (Supabase)                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Incidents Table (spatial indexes, 100K+ records)    │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **PostgreSQL** 15+ with PostGIS extension
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhiroop-24/Aegis-.git
   cd Aegis-
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

3. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   # Edit .env with your database credentials
   uvicorn main:app --reload
   ```
   Backend runs on `http://localhost:8000`

4. **Database Setup**
   ```bash
   # Create Supabase project or local PostgreSQL database
   # Enable PostGIS extension
   # Run migrations (coming in Week 2)
   ```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Leaflet + React-Leaflet
- **Animations**: Framer Motion
- **State**: React Context + SWR
- **Deployment**: Vercel

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **Database**: PostgreSQL 15 + PostGIS
- **ORM**: SQLAlchemy + GeoAlchemy2
- **Validation**: Pydantic v2
- **Deployment**: Render

### AI/ML (Week 2-3)
- **Agent Orchestration**: LangGraph
- **LLM**: Ollama (Llama 3.1 / Mistral)
- **Vector DB**: ChromaDB
- **ML Framework**: scikit-learn, XGBoost
- **Embeddings**: sentence-transformers

---

## 📊 Project Status

### Week 1 Progress (Current)

- [x] Project initialization and setup
- [x] Next.js 14 with TypeScript and Tailwind
- [x] FastAPI backend structure
- [x] Navigation and layout components
- [x] Interactive map with Leaflet
- [x] Incident markers with clustering
- [x] Heatmap visualization
- [x] Safety score system
- [x] Filter sidebar
- [x] Dashboard page
- [x] Responsive design
- [x] Dark theme with glassmorphism
- [ ] Deployment to Vercel/Render
- [ ] Production database setup

**Completion**: ~85% of Week 1 goals

---

## 🗺️ Roadmap

### Phase 1: Foundation (Week 1) - Current
- ✅ Interactive map visualization
- ✅ Incident markers and heatmap
- ✅ Safety score calculation
- ✅ Responsive UI with dark theme
- 🚧 Production deployment

### Phase 2: Intelligence (Week 2)
- 📅 Backend API with FastAPI
- 📅 PostgreSQL + PostGIS integration
- 📅 Real crime dataset import (Chicago/NYC/London)
- 📅 ML-based risk prediction
- 📅 Time-based pattern analysis
- 📅 Analytics dashboard with charts

### Phase 3: Autonomous AI (Week 3)
- 📅 Multi-agent system (LangGraph)
- 📅 Smart route optimization
- 📅 Real-time safety alerts
- 📅 AI report generation (Ollama)
- 📅 Vector store for context (ChromaDB)
- 📅 Self-improving prediction system

### Phase 4: Advanced Features (Future)
- 📅 Mobile app (React Native)
- 📅 WebSocket real-time updates
- 📅 User authentication and profiles
- 📅 Community reporting
- 📅 Computer vision integration
- 📅 IoT sensor integration

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Aegis is designed to be beginner-friendly while offering challenging problems for experienced developers.

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'feat: add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Contribution Areas

- 🎨 **Frontend**: UI/UX improvements, new visualizations
- ⚙️ **Backend**: API endpoints, database optimization
- 🤖 **AI/ML**: Prediction models, agent workflows
- 📊 **Data**: Dataset integration, data cleaning
- 📝 **Documentation**: Guides, tutorials, API docs
- 🧪 **Testing**: Unit tests, integration tests, E2E tests

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenStreetMap** for map tiles
- **Chicago Police Department** for open crime data
- **NYC Open Data** for incident datasets
- **Leaflet** for mapping library
- **Next.js** team for the amazing framework
- **FastAPI** for the modern Python framework

---

## 📧 Contact

**Project Maintainer**: Abhiroop

- GitHub: [@Abhiroop-24](https://github.com/Abhiroop-24)
- Project Link: [https://github.com/Abhiroop-24/Aegis-](https://github.com/Abhiroop-24/Aegis-)

---

<div align="center">

**Built with ❤️ for safer urban communities**

⭐ Star this repo if you find it useful!

</div>
