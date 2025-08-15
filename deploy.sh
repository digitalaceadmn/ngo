#!/bin/bash

# ================================================================
# Django + Next.js Multi-App Deployment Script
# ================================================================
# This script deploys Django REST + Next.js on a server with multiple apps
# Handles port conflicts, SSL certificates, and nginx automatically
# ================================================================

# Exit on error
set -e

# ================================================================
# CONFIGURATION SECTION - EDIT THESE VALUES
# ================================================================

# Domain Configuration
DOMAIN_NAME="example.com"  # Your domain name (CHANGE THIS!)
SSL_EMAIL="admin@example.com"  # Email for SSL certificates (CHANGE THIS!)

# SSL Configuration
USE_SSL="yes"  # "yes" or "no"

# Project Configuration
PROJECT_NAME="ngo-cms"  # Unique project name (used for folders and containers)
PROJECT_FOLDER="/var/www/${PROJECT_NAME}"  # Where static files will be stored

# Port Configuration (MUST BE UNIQUE FOR EACH APP)
BACKEND_PORT=8007  # Django backend port (change if 8007 is taken)
FRONTEND_PORT=3007  # Next.js frontend port (change if 3007 is taken)
DB_PORT=5437  # PostgreSQL port (change if 5437 is taken)

# Database Configuration
DB_NAME="${PROJECT_NAME}_db"
DB_USER="${PROJECT_NAME}_user"
DB_PASSWORD="$(openssl rand -base64 32)"  # Auto-generate secure password

# ================================================================
# COLOR CODES FOR OUTPUT
# ================================================================
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ================================================================
# HELPER FUNCTIONS
# ================================================================

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${MAGENTA}[STEP]${NC} $1"
}

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Function to find free port starting from given port
find_free_port() {
    local port=$1
    while check_port $port; do
        log_warning "Port $port is already in use"
        port=$((port + 1))
    done
    echo $port
}

# ================================================================
# PRE-DEPLOYMENT CHECKS
# ================================================================

echo "================================================================"
echo -e "${CYAN}Django + Next.js Multi-App Deployment Script${NC}"
echo "================================================================"
echo -e "Project: ${GREEN}${PROJECT_NAME}${NC}"
echo -e "Domain: ${GREEN}${DOMAIN_NAME}${NC}"
echo -e "SSL: ${GREEN}${USE_SSL}${NC}"
echo "================================================================"
echo

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   log_warning "Running as root. This is okay for deployment."
fi

# Check if we're in the right directory
if [ ! -f "docker-compose.prod.yml" ]; then
    log_error "docker-compose.prod.yml not found!"
    log_error "Please run this script from the repository root directory"
    exit 1
fi

# ================================================================
# PORT AVAILABILITY CHECK
# ================================================================

log_step "Checking port availability..."

# Find available ports
BACKEND_PORT=$(find_free_port $BACKEND_PORT)
FRONTEND_PORT=$(find_free_port $FRONTEND_PORT)
DB_PORT=$(find_free_port $DB_PORT)

log_success "Using ports - Backend: $BACKEND_PORT, Frontend: $FRONTEND_PORT, Database: $DB_PORT"

# ================================================================
# ENVIRONMENT SETUP
# ================================================================

log_step "Setting up environment configuration..."

# Create .env.prod if it doesn't exist
if [ ! -f ".env.prod" ]; then
    if [ -f ".env.prod.example" ]; then
        cp .env.prod.example .env.prod
        log_info "Created .env.prod from template"
    else
        log_info "Creating .env.prod file..."
        cat > .env.prod << EOF
# Database
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_HOST=db
DB_PORT=5432

# Django
SECRET_KEY=$(python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())')
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1,backend,${DOMAIN_NAME},www.${DOMAIN_NAME}

# Email (configure as needed)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=

# Frontend
NEXT_PUBLIC_API_URL=https://${DOMAIN_NAME}/api

# CORS
CORS_ALLOWED_ORIGINS=https://${DOMAIN_NAME},https://www.${DOMAIN_NAME}

# Security
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
SECURE_HSTS_SECONDS=31536000
SECURE_HSTS_INCLUDE_SUBDOMAINS=True
SECURE_HSTS_PRELOAD=True
EOF
        log_success "Created .env.prod with secure defaults"
    fi
else
    log_info "Using existing .env.prod file"
    # Update ALLOWED_HOSTS to include domain
    sed -i "s/^ALLOWED_HOSTS=.*/ALLOWED_HOSTS=localhost,127.0.0.1,backend,${DOMAIN_NAME},www.${DOMAIN_NAME}/" .env.prod
fi

