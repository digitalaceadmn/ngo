.PHONY: help build up down logs shell migrate test

help:
	@echo "Available commands:"
	@echo "  make build       - Build Docker images"
	@echo "  make up          - Start development environment"
	@echo "  make down        - Stop all containers"
	@echo "  make logs        - View container logs"
	@echo "  make shell-backend - Open Django shell"
	@echo "  make shell-db    - Open PostgreSQL shell"
	@echo "  make migrate     - Run Django migrations"
	@echo "  make test        - Run tests"
	@echo "  make prod-up     - Start production environment"
	@echo "  make prod-down   - Stop production environment"

# Development commands
build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

shell-backend:
	docker-compose exec backend python manage.py shell

shell-db:
	docker-compose exec db psql -U postgres -d django_db

migrate:
	docker-compose exec backend python manage.py migrate

makemigrations:
	docker-compose exec backend python manage.py makemigrations

createsuperuser:
	docker-compose exec backend python manage.py createsuperuser

test:
	docker-compose exec backend python manage.py test

# Production commands
prod-build:
	docker-compose -f docker-compose.prod.yml build

prod-up:
	docker-compose -f docker-compose.prod.yml up -d

prod-down:
	docker-compose -f docker-compose.prod.yml down

prod-logs:
	docker-compose -f docker-compose.prod.yml logs -f

prod-migrate:
	docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

prod-collectstatic:
	docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput