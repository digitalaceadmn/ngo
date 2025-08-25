# NGO CMS - Complete Development Guide

## 🚀 Quick Start

### Development Mode (Auto-reload, Fast Iteration)
```bash
# For daily development work
make up
# OR
docker-compose up -d

# Access URLs:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000/api
# Database: localhost:5433
```

### Production Mode (Testing Production Build)
```bash
# For testing production deployment
make prod-up
# OR
docker-compose -f docker-compose.prod.yml up -d

# Access URLs:
# Main App: http://localhost:8009 (via Nginx)
# Frontend Direct: http://localhost:3007
# Backend Direct: http://localhost:8008
# Database: localhost:5437
```

## 📋 Best Practices Workflow

### 1. Daily Development Cycle
```bash
# Morning setup (once per day)
git pull origin master
make up  # Start development mode

# Code changes (all day long)
# Edit files → Save → Browser auto-refreshes ✅
# No rebuilds needed!

# Before committing
make test  # If available
git add .
git commit -m "Your message"  # Pre-commit hook runs automatically
git push
```

### 2. Testing Production Build
```bash
# Before major releases or PRs
make down  # Stop dev mode
make prod-up  # Test production build

# Verify everything works at http://localhost:8009
# If good, deploy to production
```

### 3. Environment Management

#### Use Development Mode When:
- ✅ **Writing new features**
- ✅ **Fixing bugs**
- ✅ **Styling/UI work**
- ✅ **Daily coding**
- ✅ **Need instant feedback**

#### Use Production Mode When:
- ✅ **Testing deployment**
- ✅ **Performance testing**
- ✅ **Final QA before release**
- ✅ **Debugging production issues**

## 📦 Installing Packages

### Frontend Packages (React/Next.js)

#### Method 1: Direct Docker Command (Recommended for Local)
```bash
# Install packages directly in container
docker-compose exec frontend npm install react-icons
docker-compose exec frontend npm install @mui/icons-material
docker-compose exec frontend npm install bootstrap

# Install multiple at once
docker-compose exec frontend npm install react-icons @mui/icons-material bootstrap

# Install dev dependencies
docker-compose exec frontend npm install --save-dev @types/react-icons

# Copy updated package files to host
docker cp ngo-frontend-1:/app/package.json ./frontend/
docker cp ngo-frontend-1:/app/package-lock.json ./frontend/

# Rebuild to ensure consistency
docker-compose down frontend
docker-compose build frontend
docker-compose up -d frontend
```

#### Method 2: Local Installation (Alternative)
```bash
# Navigate to frontend directory
cd frontend

# Install packages locally
npm install bootstrap @mui/material axios
# OR dev dependencies
npm install --save-dev @types/node eslint

# Go back to root
cd ..

# Rebuild and restart
docker-compose build frontend
docker-compose up -d frontend
```

### Backend Packages (Django/Python)

#### Method 1: Direct Docker Command
```bash
# Install in container
docker-compose exec backend pip install django-filter
docker-compose exec backend pip install celery

# Update requirements.txt
docker-compose exec backend pip freeze > requirements.txt

# Copy to host
docker cp ngo-backend-1:/app/requirements.txt ./backend/

# Rebuild
docker-compose build backend
docker-compose up -d backend
```

#### Method 2: Update requirements.txt
```bash
# Add to requirements.txt
echo "django-filter==23.5" >> backend/requirements.txt
echo "celery==5.3.0" >> backend/requirements.txt

# Rebuild backend
docker-compose build backend
docker-compose up -d backend
```

### Production Package Updates

#### Frontend (Production)
```bash
# 1. Install packages in development first
docker-compose exec frontend npm install new-package

# 2. Copy updated files
docker cp ngo-frontend-1:/app/package.json ./frontend/
docker cp ngo-frontend-1:/app/package-lock.json ./frontend/

# 3. Rebuild production image
docker-compose -f docker-compose.prod.yml build frontend #main

# 4. Deploy new image
docker-compose -f docker-compose.prod.yml up -d frontend #main
```

#### Backend (Production)
```bash
# 1. Update requirements.txt
echo "new-package==version" >> backend/requirements.txt

# 2. Rebuild production image
docker-compose -f docker-compose.prod.yml build backend

# 3. Deploy new image
docker-compose -f docker-compose.prod.yml up -d backend

# 4. Run migrations if needed
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# 5. Collect static files
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
```

