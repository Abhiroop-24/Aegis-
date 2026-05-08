# Contributing to Aegis

Thank you for your interest in contributing to Aegis! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

---

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Prioritize the community and project goals

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Publishing others' private information
- Other conduct inappropriate in a professional setting

---

## Getting Started

### Prerequisites

Before contributing, ensure you have:
- Node.js 18+ and npm installed
- Python 3.11+ installed
- Git configured with your name and email
- A GitHub account

### Setting Up Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Aegis-.git
   cd Aegis-
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Abhiroop-24/Aegis-.git
   ```

4. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

5. **Configure environment variables**
   ```bash
   # Frontend
   cp frontend/.env.local.example frontend/.env.local
   
   # Backend
   cp backend/.env.example backend/.env
   ```

---

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Creating a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

---

## Coding Standards

### TypeScript/JavaScript (Frontend)

**Style Guidelines**
- Use TypeScript for all new code
- Follow ESLint configuration
- Use functional components with hooks
- Prefer named exports over default exports
- Use meaningful variable and function names

**Example**
```typescript
// Good
interface IncidentMarkerProps {
  incident: Incident;
  onMarkerClick: (id: string) => void;
}

export function IncidentMarker({ incident, onMarkerClick }: IncidentMarkerProps) {
  // Component logic
}

// Avoid
export default function Marker(props: any) {
  // Component logic
}
```

**Component Structure**
```typescript
// 1. Imports
import { useState } from "react";
import { Incident } from "@/types";

// 2. Types/Interfaces
interface ComponentProps {
  // props
}

// 3. Component
export function Component({ prop }: ComponentProps) {
  // 4. Hooks
  const [state, setState] = useState();
  
  // 5. Event handlers
  const handleClick = () => {
    // logic
  };
  
  // 6. Render
  return (
    // JSX
  );
}
```

### Python (Backend)

**Style Guidelines**
- Follow PEP 8 style guide
- Use type hints for function parameters and returns
- Write docstrings for classes and functions
- Use async/await for I/O operations
- Keep functions focused and single-purpose

**Example**
```python
from typing import List, Optional
from pydantic import BaseModel

class Incident(BaseModel):
    """Represents a safety incident with location and severity."""
    
    id: str
    incident_type: str
    severity: int
    latitude: float
    longitude: float
    
    class Config:
        json_schema_extra = {
            "example": {
                "id": "inc_123",
                "incident_type": "theft",
                "severity": 3,
                "latitude": 41.8781,
                "longitude": -87.6298
            }
        }

async def get_incidents(
    bbox: str,
    limit: int = 1000
) -> List[Incident]:
    """
    Retrieve incidents within a bounding box.
    
    Args:
        bbox: Bounding box string "minLng,minLat,maxLng,maxLat"
        limit: Maximum number of incidents to return
        
    Returns:
        List of Incident objects
    """
    # Implementation
    pass
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use custom CSS only when necessary
- Maintain consistent spacing and colors

---

## Commit Guidelines

### Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**
```bash
feat(map): add incident marker clustering

Implement marker clustering using react-leaflet-cluster to improve
performance when displaying large numbers of incidents.

Closes #123
```

```bash
fix(api): correct safety score calculation

The safety score was not properly weighting recent incidents.
Updated the algorithm to apply exponential decay based on time.
```

```bash
docs(readme): update installation instructions

Add detailed steps for PostgreSQL setup and PostGIS extension.
```

### Commit Best Practices

- Write clear, descriptive commit messages
- Keep commits focused on a single change
- Commit frequently with logical groupings
- Reference issue numbers when applicable
- Use present tense ("add feature" not "added feature")

---

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests**
   ```bash
   # Frontend
   cd frontend
   npm test
   npm run lint
   
   # Backend
   cd backend
   pytest
   ```

3. **Build successfully**
   ```bash
   cd frontend
   npm run build
   ```

### Creating a Pull Request

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open PR on GitHub**
   - Use a clear, descriptive title
   - Reference related issues
   - Describe what changed and why
   - Add screenshots for UI changes
   - List any breaking changes

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Review Process

- Maintainers will review your PR
- Address feedback and requested changes
- Keep discussions professional and constructive
- Be patient - reviews may take time

---

## Issue Guidelines

### Creating Issues

**Bug Reports**
```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

**Feature Requests**
```markdown
**Problem Statement**
Describe the problem this feature would solve

**Proposed Solution**
Describe your proposed solution

**Alternatives Considered**
Other approaches you've considered

**Additional Context**
Any other relevant information
```

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

---

## Areas for Contribution

### Frontend Development
- UI/UX improvements
- New visualization components
- Performance optimization
- Responsive design enhancements
- Accessibility improvements

### Backend Development
- API endpoint implementation
- Database query optimization
- Data processing pipelines
- Authentication and authorization
- Caching strategies

### Data Science/ML
- Risk prediction models
- Feature engineering
- Model evaluation and tuning
- Data cleaning and normalization
- Anomaly detection algorithms

### Documentation
- Code documentation
- API documentation
- User guides and tutorials
- Architecture diagrams
- Contributing guidelines

### Testing
- Unit tests
- Integration tests
- End-to-end tests
- Performance testing
- Security testing

---

## Questions?

If you have questions about contributing:
- Check existing issues and discussions
- Open a new issue with the `question` label
- Reach out to maintainers

---

Thank you for contributing to Aegis and helping build safer urban communities!