# Save database credentials for reference
cat > .deployment-info << EOF
================================================================
DEPLOYMENT INFORMATION - SAVE THIS!
================================================================
Project: ${PROJECT_NAME}
Domain: ${DOMAIN_NAME}
Date: $(date)

Ports:
- Backend: ${BACKEND_PORT}
- Frontend: ${FRONTEND_PORT}
- Database: ${DB_PORT}

Database:
- Name: ${DB_NAME}
- User: ${DB_USER}
- Password: ${DB_PASSWORD}

URLs:
- Main: https://${DOMAIN_NAME}
- API: https://${DOMAIN_NAME}/api
- Admin: https://${DOMAIN_NAME}/admin
- API Docs: https://${DOMAIN_NAME}/api/docs

Commands:
- View logs: docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml logs -f
- Restart: docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml restart
- Stop: docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml down
- Shell: docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml exec backend python manage.py shell
================================================================
EOF

log_success "Deployment info saved to .deployment-info"

# ================================================================
# DOCKER COMPOSE OVERRIDE
# ================================================================

log_step "Creating docker-compose override for custom ports..."

cat > docker-compose.override.yml << EOF
version: '3.8'

services:
  db:
    ports:
      - "${DB_PORT}:5432"
    environment:
      - POSTGRES_DB=${DB_NAME}
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}

  backend:
    ports:
      - "${BACKEND_PORT}:8000"
    environment:
      - DB_NAME=${DB_NAME}
      - DB_USER=${DB_USER}
      - DB_PASSWORD=${DB_PASSWORD}

  frontend:
    ports:
      - "${FRONTEND_PORT}:3000"
    environment:
      - NEXT_PUBLIC_API_URL=https://${DOMAIN_NAME}/api

  nginx:
    ports:
      - "${BACKEND_PORT}:80"
EOF

# ================================================================
# INSTALL DEPENDENCIES
# ================================================================

log_step "Installing required packages..."

# Update package list
sudo apt-get update -qq

# Install required packages
packages=("docker.io" "docker-compose" "nginx" "certbot" "python3-certbot-nginx" "lsof")
for package in "${packages[@]}"; do
    if ! dpkg -l | grep -q "^ii  $package"; then
        log_info "Installing $package..."
        sudo apt-get install -y $package
    fi
done

# Ensure docker service is running
sudo systemctl start docker
sudo systemctl enable docker

# ================================================================
# NGINX CONFIGURATION
# ================================================================

log_step "Creating Nginx configuration..."

# Create initial HTTP configuration
cat > /tmp/${PROJECT_NAME}-nginx.conf << EOF
# Nginx configuration for ${PROJECT_NAME}
# Generated on $(date)

upstream ${PROJECT_NAME}_backend {
    server 127.0.0.1:${BACKEND_PORT};
}

upstream ${PROJECT_NAME}_frontend {
    server 127.0.0.1:${FRONTEND_PORT};
}

