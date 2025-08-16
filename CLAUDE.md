# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Django REST Framework + Next.js application for an NGO CMS system. The project is fully containerized with Docker and uses PostgreSQL as the database.

## Architecture

- **Backend**: Django REST Framework API with JWT authentication, CORS support, and API documentation via drf-spectacular
- **Frontend**: Next.js 15 application with TypeScript, TailwindCSS, Tanstack Query, and Zustand for state management
- **Database**: PostgreSQL with hardcoded connection details for development
- **Containerization**: Docker Compose for both development and production environments

## Essential Commands

### Development Environment
```bash
# Start development environment
make up
docker-compose up -d

# Build containers
make build
docker-compose build

# View logs
make logs
docker-compose logs -f

# Stop environment
make down
docker-compose down
```

### Database Operations
```bash
# Run migrations
make migrate
docker-compose exec backend python manage.py migrate

# Create migrations
make makemigrations
docker-compose exec backend python manage.py makemigrations

# Create superuser
make createsuperuser
docker-compose exec backend python manage.py createsuperuser

# Access database shell
make shell-db
docker-compose exec db psql -U postgres -d django_db
```

### Testing and Development
```bash
# Run Django tests
make test
docker-compose exec backend python manage.py test

# Access Django shell
make shell-backend
docker-compose exec backend python manage.py shell

# Frontend linting
docker-compose exec frontend npm run lint

# Frontend build
docker-compose exec frontend npm run build
```

### Production Deployment
```bash
# Start production environment
make prod-up
docker-compose -f docker-compose.prod.yml up -d

# Run production migrations
make prod-migrate

# Collect static files
make prod-collectstatic
```

## Database Configuration

The database connection is hardcoded in settings.py:
- Database: `ngo_cms`
- User: `ngo_cms_user`
- Password: `digitalace@12!`
- Host: `db` (Docker service name)
- Port: `5432`

Note: The docker-compose.yml still uses environment variables for the PostgreSQL container, but Django connects with hardcoded values.

## Key Technologies and Libraries

### Backend
- Django 5.0.1 with Django REST Framework
- JWT authentication via `djangorestframework-simplejwt`
- CORS headers support
- API documentation with `drf-spectacular`
- PostgreSQL with `psycopg2-binary`
- Gunicorn for production serving

### Frontend
- Next.js 15 with App Router
- TypeScript for type safety
- TailwindCSS 4 for styling
- Tanstack React Query for server state management
- Zustand for client state management
- Axios and SWR for API communication

## Service URLs

### Development
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin
- Database: localhost:5432

### API Configuration
- Frontend connects to backend via `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
- Internal container communication uses `API_URL=http://backend:8000/api`

## File Structure Notes

- Backend Django apps are in `backend/` with `config/` for settings
- Frontend uses App Router structure in `frontend/app/`
- Both services have separate Dockerfiles for development and production
- Makefile provides convenient shortcuts for Docker Compose commands

## Production Considerations

- Uses separate `docker-compose.prod.yml` for production deployment
- Includes Nginx reverse proxy configuration
- Supports Celery and Redis for background tasks (commented out in settings)
- Environment variables should be configured via `.env.prod` file