### After Installing Packages
```bash
# Always commit package changes
git add frontend/package*.json backend/requirements.txt
git commit -m "Add new dependencies: bootstrap, django-filter"
git push

# Team members should rebuild after pulling:
git pull
docker-compose build  # Or build specific services
docker-compose up -d
```

## 🔄 When to Build vs Restart

### 🔨 BUILD Required (Use `build` command)
- ✅ **New packages installed** (npm install, pip install)
- ✅ **Package versions updated**
- ✅ **Dockerfile changes**
- ✅ **System dependencies added**
- ✅ **First time setup**

```bash
# Development
docker-compose build [service-name]
docker-compose up -d

# Production
docker-compose -f docker-compose.prod.yml build [service-name]
docker-compose -f docker-compose.prod.yml up -d
```

### 🔄 RESTART Only (Use `restart` or `up -d`)
- ✅ **Code changes** (JS, Python, CSS, HTML)
- ✅ **Environment variable changes**
- ✅ **Configuration updates**
- ✅ **Database migrations**

```bash
# Development
docker-compose restart [service-name]

# Production
docker-compose -f docker-compose.prod.yml restart [service-name]
```

### Quick Decision Helper
```bash
# Check what changed after git pull
git diff HEAD~1 --name-only | grep -E "package.*json|requirements.txt|Dockerfile"

# If output shows these files → BUILD REQUIRED
# If no output → RESTART ONLY
```

## 🛠️ Common Commands

### Service Management
```bash
# Development Mode
make up          # Start all services
make down        # Stop all services
make logs        # View all logs
make shell-backend   # Access backend shell
make shell-frontend  # Access frontend shell

# Production Mode
make prod-up     # Start production services
make prod-down   # Stop production services
make prod-logs   # View production logs
```

### Database Operations
```bash
# Development
make migrate              # Run migrations
make makemigrations      # Create migrations
make createsuperuser     # Create admin user
make shell-db           # Access database

# Production
make prod-migrate        # Production migrations
make prod-collectstatic  # Collect static files
```

### Manual Commands (If Makefile not available)
```bash
# Development
docker-compose up -d
docker-compose down
docker-compose logs -f
docker-compose exec backend python manage.py migrate
docker-compose exec frontend npm install package-name

# Production
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml logs -f
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate
```

## 🔧 Development Tools

### Code Quality (Auto-runs via pre-commit hook)
```bash
# Frontend linting
docker-compose exec frontend npm run lint
docker-compose exec frontend npm run lint:fix

# Backend code check
docker-compose exec backend python manage.py check
docker-compose exec backend python -m flake8  # If flake8 installed
```

### Debugging
```bash
# View logs for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db

# Access container shell
docker-compose exec frontend sh
docker-compose exec backend bash
docker-compose exec db psql -U postgres -d ngo_cms
```

## 🌍 Environment Variables

### Create `.env` file in project root:
```env
# Database
POSTGRES_DB=ngo_cms
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
DB_NAME=ngo_cms
DB_USER=ngo_cms_user
DB_PASSWORD=digitalace@12!
DB_HOST=db
DB_PORT=5432

# Django
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1,backend

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8000/api
API_URL=http://backend:8000/api

# Production Ports
BACKEND_PORT=8008
FRONTEND_PORT=3007
NGINX_PORT=8009
DB_EXTERNAL_PORT=5437
```

### Separate Environment Files
```bash
# Create different configs for different environments
.env.dev    # Development settings
.env.prod   # Production settings
.env.test   # Testing settings
```

## 🔀 Git Workflow with Pre-commit Hooks

### Automatic Quality Checks
When you commit, the pre-commit hook automatically:
1. ✅ Runs frontend linting
2. ✅ Checks backend syntax
3. ✅ Tests production build
4. ✅ Verifies deployment works
5. ✅ Cleans up test environment

### If Pre-commit Fails
```bash
# Fix linting errors
docker-compose exec frontend npm run lint:fix

# Fix backend issues
docker-compose exec backend python manage.py check

# Try committing again
git commit -m "Your message"
```

### Bypass Pre-commit (Emergency Only)
```bash
# Only use in emergencies
git commit --no-verify -m "Emergency fix"
```

## 🚀 Team Development Workflow

### New Team Member Setup
```bash
# 1. Clone repository
git clone <repository-url>
cd ngo-cms

# 2. Start development environment
make up
# OR
docker-compose up -d

# 3. Run initial migrations
make migrate
# OR
docker-compose exec backend python manage.py migrate

# 4. Create admin user
make createsuperuser
# OR
docker-compose exec backend python manage.py createsuperuser

# 5. Test access
open http://localhost:3000  # Frontend
open http://localhost:8000/admin  # Admin panel
```

