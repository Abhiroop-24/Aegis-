# Contributing to Aegis Platform

Thank you for your interest in contributing to Aegis! This document provides guidelines and instructions for contributing to the project.

## 🌟 Ways to Contribute

- **Code**: Implement new features, fix bugs, improve performance
- **Documentation**: Improve README, add tutorials, write API docs
- **Testing**: Write tests, report bugs, improve test coverage
- **Design**: Improve UI/UX, create mockups, suggest improvements
- **Ideas**: Propose new features, discuss architecture, share feedback

## 🚀 Getting Started

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/Aegis-.git
cd Aegis-

# Add upstream remote
git remote add upstream https://github.com/Abhiroop-24/Aegis-.git
```

### 2. Set Up Development Environment

Follow the setup instructions in the [README.md](README.md):
- Install Node.js 18+ and Python 3.11+
- Set up frontend and backend
- Configure database
- Run tests to ensure everything works

### 3. Create a Branch

```bash
# Update your fork
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `perf/` - Performance improvements

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for clear and structured commit history.

### Commit Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Changes to build process or auxiliary tools

### Examples

```bash
# Good commits
git commit -m "feat: add heatmap toggle control with animation"
git commit -m "fix: resolve marker clustering performance issue"
git commit -m "docs: update API endpoint documentation"
git commit -m "perf: optimize incident query with spatial index"

# Bad commits (avoid these)
git commit -m "update stuff"
git commit -m "fix bug"
git commit -m "changes"
```

### Commit Frequency

- Make **3-5 meaningful commits per day** rather than one large commit
- Each commit should represent a logical unit of work
- Commit when you complete a task, not at arbitrary times

## 🧪 Testing Requirements

### Before Submitting

1. **Run all tests**:
   ```bash
   # Frontend
   cd frontend && npm run test
   
   # Backend
   cd backend && pytest
   ```

2. **Check code style**:
   ```bash
   # Frontend
   npm run lint
   
   # Backend
   black . && flake8
   ```

3. **Test manually**:
   - Test your changes in the browser
   - Verify on mobile viewport
   - Check API endpoints with `/docs`

### Writing Tests

- **Frontend**: Use Jest + React Testing Library
- **Backend**: Use pytest + pytest-asyncio
- **Property-Based**: Use Hypothesis for data parsing/serialization

Example test structure:
```python
def test_calculate_safety_score():
    """Test safety score calculation with known inputs"""
    # Arrange
    incidents = create_test_incidents()
    
    # Act
    score = calculate_safety_score(lat=41.8781, lng=-87.6298, incidents=incidents)
    
    # Assert
    assert 0 <= score <= 100
    assert score < 50  # Should be low due to recent incidents
```

## 📋 Pull Request Process

### 1. Prepare Your PR

```bash
# Ensure your branch is up to date
git checkout main
git pull upstream main
git checkout feature/your-feature-name
git rebase main

# Push to your fork
git push origin feature/your-feature-name
```

### 2. Create Pull Request

1. Go to the [Aegis repository](https://github.com/Abhiroop-24/Aegis-)
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template

### 3. PR Title Format

Use the same format as commit messages:
```
feat: add heatmap toggle control
fix: resolve marker clustering issue
docs: update setup instructions
```

### 4. PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have tested this code locally
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] All new and existing tests pass

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
```

### 5. Review Process

- Maintainers will review your PR within 2-3 days
- Address any requested changes
- Once approved, your PR will be merged!

## 🎯 Good First Issues

New to the project? Look for issues labeled:
- `good-first-issue` - Perfect for beginners
- `help-wanted` - We need help with these
- `documentation` - Improve docs

## 💡 Feature Requests

Have an idea? We'd love to hear it!

1. Check if the feature is already requested in [Issues](https://github.com/Abhiroop-24/Aegis-/issues)
2. If not, create a new issue with the `feature-request` label
3. Describe:
   - What problem does it solve?
   - How should it work?
   - Any implementation ideas?

## 🐛 Bug Reports

Found a bug? Help us fix it!

1. Check if the bug is already reported
2. Create a new issue with the `bug` label
3. Include:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment (OS, browser, versions)

## 📚 Code Style

### Frontend (TypeScript/React)

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Use Tailwind CSS for styling

```typescript
// Good
interface MapProps {
  center: [number, number];
  zoom: number;
}

export function Map({ center, zoom }: MapProps) {
  // Component logic
}

// Bad
export function Map(props: any) {
  // Component logic
}
```

### Backend (Python)

- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Keep functions small and focused

```python
# Good
def calculate_safety_score(
    lat: float,
    lng: float,
    radius: float = 500
) -> SafetyScore:
    """
    Calculate safety score for a location.
    
    Args:
        lat: Latitude coordinate
        lng: Longitude coordinate
        radius: Search radius in meters
        
    Returns:
        SafetyScore object with score and metadata
    """
    # Function logic

# Bad
def calc_score(lat, lng, r=500):
    # Function logic
```

## 🤝 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors, regardless of:
- Age, body size, disability, ethnicity
- Gender identity and expression
- Level of experience
- Nationality, personal appearance, race
- Religion, sexual identity and orientation

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments, personal or political attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported to the project maintainers. All complaints will be reviewed and investigated promptly and fairly.

## 📞 Getting Help

- **Discord**: [Join our community](https://discord.gg/aegis) (coming soon)
- **GitHub Discussions**: Ask questions, share ideas
- **Email**: aegis-dev@example.com

## 🎓 Learning Resources

New to the technologies we use?

- **Next.js**: [Official Tutorial](https://nextjs.org/learn)
- **FastAPI**: [Official Tutorial](https://fastapi.tiangolo.com/tutorial/)
- **Leaflet**: [Quick Start Guide](https://leafletjs.com/examples/quick-start/)
- **TypeScript**: [Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- **Python**: [Official Tutorial](https://docs.python.org/3/tutorial/)

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project website (coming soon)

Thank you for contributing to Aegis! Together, we're making cities safer. 🛡️