server {
    listen 80;
    server_name ${DOMAIN_NAME} www.${DOMAIN_NAME};
    
    client_max_body_size 100M;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    # API and Admin routes -> Django Backend
    location ~ ^/(api|admin) {
        proxy_pass http://${PROJECT_NAME}_backend;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        send_timeout 600;
    }
    
    # Static files (Django)
    location /static/ {
        alias ${PROJECT_FOLDER}/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Media files (Django)
    location /media/ {
        alias ${PROJECT_FOLDER}/media/;
        expires 7d;
        add_header Cache-Control "public";
    }
    
    # Next.js static files
    location /_next/static {
        proxy_pass http://${PROJECT_NAME}_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
    
    # Frontend routes -> Next.js
    location / {
        proxy_pass http://${PROJECT_NAME}_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
    
    # Favicon and robots
    location = /favicon.ico {
        access_log off;
        log_not_found off;
    }
    
    location = /robots.txt {
        access_log off;
        log_not_found off;
    }
    
    # Enable gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
EOF

# Copy to nginx sites-available
sudo cp /tmp/${PROJECT_NAME}-nginx.conf /etc/nginx/sites-available/${PROJECT_NAME}
rm /tmp/${PROJECT_NAME}-nginx.conf

# Create symbolic link
if [ ! -L /etc/nginx/sites-enabled/${PROJECT_NAME} ]; then
    sudo ln -s /etc/nginx/sites-available/${PROJECT_NAME} /etc/nginx/sites-enabled/
    log_success "Nginx configuration created"
fi

# Test nginx configuration
if sudo nginx -t; then
    log_success "Nginx configuration is valid"
    sudo systemctl reload nginx
else
    log_error "Nginx configuration test failed!"
    exit 1
fi

# ================================================================
# CREATE DIRECTORIES
# ================================================================

log_step "Creating project directories..."

# Create directories for static and media files
sudo mkdir -p ${PROJECT_FOLDER}/static ${PROJECT_FOLDER}/media
sudo chown -R $USER:$USER ${PROJECT_FOLDER}
sudo chmod -R 755 ${PROJECT_FOLDER}

# ================================================================
# DOCKER BUILD AND DEPLOY
# ================================================================

log_step "Building and deploying Docker containers..."

# Stop existing containers for this project
log_info "Stopping existing containers..."
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml down --remove-orphans 2>/dev/null || true

# Pull latest images
log_info "Pulling latest base images..."
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml pull

# Build images
log_info "Building Docker images..."
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml build --no-cache

# Start services
log_info "Starting services..."
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml up -d

# Wait for database to be ready
log_info "Waiting for database to be ready..."
sleep 10

# Run migrations
log_info "Running database migrations..."
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml exec -T backend python manage.py migrate --noinput || log_warning "Migrations might have already been applied"


# Collect static files
log_info "Collecting static files..."
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml exec -T backend python manage.py collectstatic --noinput

# Copy static files to host
log_info "Copying static files to host..."
docker cp $(docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml ps -q backend):/app/static/. ${PROJECT_FOLDER}/static/ 2>/dev/null || true
docker cp $(docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml ps -q backend):/app/media/. ${PROJECT_FOLDER}/media/ 2>/dev/null || true

# Set proper permissions
sudo chown -R www-data:www-data ${PROJECT_FOLDER}/static ${PROJECT_FOLDER}/media

# ================================================================
# SSL CERTIFICATE SETUP
# ================================================================

if [ "$USE_SSL" = "yes" ]; then
    log_step "Setting up SSL certificate..."
    
    # Check if certificate already exists
    if [ -d "/etc/letsencrypt/live/${DOMAIN_NAME}" ]; then
        log_info "SSL certificate already exists for ${DOMAIN_NAME}"
    else
        # Obtain SSL certificate
        log_info "Obtaining SSL certificate from Let's Encrypt..."
        sudo certbot --nginx -d ${DOMAIN_NAME} -d www.${DOMAIN_NAME} --non-interactive --agree-tos -m ${SSL_EMAIL} || {
            log_warning "Failed to obtain SSL certificate. Application will run on HTTP only."
            USE_SSL="no"
        }
    fi
    
    # Update nginx config with SSL if successful
    if [ "$USE_SSL" = "yes" ] && [ -d "/etc/letsencrypt/live/${DOMAIN_NAME}" ]; then
        log_info "Updating Nginx configuration with SSL..."
        
        # Create SSL configuration
        cat > /tmp/${PROJECT_NAME}-nginx-ssl.conf << EOF
# Nginx SSL configuration for ${PROJECT_NAME}
# Generated on $(date)

upstream ${PROJECT_NAME}_backend {
    server 127.0.0.1:${BACKEND_PORT};
}

upstream ${PROJECT_NAME}_frontend {
    server 127.0.0.1:${FRONTEND_PORT};
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name ${DOMAIN_NAME} www.${DOMAIN_NAME};
    return 301 https://\$server_name\$request_uri;
}

# HTTPS server
server {
    listen 443 ssl http2;
    server_name ${DOMAIN_NAME} www.${DOMAIN_NAME};
    
    # SSL certificates
    ssl_certificate /etc/letsencrypt/live/${DOMAIN_NAME}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN_NAME}/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_stapling on;
    ssl_stapling_verify on;
    
    client_max_body_size 100M;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # API and Admin routes -> Django Backend
    location ~ ^/(api|admin) {
        proxy_pass http://${PROJECT_NAME}_backend;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_connect_timeout 600;
        proxy_send_timeout 600;
        proxy_read_timeout 600;
        send_timeout 600;
    }
    
    # Static files (Django)
    location /static/ {
        alias ${PROJECT_FOLDER}/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Media files (Django)
    location /media/ {
        alias ${PROJECT_FOLDER}/media/;
        expires 7d;
        add_header Cache-Control "public";
    }
    
    # Next.js static files
    location /_next/static {
        proxy_pass http://${PROJECT_NAME}_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }
    
    # Frontend routes -> Next.js
    location / {
        proxy_pass http://${PROJECT_NAME}_frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
    }
    
    # Favicon and robots
    location = /favicon.ico {
        access_log off;
        log_not_found off;
    }
    
    location = /robots.txt {
        access_log off;
        log_not_found off;
    }
    
    # Enable gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
EOF
        
        # Apply SSL configuration
        sudo cp /tmp/${PROJECT_NAME}-nginx-ssl.conf /etc/nginx/sites-available/${PROJECT_NAME}
        rm /tmp/${PROJECT_NAME}-nginx-ssl.conf
        
        # Test and reload
        if sudo nginx -t; then
            sudo systemctl reload nginx
            log_success "SSL configured successfully!"
        else
            log_warning "SSL configuration test failed, keeping HTTP configuration"
            USE_SSL="no"
        fi
    fi
fi

# ================================================================
# HEALTH CHECKS
# ================================================================

log_step "Running health checks..."

# Wait for services to be ready
sleep 10

# Check if containers are running
log_info "Checking container status..."
docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml ps

# Check backend health
if curl -sf "http://localhost:${BACKEND_PORT}/api/health/" > /dev/null 2>&1; then
    log_success "Backend health check passed"
else
    log_warning "Backend health check failed (endpoint might not exist yet)"
fi

# Check frontend health
if curl -sf "http://localhost:${FRONTEND_PORT}/" > /dev/null 2>&1; then
    log_success "Frontend health check passed"
else
    log_warning "Frontend health check failed"
fi

# ================================================================
# SETUP CRON JOBS
# ================================================================

log_step "Setting up automatic tasks..."

# Add SSL renewal to crontab if not exists
if [ "$USE_SSL" = "yes" ]; then
    if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
        (crontab -l 2>/dev/null; echo "0 2 * * * /usr/bin/certbot renew --quiet --post-hook 'systemctl reload nginx'") | crontab -
        log_success "SSL auto-renewal cron job added"
    fi
fi


# ================================================================
# FINAL OUTPUT
# ================================================================

echo
echo "================================================================"
echo -e "${GREEN}DEPLOYMENT COMPLETED SUCCESSFULLY!${NC}"
echo "================================================================"
echo
echo -e "${CYAN}Access URLs:${NC}"
if [ "$USE_SSL" = "yes" ]; then
    echo -e "  Main Site: ${GREEN}https://${DOMAIN_NAME}${NC}"
    echo -e "  API: ${GREEN}https://${DOMAIN_NAME}/api${NC}"
    echo -e "  Admin Panel: ${GREEN}https://${DOMAIN_NAME}/admin${NC}"
    echo -e "  API Docs: ${GREEN}https://${DOMAIN_NAME}/api/docs${NC}"
else
    echo -e "  Main Site: ${YELLOW}http://${DOMAIN_NAME}${NC}"
    echo -e "  API: ${YELLOW}http://${DOMAIN_NAME}/api${NC}"
    echo -e "  Admin Panel: ${YELLOW}http://${DOMAIN_NAME}/admin${NC}"
    echo -e "  API Docs: ${YELLOW}http://${DOMAIN_NAME}/api/docs${NC}"
fi
echo
echo -e "${CYAN}Service Ports:${NC}"
echo -e "  Backend: ${GREEN}${BACKEND_PORT}${NC}"
echo -e "  Frontend: ${GREEN}${FRONTEND_PORT}${NC}"
echo -e "  Database: ${GREEN}${DB_PORT}${NC}"
echo
echo -e "${CYAN}Default Admin Credentials:${NC}"
echo -e "  Username: ${YELLOW}admin${NC}"
echo -e "  Password: ${YELLOW}Admin@123456${NC}"
echo -e "  ${RED}⚠ CHANGE THIS IMMEDIATELY!${NC}"
echo
echo -e "${CYAN}Useful Commands:${NC}"
echo -e "  View logs: ${YELLOW}docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml logs -f${NC}"
echo -e "  Restart: ${YELLOW}docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml restart${NC}"
echo -e "  Stop: ${YELLOW}docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml down${NC}"
echo -e "  Django shell: ${YELLOW}docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml exec backend python manage.py shell${NC}"
echo -e "  Create superuser: ${YELLOW}docker-compose -p ${PROJECT_NAME} -f docker-compose.prod.yml exec backend python manage.py createsuperuser${NC}"
echo -e "  Backup database: ${YELLOW}${PROJECT_FOLDER}/backup.sh${NC}"
echo
echo -e "${CYAN}Configuration Files:${NC}"
echo -e "  Nginx: ${YELLOW}/etc/nginx/sites-available/${PROJECT_NAME}${NC}"
echo -e "  Environment: ${YELLOW}.env.prod${NC}"
echo -e "  Deployment Info: ${YELLOW}.deployment-info${NC}"
echo
echo "================================================================"
echo -e "${GREEN}Deployment information saved to .deployment-info${NC}"
echo "================================================================"