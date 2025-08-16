#!/bin/sh

# Exit on error
set -e

# Wait for database to be ready
echo "Waiting for database..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "Database is ready!"

# Run migrations
echo "Running database migrations..."
python manage.py migrate --noinput || true

# Create superuser if it doesn't exist
echo "Creating superuser if needed..."
python manage.py shell << EOF || true
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@prankiran.com', 'Admin@123456')
    print('Superuser created: admin / Admin@123456')
else:
    print('Superuser already exists')
EOF

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput || true

# Start the application
echo "Starting Gunicorn..."
exec "$@"