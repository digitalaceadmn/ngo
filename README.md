# Django REST Framework + Next.js Application

Full-stack application with Django REST Framework backend and Next.js frontend, containerized with Docker.

## Project Structure

```
.
├── backend/          # Django REST Framework API
├── frontend/         # Next.js application
├── nginx/           # Nginx configuration (production only)
├── docker-compose.yml       # Local development
└── docker-compose.prod.yml  # Production deployment
```

## Prerequisites

- Docker & Docker Compose
- Make (optional, for using Makefile commands)

## Quick Start

### Development

1. Clone the repository and navigate to project directory

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Build and start services:
```bash
docker-compose up --build
# OR using Make
make build && make up
```

4. Create Django superuser:
```bash
docker-compose exec backend python manage.py createsuperuser
# OR
make createsuperuser
```

5. Access applications:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin

### Production

1. Copy production environment variables:
```bash
cp .env.prod.example .env.prod
```

2. Update `.env.prod` with your production values

3. Build and start production services:
```bash
docker-compose -f docker-compose.prod.yml up -d --build
# OR
make prod-up
```

4. Run migrations and collect static files:
```bash
make prod-migrate
make prod-collectstatic
```

## Available Commands

### Using Make
```bash
make help           # Show all available commands
make up            # Start development environment
make down          # Stop all containers
make logs          # View container logs
make shell-backend # Open Django shell
make migrate       # Run Django migrations
make test          # Run tests
make prod-up       # Start production environment
make prod-down     # Stop production environment
```

### Using Docker Compose directly
```bash
# Development
docker-compose up -d
docker-compose down
docker-compose logs -f

# Production
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml down
```

## Services

### Development
- **PostgreSQL**: Database (port 5432)
- **Redis**: Cache & message broker (port 6379)
- **Backend**: Django REST API (port 8000)
- **Frontend**: Next.js app (port 3000)

### Production (additional)
- **Nginx**: Reverse proxy (port 80/443)
- **Celery**: Background task worker
- **Celery Beat**: Periodic task scheduler

## Environment Variables

### Development (.env)
- Database configuration
- Django settings
- Frontend API URL
- CORS settings

### Production (.env.prod)
- Production database credentials
- Security settings (HTTPS, HSTS, etc.)
- Domain configuration
- Email settings

## API Structure

The Django backend should be structured as:
```
backend/
├── config/          # Project settings
├── apps/           # Django apps
│   ├── users/     # User management
│   ├── api/       # API endpoints
│   └── ...
├── requirements.txt
└── manage.py
```

## Frontend Structure

The Next.js frontend should include:
```
frontend/
├── app/            # App router (Next.js 13+)
├── components/     # React components
├── lib/           # Utilities & API clients
├── public/        # Static assets
└── styles/        # CSS/Tailwind styles
```

## Security Notes

- Change all default passwords in production
- Update SECRET_KEY in production
- Configure SSL certificates for HTTPS
- Set proper CORS origins
- Enable Django security middleware in production

## Troubleshooting

1. **Database connection issues**: Ensure PostgreSQL is healthy before starting backend
2. **Port conflicts**: Check if ports 3000, 8000, 5432, 6379 are available
3. **Permission issues**: Run `chmod +x` on scripts if needed
4. **Build failures**: Clear Docker cache with `docker-compose build --no-cache`