# Local Development Guide

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd ngo-cms

# Start all services (uses production-like setup for consistency)
docker-compose -f docker-compose.prod.yml up -d

# Check service status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Access URLs

**Important:** Always test through Nginx (port 8009) to match production routing!

| Service | URL | Description |
|---------|-----|-------------|
| **Main Application** | http://localhost:8009/ | Next.js Frontend via Nginx |
| **Admin Panel** | http://localhost:8009/admin/ | Django Admin Panel |
| **API Endpoints** | http://localhost:8009/api/ | Django REST API |
| **Direct Frontend** | http://localhost:3007/ | Frontend bypassing Nginx (debugging only) |
| **Direct Backend** | http://localhost:8008/ | Backend bypassing Nginx (debugging only) |

## Architecture Overview

```
User Request → Nginx (8009) → Routes to:
                              ├── /admin/* → Django Backend (8000)
                              ├── /api/* → Django Backend (8000)
                              ├── /static/* → Static Files
                              ├── /media/* → Media Files
                              └── /* → Next.js Frontend (3000)
```

## Database Access

```bash
# Access PostgreSQL
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -d ngo_cms

# Run migrations
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Create superuser
docker-compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser
```

## Common Commands

### Service Management
```bash
# Start services
docker-compose -f docker-compose.prod.yml up -d

# Stop services
docker-compose -f docker-compose.prod.yml down

# Restart a specific service
docker-compose -f docker-compose.prod.yml restart frontend

# Rebuild after code changes
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

### Debugging
```bash
# View logs for all services
docker-compose -f docker-compose.prod.yml logs -f

# View logs for specific service
docker-compose -f docker-compose.prod.yml logs -f frontend

# Access container shell
docker-compose -f docker-compose.prod.yml exec frontend sh
docker-compose -f docker-compose.prod.yml exec backend bash
```

### Database Operations
```bash
# Create new migration
docker-compose -f docker-compose.prod.yml exec backend python manage.py makemigrations

# Apply migrations
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Collect static files
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
```

## Installing New Packages

### Frontend (Next.js/React) Packages

#### Method 1: Install locally and rebuild (Recommended)
```bash
# Install package locally
cd frontend
npm install package-name
# or for dev dependency
npm install --save-dev package-name

# Rebuild the container with new dependencies
cd ..
docker-compose -f docker-compose.prod.yml build frontend
docker-compose -f docker-compose.prod.yml up -d frontend
```

#### Method 2: Install inside container (Temporary)
```bash
# Install inside running container (will be lost on rebuild)
docker-compose -f docker-compose.prod.yml exec frontend npm install package-name

# To make it permanent, copy package.json back to host
docker cp ngo-cms-frontend-1:/app/package.json ./frontend/package.json
docker cp ngo-cms-frontend-1:/app/package-lock.json ./frontend/package-lock.json
```

### Backend (Django/Python) Packages

#### Method 1: Update requirements.txt and rebuild (Recommended)
```bash
# Add package to requirements.txt
echo "package-name==version" >> backend/requirements.txt

# Rebuild the container
docker-compose -f docker-compose.prod.yml build backend
docker-compose -f docker-compose.prod.yml up -d backend
```

#### Method 2: Install with pip and freeze
```bash
# Install inside container
docker-compose -f docker-compose.prod.yml exec backend pip install package-name

# Update requirements.txt from container
docker-compose -f docker-compose.prod.yml exec backend pip freeze > backend/requirements.txt

# Rebuild to ensure it persists
docker-compose -f docker-compose.prod.yml build backend
docker-compose -f docker-compose.prod.yml up -d backend
```

### After Installing Packages

**Important Steps:**
1. **Test the application** through http://localhost:8009/
2. **Commit the changes:**
   - Frontend: `package.json` and `package-lock.json`
   - Backend: `requirements.txt`
3. **Document** any configuration needed for the new package
4. **Rebuild** containers to ensure clean installation:
```bash
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

## When to Build vs When to Just Restart

### 🔨 REBUILD Required (use `build`)
These changes require rebuilding the Docker image:

- ✅ **New package installed** (npm install or pip install)
- ✅ **Package removed** (npm uninstall or removed from requirements.txt)
- ✅ **Package version updated** (in package.json or requirements.txt)
- ✅ **Dockerfile modified** (any changes to Dockerfile or Dockerfile.prod)
- ✅ **System dependencies added** (apt-get install, etc.)
- ✅ **Build configuration changed** (next.config.js, webpack config, etc.)

```bash
# When you or teammate installed packages
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
```

### 🔄 RESTART Only (just `restart` or `up -d`)
These changes only need container restart:

- ✅ **Code changes** (JavaScript, Python, HTML, CSS files)
- ✅ **Environment variables** (.env file updates)
- ✅ **Configuration files** (settings.py, non-build configs)
- ✅ **Static files** (images, fonts, etc.)
- ✅ **Database migrations** (new migration files)

```bash
# When pulling code changes (no new packages)
git pull
docker-compose -f docker-compose.prod.yml restart
# OR just
docker-compose -f docker-compose.prod.yml up -d
```