### Daily Team Workflow
```bash
# Start of day
git pull origin main
make up  # or docker-compose up -d

# If someone added packages, rebuild
git diff HEAD~1 --name-only | grep -E "package.*json|requirements.txt"
# If packages changed:
docker-compose build
docker-compose up -d

# Development work...
# Code → Save → Auto-refresh ✅

# End of day
git add .
git commit -m "Descriptive message"  # Pre-commit hook runs
git push origin your-branch
```

### Pull Request Workflow
```bash
# Before submitting PR
make down       # Stop dev
make prod-up    # Test production build
# Test at http://localhost:8009
# If all good, submit PR

# After PR approved
git checkout main
git pull origin main
make up  # Back to development
```

## 🐛 Troubleshooting

### Common Issues & Solutions

#### "Port already in use"
```bash
# Find and kill processes using ports
lsof -ti:3000,8000,5432 | xargs kill -9
docker-compose down
docker-compose up -d
```

#### "Frontend not loading"
```bash
# Check frontend logs
docker-compose logs frontend

# Rebuild frontend
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

#### "Database connection error"
```bash
# Check database status
docker-compose ps db

# Recreate database
docker-compose down -v  # WARNING: Destroys data
docker-compose up -d db
docker-compose exec backend python manage.py migrate
```

#### "Changes not reflecting"
```bash
# Development mode - should auto-refresh
# If not working, restart:
docker-compose restart frontend

# Production mode - requires rebuild
    docker-compose -f docker-compose.prod.yml build frontend
    docker-compose -f docker-compose.prod.yml up -d frontend
```

#### "Pre-commit hook failing"
```bash
# Check what's failing
git commit -m "test" --dry-run

# Fix linting
docker-compose exec frontend npm run lint:fix

# If Docker issues
docker-compose down
docker-compose up -d

# Try again
git commit -m "Your message"
```

### Performance Issues
```bash
# Clean Docker system
docker system prune -a  # WARNING: Removes unused images

# Increase Docker memory (Docker Desktop)
# Settings → Resources → Memory → 4GB+

# Check container resource usage
docker stats
```

## 📖 Important URLs & Access Points

### Development Mode
| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | Main application |
| Backend API | http://localhost:8000/api | REST API endpoints |
| Admin Panel | http://localhost:8000/admin | Django admin |
| Database | localhost:5433 | PostgreSQL direct |

### Production Mode  
| Service | URL | Purpose |
|---------|-----|---------|
| **Main App** | http://localhost:8009 | **Production-like access** |
| Admin Panel | http://localhost:8009/admin | Admin via Nginx |
| API | http://localhost:8009/api | API via Nginx |
| Frontend Direct | http://localhost:3007 | Debug only |
| Backend Direct | http://localhost:8008 | Debug only |
| Database | localhost:5437 | PostgreSQL direct |

## 🎯 Key Principles

1. **Use Development Mode for Daily Work** - Fast iteration with auto-reload
2. **Test Production Mode Before Deployment** - Catch issues early
3. **Always Test Through Main URLs** - Don't rely on direct service ports
4. **Commit Package Changes** - Team needs to rebuild when packages change
5. **Let Pre-commit Hook Run** - Catches issues before they reach production
6. **Document New Dependencies** - Update this guide when adding services

## 🤝 Getting Help

### Self-help Commands
```bash
# Check service status
docker-compose ps

# View logs
docker-compose logs -f [service-name]

# Test connectivity
curl http://localhost:3000  # Dev frontend
curl http://localhost:8009  # Prod main app
```

### Team Communication
- 🐛 **Found a bug?** Create issue with steps to reproduce
- 📦 **Added packages?** Notify team to rebuild
- 🔧 **Changed environment?** Update this guide
- 🚀 **New features?** Document API changes

---

**💡 Remember: Development mode for coding, Production mode for testing!**

*This guide is your complete reference - bookmark it!*

<!-- ================================================================= -->
<!-- # if u want to make changes in frontend -->
docker-compose build frontend
docker-compose up -d frontend

<!-- # if u want to install some packages in frontend  -->
<!-- 1st) step   -->
cd /home/django/ngo/frontend
npm install or npm install axios
<!-- 2nd) step -->
cd /home/django/ngo
docker-compose build frontend
docker-compose up -d frontend