### 📋 Quick Decision Guide

```bash
# After git pull, check what changed:

# Check if package files changed (REBUILD NEEDED)
git diff HEAD~1 --name-only | grep -E "package.*json|requirements.txt|Dockerfile"

# If output shows files → REBUILD
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# If no output → JUST RESTART
docker-compose -f docker-compose.prod.yml restart
```

### Team Workflow Example

**Developer A installs a new package:**
```bash
cd frontend
npm install axios
cd ..
docker-compose -f docker-compose.prod.yml build frontend  # BUILD required
docker-compose -f docker-compose.prod.yml up -d
git add frontend/package*.json
git commit -m "Add axios package"
git push
```

**Developer B pulls the changes:**
```bash
git pull
# Sees package.json changed, so:
docker-compose -f docker-compose.prod.yml build frontend  # BUILD required
docker-compose -f docker-compose.prod.yml up -d
```

**Developer C only changes code:**
```bash
# Edit some React components
git add .
git commit -m "Update header component"
git push
```

**Developer D pulls code-only changes:**
```bash
git pull
# No package changes, so:
docker-compose -f docker-compose.prod.yml restart frontend  # Just RESTART
# OR
docker-compose -f docker-compose.prod.yml up -d  # This also works
```

### Example: Installing Common Packages

#### Frontend - Install Axios
```bash
cd frontend
npm install axios
cd ..
docker-compose -f docker-compose.prod.yml build frontend
docker-compose -f docker-compose.prod.yml up -d frontend
```

#### Backend - Install Django REST Framework Filters
```bash
echo "djangorestframework-filters==1.0.0" >> backend/requirements.txt
docker-compose -f docker-compose.prod.yml build backend
docker-compose -f docker-compose.prod.yml up -d backend
```

## Important Notes for Developers

### ⚠️ Always Test Through Nginx (Port 8009)
- This ensures your local environment matches production routing
- Prevents routing issues from being pushed to production
- Tests the actual user experience

### 🔄 After Pulling Changes
```bash
# Rebuild if Dockerfile or requirements changed
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

# Run migrations if models changed
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate
```

### 🐛 Troubleshooting

#### Frontend not loading (500 error)
```bash
# Check frontend logs
docker-compose -f docker-compose.prod.yml logs frontend

# Rebuild frontend with clean cache
docker-compose -f docker-compose.prod.yml stop frontend
docker-compose -f docker-compose.prod.yml build --no-cache frontend
docker-compose -f docker-compose.prod.yml up -d frontend
```

#### Database connection issues
```bash
# Check if database is running
docker-compose -f docker-compose.prod.yml ps db

# Check database logs
docker-compose -f docker-compose.prod.yml logs db

# Recreate database
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -c "CREATE DATABASE ngo_cms;"
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -c "CREATE USER ngo_cms_user WITH PASSWORD 'digitalace@12!';"
docker-compose -f docker-compose.prod.yml exec db psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE ngo_cms TO ngo_cms_user;"
```

#### Nginx 502 Bad Gateway
```bash
# Check if backend and frontend are running
docker-compose -f docker-compose.prod.yml ps

# Restart services in order
docker-compose -f docker-compose.prod.yml restart backend
docker-compose -f docker-compose.prod.yml restart frontend
docker-compose -f docker-compose.prod.yml restart nginx
```

## Environment Variables

Create `.env` file in project root (if not exists):
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
ALLOWED_HOSTS=localhost,127.0.0.1

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:8009/api
API_URL=http://backend:8000/api

# Ports
BACKEND_PORT=8008
FRONTEND_PORT=3007
NGINX_PORT=8009
DB_EXTERNAL_PORT=5437
```

## Git Workflow

```bash
# Before starting work
git pull origin main
docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# After making changes
# 1. Test locally through http://localhost:8009/
# 2. Ensure no console errors
# 3. Test both frontend and admin panel
# 4. Then commit and push

git add .
git commit -m "Your descriptive commit message"
git push origin your-branch
```

## Production Deployment

When your changes are tested locally and ready:

```bash
# On production server
git pull origin main
docker-compose -p ngo-cms -f docker-compose.prod.yml build --no-cache
docker-compose -p ngo-cms -f docker-compose.prod.yml up -d
docker-compose -p ngo-cms -f docker-compose.prod.yml exec backend python manage.py migrate
docker-compose -p ngo-cms -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
```

## Team Guidelines

1. **Always use docker-compose.prod.yml** - This ensures everyone tests the same setup
2. **Test through port 8009** - Never push code only tested on direct ports (3007/8008)
3. **Check logs before pushing** - Ensure no errors in console or Docker logs
4. **Run migrations locally first** - Test database changes before deployment
5. **Document API changes** - Update this guide if you add new endpoints

## Support

If you encounter issues not covered here:
1. Check Docker logs: `docker-compose -f docker-compose.prod.yml logs`
2. Check container status: `docker ps`
3. Ensure Docker has enough resources (memory/disk)
4. Contact the team lead or check project documentation

---
*Last updated: [Current Date]*
*Maintained by: Development Team*